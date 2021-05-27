const router=require('express').Router();
const mongoose = require('mongoose');
let Todo=require('../models/Todo.model');


router.route('/getinfo/:id').get((req,res)=>{
        console.log(req.params.id)
        Todo.find({_id:req.params.id})
        .then(todo=>{
            res.json(todo)})
        .catch(err=>res.status(400).json('Error:'+err));

    });

router.route('/add').post((req,res)=>{
    
    var todo = new Todo;
     todo.TodoTitle=req.body.TodoTitle;
     todo.TodoDescription=req.body.TodoDescription;
     todo.UserID=req.body.UserID;
    todo.save()
    .then(()=>{
        res.json('Todo added')})
    .catch(err=>{
        res.status(400).json('SERVER Replay:Add Todo ERROR:'+err);});

});

router.route('/update').post((req,res)=>{

    Todo.findById(req.body.TodoID)
    .then(todo=>{
        todo.TodoTitle=req.body.TodoTitle;
        todo.TodoDescription=req.body.TodoDescription;

        todo.UserID=req.body.UserID;
        todo.save()
        .then(()=>res.json('Todo updated'))
        .catch(err=>{ res.status(400).json('Update Todo Error:'+err)})
    })
   
})
router.route('/delete/:id').post((req,res)=>{
    Todo.findByIdAndDelete(req.params.id)
    .then(()=>res.json('Todo Deleted'))
    .catch(err=>res.status(400).json('Todo Delete Error:'+err));
})


module.exports=router;