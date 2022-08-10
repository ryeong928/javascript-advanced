'use strict'
// class : template
// object : instance of a class

// 클래스 선언
class Person{
  constructor(name, age){
    // fields
    this.name = name
    this.age = age
  }
  // public, private
  location = "korea"
  #address = "ui-wang"

  // static
  static phrase = "nice to meet you"
  static greeting(){
    console.log(this.phrase)
  }

  // methods
  speak(){
    console.log(`${this.name}: hello! i'm from ${this.#address}`)
  }

  // getter, setter
  get age(){
    return this._age
  }
  set age(value){
    if(value < 0) throw Error("나이는 0미만이 될 수 없습니다")
    this._age = value
  }
}
// 인스턴스 생성
const park = new Person('park', 30)
// 메소드 사용
park.speak()
// static 사용
Person.greeting()



// 상속
class Shape{
  constructor(width, height){
    this.width = width
    this.height = height
  }
  area(){
    return console.log('도형의 넓이', this.width * this.height)
  }
}
class Rectangle extends Shape{}
class Triangle extends Shape{
  // 오버라이딩
  area(){
    // super를 통한 부모 메소드 사용
    super.area()
    return console.log('삼각형 넓이', this.width * this.height / 2)
  }
}
const rectangle = new Rectangle(10, 10)
rectangle.area()
const triangle = new Triangle(10, 10)
triangle.area()
// 인스턴스 확인
console.log('인스턴스 확인 : ', rectangle instanceof Rectangle)
// 프로퍼티 확인
console.log('프로퍼티 확인 : ', 'width' in rectangle)


// for(key in object) object[key]
// for(value of iterable) value
// Object.assign(target, source): target & source
