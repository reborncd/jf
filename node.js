var express = require('express');
var app = express();
//设置跨域访问
app.all('*', function(req, res, next) {
	  res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(express.static(__dirname+'/dist/'))
console.log(__dirname+'./dist/')
app.get("/login",function (req,res) {
    res.sendFile(__dirname+'/dist/index.html')
});
app.post("/b",function (req,res) {
    res.send({"a":"a"})
});
app.listen("1234")