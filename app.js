//jshint esversion: 6
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');
const app= express();
app.use(express.static("public")); 
app.use(bodyParser.urlencoded({extended: true}));
app.get('/', function(req, res){
    res.sendFile(__dirname+'/signup.html');
});
app.post('/', function(req, res){
    var fname=req.body.first;
    var lname=req.body.last;
    var email=req.body.email;
    var data = {
        members:[
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };
    var json = JSON.stringify(data);
    const url =  "https://us9.api.mailchimp.com/3.0/lists/927d151162";
    const options = {
        method: "POST",
        auth: "aishikan:1bf4eac86041a6875201274c40127497-us9"
    }


    const request = https.request(url, options, function(response){

        if (response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
    });
    // request.write(json);
    request.end();
    
});
app.post('/failure', function(req, res){
    res.redirect('/');
});
app.listen(3000, function(){
    console.log('Started server at 3000');
})
// 1bf4eac86041a6875201274c40127497-us9
// 927d151162