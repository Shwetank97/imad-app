var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;

var config = {
    user : 'shwetankawasthi97',
    database : 'shwetankawasthi97',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var pool = new Pool(config);

var app = express();
app.use(morgan('combined'));

var articles = {
     'article-one' : {
        title: 'Article One',
        content: " <p>Article 1</p> "
        },
    'article-two' : {
        title: 'Article Two',
        content: 'Article 2'
        },    
      'article-three' : {
        title: 'Article Three',
        content: `
        <p>
                        article 3
                        
                    </p>
                    
                     <p>
                        My new way of doing thing is to matter personally.My new way of doing thing is to matter personally
                        My new way of doing thing is to matter personally
                        My new way of doing thing is to matter personally
                        
                    </p>
                    
                     <p>
                        My new way of doing thing is to matter personally.My new way of doing thing is to matter personally
                        My new way of doing thing is to matter personally
                        My new way of doing thing is to matter personally
                        
                    </p>`
        }
};

function createTemplate(data){
    title = data.title;
    content = data.content;

app.get('/test-db', function(req, res){
    // make a select request
    // return a response
    pool.query('Select * from test', function(err, result){
        if(err){
            res(500).send(err.toString());
        }
        else{
            send(JSON.stringify(result));
        }
    });
});

var htmlTemplate =`
    <html>
        <head>
            <title>
                ${title}
            </title>
            <link href="/ui/style.css" rel="stylesheet" />
        </head>
        <body>
            <div>
            <h1>
                <a href= "/"> Home</a>
            </h1>
            </div>
            <hr/>
            <h3>
                Article One
            </h3>
            <div>
                feb 27 2018
            </div>
            <div>
                ${content}
            </div>
        </body>
    </html>
`
    ;
    return htmlTemplate;
    
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/:articleName', function (req, res) {
    //article-name == articleOne
    //article[article-name] == {} content object for article name
  var articleName = req.params.articleName;    
  res.send(createTemplate(articles[articleName]));
});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
