const express = require('express');
const bodyparser = require('body-parser');
const fs = require('fs'); //need to read static files
const url = require('url'); //to parse url strings
const path = require('path');
let qstring = require('querystring')
const https = require('https')
var request = require('request');


const app = express();
const PORT = process.env.PORT || 3000
const API_KEY = '53cf33428af139299264ba93dffe6803'
const ROOT_DIR = '/public' //root directory for our static pages

const MIME_TYPES = {
    'css': 'text/css',
    'gif': 'image/gif',
    'htm': 'text/html',
    'html': 'text/html',
    'ico': 'image/x-icon',
    'jpeg': 'image/jpeg',
    'jpg': 'image/jpeg',
    'js': 'application/javascript',
    'json': 'application/json',
    'png': 'image/png',
    'svg': 'image/svg+xml',
    'txt': 'text/plain'
}
//stack overflow: https://stackoverflow.com/questions/23976823/express-js-controller-to-get-data-from-an-api-service-and-render-the-view

function renderTemplates(ing, res) {

  request.get(`http://www.food2fork.com/api/search?q=${ing}&key=${API_KEY}`, {json:true}, function(err, response, body) { 

      if (!err && response.statusCode == 200) {
          
          res.render('pages/index', body);
      }

  });

}



//this came from a youtube video: Express crash course:  https://www.youtube.com/watch?v=gnsO8-xJ8rs&index=183&list=WL&t=128s
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));



app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true }))


//Middleware
app.use(express.static(__dirname + ROOT_DIR)) //provide static server

//Routes
//catch all requests an log them using app.all route
app.all('*', function(req, res, next){
  console.log('-------------------------------')
  console.log('req.path: ', req.path)
  console.log('serving:' + __dirname + ROOT_DIR + req.path)
  next() //allow next route or middleware to run
});


app.get('/recipes',function(req,res){//
  let requestURL = req.url
  let query = url.parse(requestURL).query
  let qObj = qstring.parse(query)
  if(qObj!=null){
    renderTemplates(qObj.ingredients,res);
  }
    
});
app.get('/',function(req,res){//
  let requestURL = req.url
  let query = url.parse(requestURL).query
  let qObj = qstring.parse(query)
  if(qObj!=null){
    renderTemplates(qObj.ingredients,res);
  }
    
});
app.get('/recipes.html',function(req,res){//
  let requestURL = req.url
  let query = url.parse(requestURL).query
  let qObj = qstring.parse(query)
  if(qObj!=null){
    renderTemplates(qObj.ingredients,res);
  }
    
});
app.get('/index.html',function(req,res){//
  let requestURL = req.url
  let query = url.parse(requestURL).query
  let qObj = qstring.parse(query)
  if(qObj!=null){
    renderTemplates(qObj.ingredients,res);
  }
    
});


app.post('/',function(req,res){
  console.log(req.body)
  if(req.body.ingredients!=null){
    renderTemplates(req.body.ingredients,res);
  }

});
app.post('/recipes',function(req,res){
  console.log(req.body)
  if(req.body.ingredients!=null){
    renderTemplates(req.body.ingredients,res);
  }

});

app.listen(PORT,function(err){
if(err) console.log(err);

console.log("server started on: http://localhost:3000/recipes ")
console.log("http://localhost:3000/recipes.html")
console.log("http://localhost:3000/recipes")
console.log("http://localhost:3000/index.html")
console.log("http://localhost:3000/")
console.log("http://localhost:3000")
});

