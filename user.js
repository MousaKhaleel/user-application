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
// done
// //////////////////redo////////////////////
app.get('/user/:id',function(req,res){

    var arr =["1", "2 ", "3"]
    if (arr.includes(String(req.params.id)))
    {
    var data= fs.readFileSync(__dirname+"/users.json") //as byte
    data= JSON.parse(String(data))
    console.log(data)
    var user = data['user'+req.params.id]
    console.log(user)

    res.send(user)
    }
    else
    {
      res.send("user id error")
    }
   
})/*{
    var data=fs.readFileSync(__dirname+'/users.json')
    data= JSON.parse(String(data))
    res.send('user is '+ data['user'+req.params.id])
})*/

// ////////////////redo//////////////////////
app.delete('/delete/:id',function(req,res){
    var data= fs.readFileSync(__dirname+"/users.json") //as byte
    data= JSON.parse(String(data))
    // var user = data['user'+req.params.id]
    delete data['user'+req.params.id]
    res.send(data)
})

// //////////////redo////////////////////////
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
    res.send(data)
})






// //////////////////////////////////////
var server=app.listen(7000,function(){
    var host=server.address().address;
    var port=server.address().port;
});