package main

type param struct {
	name string
}

func isEven(integer param, a int) bool {
	if integer.name == "" {
		return true
	}
	return false
}

/*func main1() {
	t := reflect.TypeOf(isEven)
		var a interface{}
	a = isEven
	fmt.Printf("%v\n", t.NumIn()) // number of input variables
	fmt.Printf("%v\n", t.NumOut())
	fmt.Printf("%v\n", t.In(0)) // type of input variable i
	fmt.Printf("%v\n", t.Out(0))
	//a(param{"hello"})
}
*/
