var http=require('http');

http.createServer(function(req,res){

const{url,method}=req;

if(url==="/login"){
    res.write("login page");

}else if(url==="/signup"){
    res.write("signup page");
}
else{
    res.write("home page");
}
res.end();


}).listen(8080)