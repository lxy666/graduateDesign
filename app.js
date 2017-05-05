var koa = require('koa');
var controller = require('koa-route');

var views = require('co-views');
var render = views('./view', {
    map: {html: 'ejs'}
});

var koa_static = require('koa-static-server');
var service = require('./service/tripService.js');
var querystring = require('querystring');
app.use(koa_static({
    rootDir: './static/',
    rootPath: '/static/',
    maxage: 0
}));

//注册接口
app.use(controller.get('/register', function*() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var phone = params.phone;
    var pwd = params.pwd;
    var name = params.name;
    this.body = yield service.register(phone, pwd, name);
}));

//登录接口
app.use(controller.get('/login', function*() {
    this.set('Cache-Control', 'no-cache');
    var params = querystring.parse(this.req._parsedUrl.query);
    var phone = params.phone;
    var pwd = params.pwd;
    this.body = yield service.load(phone, pwd);
}));

//查看版本信息
app.use(controller.get('/check_version', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield service.check_version();
}));

app.use(controller.get('/login.html', function*() {
    this.set('Cache-Control', 'no-cache');
    this.body = yield render('login');
}));


app.listen(3000);
console.log('Koa server is started!');
