package main

import (
	"html/template"
	"log"
	"net/http"
)

type postsData struct {
	PostTitle       string
	PostSubtitle    string
	PostImgModifier string
	PostAuthor      string
	PostAuthorImg   string
	PostPublishDate string
}

type indexPageData struct {
	FeaturedPosts []postsData
}

func featuredPosts() []postsData {
	return []postsData{
		{
			PostTitle:       "The Road Ahead",
			PostSubtitle:    "The road ahead might be paved - it might not be.",
			PostImgModifier: "main-middle-block__featured-post-one",
			PostAuthor:      "Mat Vogels",
			PostAuthorImg:   "../static/img/mat_vogels.jpg",
			PostPublishDate: "September 25, 2015",
		},
		{
			PostTitle:       "From Top Down",
			PostSubtitle:    "Once a year, go someplace you've never been before.",
			PostImgModifier: "main-middle-block__featured-post-two",
			PostAuthor:      "William Wong",
			PostAuthorImg:   "../static/img/william_wong.jpg",
			PostPublishDate: "September 25, 2015",
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
		FeaturedPosts: featuredPosts(),
	}

	err = ts.Execute(w, data)
	if err != nil {
		http.Error(w, "Internal Server Error", 500)
		log.Println(err)
		return
	}

	log.Println("Request successful")
}
