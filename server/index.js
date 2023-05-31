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
app.get('/tipocambio', function (req, res){
    res.json({
        "TipoCompraDolares" : "533",
        "TipoVentaDolares" : "570",
        "TipoCompraEuros" : "731.85",
        "TipoVentaEuros" : "761.9"
        });
});

//start the app
app.listen(3001, () => console.log('Example app listening on port 3001'));