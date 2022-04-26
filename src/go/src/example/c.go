package main

import (
	"client"
	"fmt"
)

var add func(a *TestP, b *Arg) *Arg

func clientMain() {
	var getRemoteFunc = client.NewClient(20, "00")
	getRemoteFunc("/hello", &add)
	var a = TestP{}
	var b = Arg{Hi: 11}
	c := add(&a, &b)
	fmt.Printf("%v\n", c.Hi)
}
