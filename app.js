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
        var search = qs.parse(body).answer;
        async function searchDB(search) {
            console.log("connecting...");
            try {
                await client.connect();
                var dbo = db.db("hw10");
                var collection = dbo.collection('places');
                if(err) { console.log(err); }
                else {
                    if (isDigit(search[0])) {
                        const results = await collection.find({ zips: search });
                    } else {
                        const results = await collection.find({ place: search })
                    };
                    res.write(results);
                };
                console.log("connected");
            } finally {
                db.close();
                res.end();
            }
        };
        searchDB(search);
    });
  }
}).listen(port);

