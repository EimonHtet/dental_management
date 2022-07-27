const express=require("express");
const cityRoutes= express.Router();
const dbo=require('../db/conn')
const ObjectId=require("mongodb").ObjectId;
cityRoutes.route('/cities').get(function(request,response){
    let db_connect=dbo.getDb();
    db_connect.collection("cities").find({}).toArray( function(err,result){
        if(err) throw err;
        response.json(result)
    })
})
cityRoutes.route('/cities').post(function(request, response){
    const db_connect=dbo.getDb();
    console.log(request.body)
    const query=(({name})=>({name}))(request.body)
    db_connect.collection("cities").insertOne(query, function(err,result){
        if(err) throw err;
        response.json(result)
    })
})
cityRoutes.route('/cities/:id').post(function (request, response){
    const db_connect=dbo.getDb();
    const _id=request.params._id;
    const payload=request.body;
    console.log(payload);
    console.log(_id);
    db_connect.collection("cities").updateOne({_id:ObjectId(_id)},
    {$set:payload}).then((obj)=>{response.json(obj)})
})
cityRoutes.route('/cities/:id').delete(function (request, response){
    const db_connect=dbo.getDb();
    db_connect.collection("cities").deleteOne({_id:ObjectId(request.params.id)}, function(err, result){
        if(err) throw err;
        response.json(result);
    })
})
module.exports=cityRoutes;