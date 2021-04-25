const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://mhidrovo:aaa@cluster0.jwixh.mongodb.net/Stock?retry\
             Writes=true&w=majority";  

var fs = require('fs');
var readline = require('readline');


MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if(err) { return console.log(err); return;}
    
      var dbo = db.db("Stock");
      var collection = dbo.collection('companies');

      file = 'companies.csv';
      var read_interface = readline.createInterface({
      input : fs.createReadStream(file)
      })
      read_interface.on('line', function(line){
        if(line != "Company,Ticker") {
          var info = line.split(',');
          var newData = {"company": info[0], "ticker": info[1]};
          collection.insertOne(newData, function(err, res) {
            if(err) { console.log("query err: " + err); return; }
            console.log("new document inserted");
            }   );
        }
    })
      console.log("Success!");
  });



