const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const mongo_client = require('mongodb').MongoClient;
const mongo_url = "mongodb://mongo:27017/doctors";
const collection = "doctors";
const endpoint = "/doctors";

app.use(bodyParser.json());

app.get(endpoint, function (req, res) {
    try {
        mongo_client.connect(mongo_url, function (err, db) {
            if (err) throw err;
            db.db(collection).collection(collection).find().toArray(function (err, result) {
                if (err) throw err;
                db.close();
                res.status(200).json(result);
            });
        });
    } catch (err) {
        res.status(500).json({ "error": "db not accesible" });
    }

});

app.get('/', function (req, res) {
    return res.status(200).send({
        "service_name":"doctors",
        "version": "1.0"
    })
});


app.listen(3003, () => console.log('Example app listening on port 3003!'))
