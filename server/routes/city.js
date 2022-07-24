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
module.exports=cityRoutes;