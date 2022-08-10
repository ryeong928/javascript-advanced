'use strict'
// 생성자 함수
function User(name, _age){
  // this = {}
  this.name = name
  // 생성자 함수에서 작성한 메서드는 프로토타입이 아닌 객체 자체에 추가된다
  // 생성자 함수의 인스턴스는 모두 동일한 greeting 메서드를 소유하게 됨 -> 프로토타입 상속을 통해 불필요한 중복 제거
  this.greeting = () => {
    console.log(`hi my name is ${this.name}`)
  }
  // 클로저
  const age = _age
  this.getAge = () => {
    console.log(`my age is ${age}`)
  }
  // return this
}
// 인스턴스 생성
const user1 = new User('kim', 21)
user1.greeting()

// 값 변경 : name 가능, age 불가능
user1.name = "park"
user1.greeting()
user1.getAge()

// 정적 프로퍼티/메서드 : 생성자 함수 자체가 소유한 프로퍼티/메서드. 인스턴스로 호출할 수 없다
User.staticProp = "static property"
User.staticMethod = function(){console.log('static: ', this.staticProp)}
User.staticMethod()

// 생성자 함수의 프로토타입 : 생성자 함수의 prototype 프로퍼티를 통해 접근이 가능하다
// 생성자 함수의 모든 인스턴스는 생성자 함수 프로토타입의 프로퍼티와 메서드를 사용할 수 있다
User.prototype.height = 170
User.prototype.doing = function(){console.log(this.height, "javascript")} // 화살표 함수 메서드로 하면 this 안먹힘
user1.doing()
// 생성자 함수의 인스턴스는 __proto__를 통해 생성자 함수 프로토타입에 접근할 수 있다
user1.__proto__.doing()
// instanceof : 우변의 생성자 함수의 prototype에 바인딩된 객체가 좌변의 객체의 프로토타입 체인 상에 존재하는지
console.log('instanceof: ', user1 instanceof User)
// 모든 프로토타입은 constructor 프로퍼티를 가지며, 이는 prototype 프로퍼티로 자신을 참조하는 생성자 함수를 가리킨다
console.log('constructor 프로퍼티는 생성자 함수를 가리킨다: ', user1.constructor === User)
// 모든 프로토타입의 프로토타입은 Object.prototype이다
console.log('모든 프로토타입의 프로토타입은 Object.prototype: ', Object.getPrototypeOf(User.prototype) === Object.prototype)


// 객체의 상속
const car = {
  wheels: 4,
  drive: function() { // 화살표 함수에서는 this 안먹힘
    console.log(`i go with ${this.wheels} wheels`)
  }
}
const bmw = {
  color: "blue"
}
bmw.__proto__ = car
bmw.drive()