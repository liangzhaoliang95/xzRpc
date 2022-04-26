package client

import (
	"encoding/json"
	"fmt"
	"io"
	"reflect"
)

type result struct {
	C int             `json:"c"`
	O json.RawMessage `json:"o"`
	r reflect.Value
}
type client struct {
	port int
	host string
}

func NewClient(port int, host string) func(funcName string, fptr interface{}) {
	var a = client{port, host}
	return a.getRemoteFunc
}

func (me *client) getRemoteFunc(funcName string, fptr interface{}) {
	fmt.Printf("%d\n", me.port)
	fn := reflect.ValueOf(fptr).Elem()
	ft := fn.Type()
	rc := func(in []reflect.Value) []reflect.Value {
		var arguments = make([]interface{}, len(in))
		for i := 0; i < len(in); i++ {
			//func Marshal(v interface{}) ([]byte, error)
			arguments[i] = in[i].Interface()
		}
		content, err := json.Marshal(arguments)
		if err != nil {

		}
		reader := sendRequest(funcName, content)
		res := getContent(reader, ft)
		if res.C == 0 {
			return []reflect.Value{res.r}
		}
		return nil
	}

	// Make a function of the right type.
	v := reflect.MakeFunc(ft, rc)

	// Assign it to the value fn represents.
	fn.Set(v)
}

func getContent(r io.Reader, funcType reflect.Type) result {
	//var count = funcType.NumOut()
	var res = result{}
	argt := funcType.Out(0)
	argv := reflect.New(argt)
	dec := json.NewDecoder(r)
	dec.Decode(&res)
	res.r = argv.Elem()
	json.Unmarshal(res.O, argv.Interface())
	return res
}
