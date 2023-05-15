package main

import (
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type postData struct {
	PostID      string `db:"post_id"`
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgModifier string `db:"img_modifier"`
	Author      string `db:"author"`
	AuthorImg   string `db:"author_img"`
	PublishDate string `db:"publish_date"`
}

type indexPageData struct {
	FeaturedPosts []*postData
	RecentPosts   []*postData
}

type articlePageData struct {
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgModifier string `db:"img_modifier"`
	Content     string `db:"content"`
}

type splitArticlePageData struct {
	Title       string   `db:"title"`
	Subtitle    string   `db:"subtitle"`
	ImgModifier string   `db:"img_modifier"`
	Content     []string `db:"content"`
}

type createPostRequest struct {
	Title           string `json:"title"`
	Subtitle        string `json:"subtitle"`
	Author          string `json:"author"`
	PublishDate     string `json:"publishDate"`
	Content         string `json:"content"`
	AuthorImg       string `json:"authorImg"`
	AuthorImgName   string `json:"authorImgName"`
	ImgModifier     string `json:"imgModifier"`
	ImgModifierName string `json:"imgModifierName"`
}

func featuredPosts(db *sqlx.DB) ([]*postData, error) {
	const query = `
		SELECT
			post_id,
			title,
			subtitle,
			img_modifier,
			author,
			author_img,
			publish_date
		FROM
			post
		WHERE featured = 1
	`

	var posts []*postData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func recentPosts(db *sqlx.DB) ([]*postData, error) {
	const query = `
		SELECT
			post_id,
			title,
			subtitle,
			img_modifier,
			author,
			author_img,
			publish_date
		FROM
			post
		WHERE featured = 0
	`

	var posts []*postData

	err := db.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func articleData(db *sqlx.DB, postID int) (splitArticlePageData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			img_modifier,
			content
		FROM
			post
		WHERE
			post_id = ?
	`

	var article articlePageData

	err := db.Get(&article, query, postID)

	var splitArticle = splitArticlePageData{
		Title:       article.Title,
		Subtitle:    article.Subtitle,
		ImgModifier: article.ImgModifier,
		Content:     strings.Split(article.Content, "\n"),
	}

	if err != nil {
		return splitArticlePageData{}, err
	}

	return splitArticle, nil
}

func createPost(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		body, err := io.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		var req createPostRequest

		err = json.Unmarshal(body, &req)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		imgAuthor, err := base64.StdEncoding.DecodeString(strings.Split(req.AuthorImg, "base64,")[1])
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		fileAuthor, err := os.Create("static/img/" + req.AuthorImgName)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		_, err = fileAuthor.Write(imgAuthor)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		imgPost, err := base64.StdEncoding.DecodeString(strings.Split(req.ImgModifier, "base64,")[1])
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		filePost, err := os.Create("static/img/" + req.ImgModifierName)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		_, err = filePost.Write(imgPost)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		err = savePost(db, req)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		log.Println("Request successful")
	}
}

func savePost(db *sqlx.DB, req createPostRequest) error {
	const query = `
		INSERT INTO
			post
		(
			title,
			subtitle,
			img_modifier,
			author,
			author_img,
			publish_date,
			content,
			featured
		)
		VALUES
		(
			?,
			?,
			?,
			?,
			?,
			?,
			?,
			0
		)
	`

	_, err := db.Exec(query, req.Title, req.Subtitle, "/static/img/"+req.ImgModifierName, req.Author, "/static/img/"+req.AuthorImgName, req.PublishDate, req.Content)
	return err
}

func indexPage(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ts, err := template.ParseFiles("pages/index.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		featuredPosts, err := featuredPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		recentPosts, err := recentPosts(db)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		data := indexPageData{
			FeaturedPosts: featuredPosts,
			RecentPosts:   recentPosts,
		}

		err = ts.Execute(w, data)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}
	}
}

func articlePage(db *sqlx.DB) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := mux.Vars(r)["postID"]

		postID, err := strconv.Atoi(postIDStr)
		if err != nil {
			http.Error(w, "Invalid post id", http.StatusForbidden)
			log.Println(err)
			return
		}

		data, err := articleData(db, postID)
		if err != nil {
			if err == sql.ErrNoRows {
				http.Error(w, "Post not found", 404)
				log.Println(err.Error())
				return
			}

			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		ts, err := template.ParseFiles("pages/post.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		err = ts.Execute(w, data)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}
	}
}

func adminPage() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ts, err := template.ParseFiles("pages/admin.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		err = ts.Execute(w, nil)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}
	}
}

func loginPage() func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ts, err := template.ParseFiles("pages/login.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		err = ts.Execute(w, nil)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}
	}
}
