package server

import (
	"encoding/json"
	"io"
	"log"
	"reflect"
	"time"
)

/*Info ...
 */
type Info struct {
	Port int
	Host string
	Ips  []string
}

var info Info
var started bool

type method struct {
	max, count, failed int
	name               string
	desc               string
	method             interface{}
}
type server map[string]method

var allMethod = server(make(map[string]method)) // map[string]interface{}

func Register(name string, function interface{}, desc string) {
	if started {
		return
	}
	//检查重复
	allMethod[name] = method{0, 0, 0, name, desc, function}
}

type result struct {
	C int         `json:"c"`
	O interface{} `json:"o"`
}

/*Call ...
 */
func call(name string, r io.Reader) (reflect.Value, error) {
	var method, ok = allMethod[name]
	if !ok {
		//	return [], nil
	}
	fn := method.method
	var begin = time.Now()
	v := reflect.ValueOf(fn)
	t := reflect.TypeOf(fn)
	result := v.Call(getArguments(r, t))
	var end = time.Now()
	var delta = end.Sub(begin)
	_ = delta
	/*if delta > method.max {

	}*/
	return result[0], nil
}

func getArguments(r io.Reader, funcType reflect.Type) []reflect.Value {
	var count = funcType.NumIn()
	rargs := make([]reflect.Value, count)
	dec := json.NewDecoder(r)
	_, err := dec.Token()
	if err != nil {
		log.Fatal(err)
	}
	for index := 0; index < count; index++ {
		argt := funcType.In(index)
		argv := reflect.New(argt)
		//fmt.Printf("argv=%x\n", argv.Pointer())//当参数是指针类型时,仅分配指针空间;
		//fmt.Printf("argv=%x\n", *(*uint64)(unsafe.Pointer(argv.Pointer())))//指针空间并没有赋值=0.
		dec.Decode(argv.Interface())
		//fmt.Printf("argv=%x\n", *(*uint64)(unsafe.Pointer(argv.Pointer())))//decode后,又分配了新的空间解压数据;
		rargs[index] = argv.Elem()
	}
	_, err = dec.Token()
	if err != nil {
		log.Fatal(err)
	}
	return rargs
}
