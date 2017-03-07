const co = require('co');
// let a = co.wrap(function *(){
// 	let x = yield new Promise((resolve,reject) => {console.log(1);setTimeout(function(){resolve(1);}, 1000);})
// 	let y = yield new Promise((resolve,reject) => {console.log(2);setTimeout(function(){resolve(2);}, 1000);})
// 	let z = yield new Promise((resolve,reject) => {console.log(3);setTimeout(function(){resolve(3);}, 1000);})
// 	// let p = yield function (){setTimeout(function(){console.log(4);}, 1000)}
// 	// let m = yield function (){setTimeout(function(){console.log(5);}, 1000)}
// 	return x + y + z;
// });
let a = co.wrap(function *(){
	console.log('a')
	let x = yield new Promise((resolve,reject) => {console.log(1);setTimeout(function(){resolve(1);}, 1000);})
	console.log('b')
	let y = yield new Promise((resolve,reject) => {console.log(2);setTimeout(function(){resolve(2);}, 1000);})
	console.log('c')
	let z = yield new Promise((resolve,reject) => {console.log(3);setTimeout(function(){resolve(3);}, 1000);})
	// let p = yield function (){setTimeout(function(){console.log(4);}, 1000)}
	// let m = yield function (){setTimeout(function(){console.log(5);}, 1000)}
	return x + y + z;
});
a().then((val) => {console.log(val);});

// 直接调用co会立即执行，得到执行结果，使用wrap返回一个可执行的方法，方法里调用co，得到执行结果。
// wrap接收一个构造器方法，yield后面跟着promise方法，最后return值为所有过程执行到最后的结果(或者是undefined)
// co方法构造一个promise对象，在外层promise中依次执行构造器函数的next方法，next方法返回值是一个promise对象，promise执行结束后，程序交给next执行，这样程序就会按照next的顺序，依次向下执行，直到执行结束返回undefined或者遇到return。
