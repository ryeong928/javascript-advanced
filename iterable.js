'use strict'

/*
  일급 함수 : 함수가 값으로 다뤄질 수 있다
  고차 함수 : 함수를 값으로 다루는 함수
    함수를 인자로 받아서 실행하는 함수
    함수를 만들어 반환하는 함수

  Symbol.iterator는 객체의 키로 사용될 수 있다
  이터레이터 : {value, done} 객체를 반환하는 next() 메서드를 가진 객체
  이터러블 : 이터레이터를 반환하는 [Symbol.iterator]() 메서드를 가진 객체
  이터러블/이터레이터 프로토콜 : 이터러블을 for of, 전개 연산자, 구조 분해, 나머지 연산자 등과 함께 동작하도록 규약
  Array, Set, Map, NodeList은 자바스크립트 내장 객체로서 이터러블/이터레이터 프로토콜을 따른다

  // for(const key in object) object[key]
  // for(const value of iterable) value
*/

const Ex1_arr = [1,2,3]
for (const a of Ex1_arr) console.log(a)
const Ex1_set = new Set([1,2,3])
for (const a of Ex1_set) console.log(a)
const Ex1_map = new Map([['a',1], ['b',2], ['c',3]])
for (const a of Ex1_map) console.log(a)
for (const a of Ex1_map.keys()) console.log(a)
for (const a of Ex1_map.values()) console.log(a)

console.log('generator ----------')
/*
  제너레이터 : 이터러블이면서 이터레이터인 객체를 생성하는 함수
*/

function *Ex2_gen() {
  yield 1
  if(false) yield 1.5
  yield 2
  yield 3
  // 제너레이터 함수의 return 값은 순회 대상이 아님
  return 100
}
for (const a of Ex2_gen()) console.log(a)
const Ex2_iter = Ex2_gen()
console.log(Ex2_iter[Symbol.iterator]() === Ex2_iter)
console.log('gen return : ', Ex2_iter.next())
console.log('gen return : ', Ex2_iter.next())
console.log('gen return : ', Ex2_iter.next())
console.log('gen return : ', Ex2_iter.next())
console.log('gen return : ', Ex2_iter.next())


// 무한 함수
function* Ex2_infinity(i = 0){
  while(true) yield i++
}
// 홀수 반환 함수
function* Ex2_odds(limit = 10){
  // for(let i=0; i < limit; i++){
  //   if(i % 2) yield i
  // }
  for (const a of Ex2_infinity()){
    if(a % 2) yield a
    if(a === limit) return
  }
}
for (const a of Ex2_odds()) console.log(a)

console.log('iterable, iterator 응용 ----------')
function map(cb, iter){
  let res = []
  for(const a of iter){
    res = cb(a)
  }
  return res
}
function filter(cb, iter){
  let res = []
  for(const a of iter){
    if(cb(a)) res.push(a)
  }
  return res
}
function reduce(cb, acc, iter){
  // acc 생략인 경우
  if(!iter){
    iter = acc[Symbol.iterator]()
    acc = iter.next().value
  }
  for(const a of iter){
    acc = cb(acc, a)
  }
  return acc
}
// 값을 받아 값을 반환
const go = (...args) => reduce((a, f) => f(a), args)
// 함수를 받아 함수를 반환
const pipe1 = (...fs) => (a) => go(a, ...fs)
const pipe2 = (f, ...fs) => (...as) => go(f(...as), ...fs)
const curry = f => (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._) 

go(0, a => a + 1, a => a + 10, a => a + 100, console.log)
const Ex3_pipe = pipe1(a => a + 1, a => a + 10, a => a + 100, console.log)
Ex3_pipe(1000)