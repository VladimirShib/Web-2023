package main

import (
	"database/sql"
	"html/template"
	"log"
	"net/http"
	"strconv"
	"strings"

	"github.com/gorilla/mux"
	"github.com/jmoiron/sqlx"
)

type postData struct {
	PostID      string `db:"post_id"`
	PostURL     string
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

func featuredPosts(client *sqlx.DB) ([]*postData, error) {
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
			` + "`post`" + `
		WHERE featured = 1
	`

	var posts []*postData

	err := client.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	for _, post := range posts {
		post.PostURL = "/post/" + post.PostID
	}

	return posts, nil
}

func recentPosts(client *sqlx.DB) ([]*postData, error) {
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
			` + "`post`" + `
		WHERE featured = 0
	`

	var posts []*postData

	err := client.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	for _, post := range posts {
		post.PostURL = "/post/" + post.PostID
	}

	return posts, nil
}

func articleData(client *sqlx.DB, postID int) (splitArticlePageData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			img_modifier,
			content
		FROM
			` + "`post`" + `
		WHERE
			post_id = ?
	`

	var article articlePageData

	err := client.Get(&article, query, postID)

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

func indexPage(client *sqlx.DB) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		ts, err := template.ParseFiles("pages/index.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		featuredPosts, err := featuredPosts(client)
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		recentPosts, err := recentPosts(client)
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

func articlePage(client *sqlx.DB) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		postIDStr := mux.Vars(r)["postID"]

		postID, err := strconv.Atoi(postIDStr)
		if err != nil {
			http.Error(w, "Invalid post id", http.StatusForbidden)
			log.Println(err)
			return
		}

		data, err := articleData(client, postID)
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
