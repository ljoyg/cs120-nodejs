var http = require('http');
const { start } = require('node:repl');
var url = require('url');
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);
const MongoClient = require('mongodb').MongoClient;
// const readline = require('node:readline');

const mongourl = "mongodb+srv://ljgaither99_db_user:WyuA6p3uQv88YLfP@hw10.0ibs88j.mongodb.net/?appName=hw10";

const isDigit = (char) => /^\d$/.test(char);

var port = process.env.PORT || 8080;

startServer();

async function startServer() {
    console.log("i'm trying my best");
  http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  urlObj = mongourl.parse(req.url,true);
  path = urlObj.pathname;
//   if (path == "/")
//     {
      s = '<div id="display">' +
          '<form id="myForm" action="/process" method="post">' +
              '<label>Please enter a zip code or a place: </label><input type="text" id="answer"><br/>' +
              '<input type="submit">' +
          '</form>' +
      '</div>';
      res.write(s);
//     }
//   else if (path == "/process") {
//     try {
//         var body = '';
//         req.on('data', chunk => { body += chunk.toString(); });
//         var search = qs.parse(body).answer;
//         MongoClient.connect(url, async function(err, db) {
//             var dbo = db.db("hw10");
//             var collection = dbo.collection('places');
//             if(err) { console.log(err); }
//             else {
//                 if (isDigit(search[0])) {
//                     const results = await collection.find({ zips: val });
//                 } else {
//                     const results = await collection.find({ place: val })
//                 };
//                 res.write(results);
//             };
//         });
//     } finally {
//         db.close();
//     }
//   }
  res.end();
}).listen(port);
}