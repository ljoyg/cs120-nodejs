const MongoClient = require('mongodb').MongoClient;
const readline = require('node:readline');
const fs = require('node:fs');

const url = "mongodb+srv://ljgaither99_db_user:WyuA6p3uQv88YLfP@hw10.0ibs88j.mongodb.net/?appName=hw10";
	  
async function readZips(filepath) {
  const fileStream = fs.createReadStream(filepath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  const result = {};

  for await (const line of rl) {
    // Simple split by comma; note: this doesn't handle escaped commas in quotes
    const values = line.split(',');
    if (result[values[0]]) {
      console.log('Updated ' + values[0] + ' with ' + values[1]);
      result[values[0]].push(values[1]);
    } else {
      console.log('Added ' + values);
      result[values[0]] = [values[1]];
    }
  }

  console.log(result);
  return result;
}


readZips('zips.csv').then((data) => { 
  for (const [key, value] of Object.entries(data))  {
    MongoClient.connect(url, async function(err, db) {
      var dbo = db.db("hw10");
      var collection = dbo.collection('places');
      if(err) { console.log(err); }
      else {
        newData = { place: key, zips: value }
        console.log(newData);
        await collection.insertOne(newData, function(err, res) {
          if(err) { console.log(err); }
          else { 
            console.log("Inserting...");
            console.log("New document " + key + " inserted!");
          }
        });
        console.log("Success!");
      }
      db.close();
    });
  }
});




