class Person {
    constructor(name){
        this.name = name
    }
    hello = function () {
        console.log("Hi "+ this.name)
    }
}

const person = new Person("Lindsay")
person.hello()