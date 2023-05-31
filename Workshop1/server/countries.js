const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

//Middlewares
app.use(bodyParser.json());
app.use(cors({
    domains: '*',
    methods: "*"
}));

//routes
app.get('/countries', function (req, res){
    res.json([
                {
                    "id": 1,
                    "name": "Costa Rica",
                },
                {
                    "id": 2,
                    "name": "Guatemala",
                },
                {
                    "id": 3,
                    "name": "El Salvador",
                },
                {
                    "id": 4,
                    "name": "Colombia",
                },
                {
                    "id": 5,
                    "name": "Argentina",
                },
                {
                    "id": 6,
                    "name": "Panama", 
                }
        ]);
});

//start the app
app.listen(3002, () => console.log('Example app listening on port 3002'));