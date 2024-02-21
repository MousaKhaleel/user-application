console.log('test');


const express= require('express');
var app=express();

var fs=require('fs');


app.get('/',function(req,res)
{
    res.send('server started');
});
// //////////////////////////////////////
app.get('/form',function(req,res){
    res.sendFile(__dirname+'/form.html');
});


// //////////////////////////////////////
app.get('/list',function(req,res){
    var data= fs.readFileSync(__dirname+'/users.json')
    res.send(String(data))
})
// //////////////////////////////////////
app.get('/user/:id',function(req,res){
    var arr =["1", "2", "3"];

    if (arr.includes(String(req.params.id))){
    var data= fs.readFileSync(__dirname+"/users.json");
    data= JSON.parse(String(data));
    var user = data['user'+req.params.id];
    res.send(user)
    }
    else{
      res.send("id d.n.e")
    }
});

// //////////////////////////////////////
app.delete('/delete/:id',function(req,res){
    var data= fs.readFileSync(__dirname+"/users.json");
    data= JSON.parse(String(data))
    delete data['user'+req.params.id]
    // fs.writeFileSync(__dirname + "/users.json", JSON.stringify(data)); //actually delete
    res.send(data)
})

// //////////////////////////////////////
var bodyParser=require('body-parser');
var urlEncoded=bodyParser.urlencoded({extended:false});

app.post('/add',urlEncoded,function(req,res){
    var newUser={name:'',password:'',profession:''}
    newUser.name=req.body.name
    newUser.password=req.body.password
    newUser.profession=req.body.profession
    var data= fs.readFileSync(__dirname+"/users.json")
    data=JSON.parse(String(data))
    data['u4']=newUser
    // fs.writeFileSync(__dirname + "/users.json", JSON.stringify(data)); //actually add
    res.send(data)
});


// //////////////////////////////////////
var server=app.listen(7000,function(){
    var host=server.address().address;
    var port=server.address().port;
});