import React,{Component} from 'react';
import axios from 'axios';

class UpdateTodo extends Component{
    constructor(props)
    {
        super(props);
       this.state.TodoID=this.props.location.state.Todo._id;
       this.state.UserID=this.props.location.state.Todo.UserID;

       this.state.NewTodoTitle=this.props.location.state.Todo.TodoTitle;
       this.state.NewTodoDescription=this.props.location.state.Todo.TodoDescription;


    }
    state={
        NewTodoTitle:'',
        NewTodoDescription:'',
        TodoID:null,
        UserID:undefined
    }
    
    onsubmit=async(e)=>{
        e.preventDefault();
        const Todo={
            TodoID:this.state.TodoID,
            TodoTitle:this.state.NewTodoTitle,
            TodoDescription:this.state.NewTodoDescription,

            UserID:this.state.UserID
        }
        await axios.post("http://localhost:5000/todo/update/",Todo)
        .then(res=>console.log('Todo updated'))
        .catch(err=>console.log('Client:Todo update error:'+err.response.data)); 
        this.props.history.push({
           pathname: '/',
            state: { UserID: this.state.UserID }
        })
    }
    onChangeTodoTitle=(e)=>{
        this.setState({NewTodoTitle:e.target.value});
    }
    onChangeTodoDescription=(e)=>{
        this.setState({NewTodoDescription:e.target.value});
    }
    render(){
        return(
            
            <form onSubmit={this.onsubmit}>
                <div className="form-group" >
                    <label style={{backgroundColor:"#DDD",fontWeight:"bold"}}>
                        Update Todo:</label>
                    <br/><br/>
                    <label>New TodoTitle</label>
                    <input type="text"
                     required className="form-control" 
                     value={this.state.NewTodoTitle}
                     onChange={this.onChangeTodoTitle}
                     autoFocus
                     />
                     <label>New TodoDescription</label>
                     <input type="text"
                     required className="form-control" 
                     value={this.state.NewTodoDescription}
                     onChange={this.onChangeTodoDescription}
                     
                     />
                </div>  
                <div className="form-group">
                    <input type="submit"  value="Update Todo" className="btn btn-primary"  style={{margin:5}}/>
                    <button className="btn btn-primary" onClick={()=>{this.props.history.push({
            pathname: '/',
            state: { UserID: this.state.UserID }
        })}}>Back</button>
                </div>
            </form>

        );

    }
}

export default UpdateTodo;