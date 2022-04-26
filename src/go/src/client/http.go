package client

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
)

func sendRequest(name string, content []byte) io.Reader {
	resp, error := http.Post("http://localhost:1233"+name, "", bytes.NewReader(content))
	if error != nil {
		fmt.Println("%v\n", error)
	}
	return resp.Body
}
