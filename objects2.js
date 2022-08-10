'use strict'
// class : template
// object : instance of a class

// for(const key in object) object[key]
// for(const value of iterable) value
// Object.assign(target, source): target & source

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

  // 메서드
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



// 클래스 상속
class Shape{
  constructor(width, height){
    this.width = width
    this.height = height
  }
  // 클래스에서 작성한 메서드는 Shape의 프로토타입에 저장된다
  area(){
    return console.log('도형의 넓이', this.width * this.height)
  }
}
class Rectangle extends Shape{
  // 자식 클래스에서 constructor를 사용시, 반드시 부모 constructor의 매개변수와, super()를 적용해야함
  constructor(width, height){
    super(width, height)
    this.angle = 90
  }
  /*
  자식 클래스에서 constructor를 적어주지 않을 경우, 다음과 같이 자동으로 실행
  constructor(...args){
    super(...args)
  }
  */ 

}
class Triangle extends Shape{
  // 오버라이딩
  area(){
    // super를 통한 부모 메서드 사용
    super.area()
    return console.log('삼각형 넓이', this.width * this.height / 2)
  }
}
const rectangle = new Rectangle(10, 10)
console.log('직사각형 각도: ', rectangle.angle)
rectangle.area()
const triangle = new Triangle(10, 10)
triangle.area()
// 인스턴스 확인
console.log('인스턴스 확인 : ', rectangle instanceof Rectangle)
// 프로퍼티 확인
console.log('프로퍼티 확인 : ', 'width' in rectangle)
