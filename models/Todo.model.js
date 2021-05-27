const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const User=require('./user.model');
const TodoSchema=new Schema({
    TodoTitle:{
        type:String,
        required:true,
        minlength:3
    },
    TodoDescription:{
        type:String,
        required:false,
        minlength:3
    },
    UserID:
    {
        type:Schema.Types.ObjectId,
        ref: 'User',
    },
},{
    timestamps:true
});

const Todo= mongoose.model('Todo',TodoSchema);

module.exports=Todo;