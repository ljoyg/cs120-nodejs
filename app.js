var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var port = process.env.PORT || 3000;
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8", "0.0.0.0"]);
const MongoClient = require('mongodb').MongoClient;

const mongourl = "mongodb+srv://ljgaither99_db_user:WyuA6p3uQv88YLfP@hw10.0ibs88j.mongodb.net/?appName=hw10";

const client = new MongoClient(mongourl);

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  urlObj = url.parse(req.url,true)
  path = urlObj.pathname;
  if (path == "/")
  {
    file="homeview.txt";
    fs.readFile(file, function(err, homeView) {
    res.write(homeView);
    res.end();
    })
  }
  else if (path == "/process")
  {
    var body = '';
    req.on('data', chunk => { body += chunk.toString();  });
    req.on('end', () => 
        { 
        res.write ("Raw data string: " + body +"<br/>");
        try {
            var search = qs.parse(body).answer;
            MongoClient.connect(mongourl, async function(err, db) {
                console.log("connected");
                var dbo = db.db("hw10");
                var collection = dbo.collection('places');
                if(err) { console.log(err); }
                // else {
                //     if (isDigit(search[0])) {
                //         const results = await collection.find({ zips: val });
                //     } else {
                //         const results = await collection.find({ place: val })
                //     };
                //     res.write(results);
                // };
            });
        } finally {
            db.close();
            res.end();
        }
    });
  }
}).listen(port);


// var http = require('http');
// const { start } = require('node:repl');
// // var url = require('url');
// // require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8", "0.0.0.0"]);
// // const MongoClient = require('mongodb').MongoClient;
// // const readline = require('node:readline');

// // const mongourl = "mongodb+srv://ljgaither99_db_user:WyuA6p3uQv88YLfP@hw10.0ibs88j.mongodb.net/?appName=hw10";

// const isDigit = (char) => /^\d$/.test(char);

// var port = process.env.PORT || 3000;

// async function startServer() {
//     console.log("i'm trying my best");
//     http.createServer(function (req, res) {
//     res.writeHead(200, {'Content-Type': 'text/html'});
// //   if (path == "/")
// //     {
// //     }
// //   else if (path == "/process") {
// //     try {
// //         var body = '';
// //         req.on('data', chunk => { body += chunk.toString(); });
// //         var search = qs.parse(body).answer;
// //         MongoClient.connect(url, async function(err, db) {
// //             var dbo = db.db("hw10");
// //             var collection = dbo.collection('places');
// //             if(err) { console.log(err); }
// //             else {
// //                 if (isDigit(search[0])) {
// //                     const results = await collection.find({ zips: val });
// //                 } else {
// //                     const results = await collection.find({ place: val })
// //                 };
// //                 res.write(results);
// //             };
// //         });
// //     } finally {
// //         db.close();
// //     }
// //   }
//   res.end();
// }).listen(port);
// }

// startServer();

