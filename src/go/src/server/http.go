package server

import (
	"encoding/json"
	"fmt"
	"net/http"
)

func (me *server) ServeHTTP(w http.ResponseWriter, req *http.Request) {
	method := req.URL.Path
	fmt.Printf("command comes %v\n", method)
	res, err := call(method, req.Body)
	if err != nil {

	}
	enc := json.NewEncoder(w)
	var r = result{0, res.Interface()}
	enc.Encode(r)
}
func Start(info Info) {
	if started {
		return
	}
	started = true
	server := &http.Server{Addr: ":1233", Handler: &allMethod}
	error := server.ListenAndServe()
	if error != nil {
		fmt.Printf("%v\n", error)
	}
}
