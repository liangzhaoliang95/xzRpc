package main

import (
	_ "reflect"
	"server"
)

type TestP struct {
	name int
}
type Arg struct {
	Hi   int `json:"hi"`
	Name int `json:"name"`
}

func Test(a *TestP, b *Arg) *Arg {
	//fmt.Printf("%p %p\n", a, b)
	b.Hi++
	return b
}

func serverMain() {
	server.Register("/hello", Test, "test")
	server.Start(server.Info{})
}
