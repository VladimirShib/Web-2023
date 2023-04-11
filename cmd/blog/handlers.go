package main

import (
	"html/template"
	"log"
	"net/http"
	"strings"

	"github.com/jmoiron/sqlx"
)

type postData struct {
	Link        string `db:"link"`
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgModifier string `db:"img_modifier"`
	Author      string `db:"author"`
	AuthorImg   string `db:"author_img"`
	PublishDate string `db:"publish_date"`
}

type indexPageData struct {
	FeaturedPosts []postData
	RecentPosts   []postData
}

type articlePageData struct {
	Title       string `db:"title"`
	Subtitle    string `db:"subtitle"`
	ImgModifier string `db:"img_modifier"`
	Text        string `db:"text"`
}

type splitArticlePageData struct {
	Title       string   `db:"title"`
	Subtitle    string   `db:"subtitle"`
	ImgModifier string   `db:"img_modifier"`
	Text        []string `db:"text"`
}

func featuredPosts(client *sqlx.DB) ([]postData, error) {
	const query = `
		SELECT
			link,
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

	var posts []postData

	err := client.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func recentPosts(client *sqlx.DB) ([]postData, error) {
	const query = `
		SELECT
			link,
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

	var posts []postData

	err := client.Select(&posts, query)
	if err != nil {
		return nil, err
	}

	return posts, nil
}

func articleData(client *sqlx.DB) (splitArticlePageData, error) {
	const query = `
		SELECT
			title,
			subtitle,
			img_modifier,
			text
		FROM
			post
	`

	var article articlePageData

	err := client.Get(&article, query)

	var splitArticle = splitArticlePageData{
		Title:       article.Title,
		Subtitle:    article.Subtitle,
		ImgModifier: article.ImgModifier,
		Text:        strings.Split(article.Text, "\n"),
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
		ts, err := template.ParseFiles("pages/post.html")
		if err != nil {
			http.Error(w, "Internal Server Error", 500)
			log.Println(err.Error())
			return
		}

		data, err := articleData(client)
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
