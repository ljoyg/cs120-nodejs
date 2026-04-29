var http = require('http');
var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var port = process.env.PORT || 3000;
require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8", "0.0.0.0"]);
const MongoClient = require('mongodb').MongoClient;

const mongourl = "mongodb+srv://ljgaither99_db_user:WyuA6p3uQv88YLfP@hw10.0ibs88j.mongodb.net/?appName=hw10";

const client = new MongoClient(mongourl);

async function launchServer() {
    http.createServer(async function (req, res) {
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
                    var dbo = client.db("hw10");
                    var collection = dbo.collection('places');
                    const isDigit = (char) => /^\d$/.test(char);
                    console.log(search);
                    if (isDigit(search[0])) {
                        const results = await collection.findOne({ zips: search }, { _id: 0, title: 1, author: 1 });
                        console.log(results);
                        res.write("City: " + results.place + "; Zips: " + results.zips);
                    } else {
                        const results = await collection.findOne({ place: search }, { _id: 0, title: 1, author: 1 });
                        console.log(results);
                        res.write("City: " + results.place + "; Zips: " + results.zips);
                    };
                    console.log("connected");
                } finally {
                    await client.close();
                    res.end();
                }
            };
            searchDB(search).catch(console.dir);
        });
    }
    }).listen(port);
}

launchServer();

