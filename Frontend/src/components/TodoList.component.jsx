import React, { Component } from 'react';
import mongoose from 'mongoose';

import axios from 'axios';
import {Link,Redirect} from 'react-router-dom';
const Todo=props=>{
    return(
    <tr key={props.todo._id}>
        <td>
        <img src={process.env.PUBLIC_URL + '/todo.png'} style={{width:25,height:25,marginTop:-8,marginRight:5}} /> 
        <Link to='#'  style={{textDecoration:"none"}} onClick={()=>{props.onClick(props.todo._id)}}>
            {props.todo.TodoTitle}</Link>
        </td>
        <td>{props.todo.TodoDescription}</td>
        <td>
            <Link to='#' onClick={()=>{props.onClick(props.todo._id)}}>Open</Link>|
            <Link to={{pathname:'/updatetodo' ,state:{Todo:props.todo}}}>Edit</Link>|
            <a href="#" onClick={()=>{props.onDelete(props.todo._id)}}>Delete</a>
        </td>

    </tr>);
}
class TodoList extends Component {
    constructor(props)
    {
        super(props);
        this.state.UserID=localStorage.getItem("UserID");
    }
    state = {
        UserID:undefined,
        TodoList:[],
      }
      componentDidMount(){
               
                this.updateComponents();

                // this.state.parentTodoid=this.props.match.params.id;
      }
       
      updateComponents=async()=>{
          
             await axios.get('http://localhost:5000/todo/'+this.state.UserID)
             .then(response=>{ 
                     this.setState({
                        TodoList:response.data}) ;

                     })
                    .catch(err=>{
                        console.log('Error'+err)
                            //this.props.history.push("/Error/"+err.response.data);
                    });
                    
                    
       
      }
      deleteTodo=async(id)=>{
        const r=await axios.post("http://localhost:5000/todo/delete/"+id)
            .then(res=>console.log('Todo Deleted!'))
            .catch(err=>console.log('Todo Delete Error:'+err.response.data)); 
            
            this.updateComponents();

        
        }
        
      getTodoList(){
        return this.state.TodoList.map(currentTodo=>
           {return <Todo todo={currentTodo}onDelete={this.deleteTodo} 
           onClick={this.updateComponents } key={currentTodo._id}/>});
  }

      render() { 
            

        return ( 
                <div>
                   
                    <h1>Todos:</h1>

                    <Link to={{pathname:'/addtodo' ,User:{UserID:this.state.UserID}}} style={{marginRight :40}}>Add Todo</Link>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Description</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                                {this.getTodoList()}                         
                        </tbody>
                    </table>
                </div>
            
            );
        }
}
 
export default TodoList;