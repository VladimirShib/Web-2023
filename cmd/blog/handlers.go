package main

import (
	"html/template"
	"log"
	"net/http"
)

type featuredPostsData struct {
	Title       string
	Subtitle    string
	ImgModifier string
	Author      string
	AuthorImg   string
	PublishDate string
}

type indexPageData struct {
	featuredPosts []featuredPostsData
}

func featuredPosts() []featuredPostsData {
	return []featuredPostsData{
		{
			Title:       "The Road Ahead",
			Subtitle:    "The road ahead might be paved - it might not be.",
			ImgModifier: "main-middle-block__featured-post-one",
			Author:      "Mat Vogels",
			AuthorImg:   "../static/img/mat_vogels.jpg",
			PublishDate: "September 25, 2015",
		},
	}
}

func index(w http.ResponseWriter, r *http.Request) {
	ts, err := template.ParseFiles("pages/index.html")
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	data := indexPageData{
		featuredPosts: featuredPosts(),
		// recentPosts:   getRecentPosts(),
	}

	err = ts.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	log.Println("Request successful")
}
