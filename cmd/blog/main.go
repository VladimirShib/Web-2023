package main

import (
	"fmt"
	"net/http"
)

const port = ":3000"

func main() {
	mux := http.NewServeMux()
	mux.HandleFunc("/home", indexPage)
	mux.HandleFunc("/post", postPage)
	mux.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	fmt.Println("Starting server")
	http.ListenAndServe(port, mux)
}
