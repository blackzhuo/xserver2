const co = require('co');
var middleware = [];
var app = function() {};
app.use = function(fn) {
    middleware.push(fn);
};
app.use(function*(next) {
    console.log(1);
    yield next;
    console.log('a');
})
app.use(function*(next) {
    console.log(2);
    yield next;
    console.log('b');
    return 2;
})
app.use(function*(next) {
    console.log(3);
    yield next;
    console.log('c');
    return 3;
})

function* noop() {}
function compose(middleware) {
    return function*(next) {
        if (!next) next = noop();
        var i = middleware.length;
        while (i--) {
            next = middleware[i].call(this, next);
        }
        return yield* next;
    }
}
var fn = co.wrap(compose(middleware));
fn();

// app通过use装载中间件，使用compose倒序加载中间件，保证第一个中间件的next指向第二个中间件，依次类推，直到最后一个中间件的next指向空的生成器函数。
// 使用co执行compose返回的生成器函数，首先是第一个中间件，遇到next时，判断next指向下一个中间件生成器,则使用co调用下一个中间件,依次到最后一个中间件，这个过程只执行了所有yield上面的代码，最后一个中间件执行完空生成器函数，返回promise结果，然后继续执行next，直到返回本层promise结果，再返回给上层，直到第一个中间件，这个过程yield下面的代码部分也被执行完了。