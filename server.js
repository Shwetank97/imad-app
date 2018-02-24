var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

var articles = {
     'article-one' : {
        title: 'Article One',
        content: ` <p>Article 1</p>
        },
    var article-two : {
        title: 'Article Two',
        content: `
        <p>
                        Article 2
                        
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
        },    
     'article-two' : {
        title: 'Article Two',
        content: `
        <p>
                        article 2
                        
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

    `;
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
