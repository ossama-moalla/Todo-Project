import React,{Component} from 'react';
import axios from 'axios';

class AddTodo extends Component{
    constructor(props)
    {
        super(props);
       this.state.UserID=this.props.location.User.UserID;
    }
    state={
        TodoTitle:'',
        TodoDescription:'',
        UserID:undefined,
    }
    
    onsubmit=async(e)=>{
        e.preventDefault(); 
        const todo={
            TodoTitle:this.state.TodoTitle,
            TodoDescription:this.state.TodoDescription,
            UserID:this.state.UserID,
        }
            
console.log(todo)
            await axios.post("http://localhost:5000/todo/add",todo)
            .then(res=>console.log('Todo added'))
            .catch(err=>console.log('Client:todo add error:'+err.response.data)); 
            this.props.history.push({
                pathname: '/',
                state: { UserID: this.state.UserID }
           })        
        
         
        
        
    }
    onChangeTodoTitle=(e)=>{
        this.setState({TodoTitle:e.target.value});
    }
    onChangeTodoDescription=(e)=>{
        this.setState({TodoDescription:e.target.value});
    }
    
    render(){

        return(
            
            <form onSubmit={this.onsubmit}>
                <div className="container"  >
                <div className="row" style={{margin:10,marginTop:0}}>
                    <div className="col-sm" style={{width:"50%",margin:20}}>
                        <br/>
                        <label >Todo Title</label>
                        <input type="text"
                        required className="form-control" 
                        value={this.state.TodoTitle}
                        onChange={this.onChangeTodoTitle}
                        autoFocus
                        />
                        <label>Todo Descrition</label>
                        <input type="text"
                        required className="form-control" 
                        value={this.state.TodoDescription}
                        onChange={this.onChangeTodoDescription}
                        
                        />
                    </div>
                   
                </div>
                <div className="row" style={{margin:10}}>
                    <div style={{margin:"auto",float:"left",width:300}}>
                        <input type="submit"  value="add Todo" className="btn btn-primary" style={{margin:5,width:100,height:50}}/>
                        <button style={{margin:5,width:100,height:50}} className="btn btn-primary"
                         onClick={()=>{this.props.history.push({
                                pathname: '/',
                                state: { UserID: this.state.UserID }
                            })}}>Back</button>     
                    </div>
                   
                </div>

                    
                    
                </div>  
                
            </form>

        );

    }
}

export default AddTodo;