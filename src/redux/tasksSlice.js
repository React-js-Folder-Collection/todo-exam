import { createSlice } from "@reduxjs/toolkit";
import uuid from 'react-uuid';

export const tasksSlice = createSlice({
    name: "Todos",
    initialState:[],
    reducers:{
        addTodo: (state, action)=>{
            state.push({
                id: uuid(),
                title: action.payload.todo,
                isComplete : false,
                isEditing : false,
            });
            localStorage.setItem('todos', JSON.stringify(state));
        },
        deleteTask: (state, action)=>{
            return state.filter((item) => item.id !== action.payload.id);
        },
        checkTask: (state, action)=>{
           state.map(todo =>{
                if(todo.id == action.payload.id){
                todo.isComplete = !todo.isComplete;
                }
                return todo;
            })
        },
        todoinputChange: (state, action)=>{
           state.map(todo =>{
                if(todo.id == action.payload.id){
                    todo.isEditing = true;
                }
                return todo;
            })
        },
        todoClearAll: (state, action)=>{
            return state.filter((todo) => todo.isComplete != true);
        },
        todocheckAll: (state, action)=>{
            state.map(todo =>{
                todo.isComplete = true;
                return todo;
            })
        },
        todoUncheckAll: (state, action)=>{
            state.map(todo =>{
                todo.isComplete = false;
                return todo;
            })
        },
        tododeleteEscapeItem: (state, action)=>{
           state.map(todo =>{
                if(todo.id == action.payload.id){
                    todo.isEditing = false;
                }
                return todo;
            })
        },
        updateTodo: (state, action)=>{
           state.map(todo =>{
                if(todo.id == action.payload.id){
                    if(action.payload.event == ''){
                        todo.isEditing = false;
                        return todo;
                    }
                    todo.title = action.payload.event;
                    todo.isEditing = false;
                }
                return todo;
            })

              // const item = todos.map(todo=>{

  //   if(todo.id == id){
  //     if(event.target.value == ''){
  //       todo.isEditing = false;
  //       return todo;
  //     }
  //     todo.title = event.target.value;
  //     todo.isEditing = false;
  //   }
  //   return todo;
  // })
  // setTodos(item);
        },
    }
});

export const {
    addTodo,
    deleteTask,
    checkTask,
    todoinputChange,
    updateTodo,
    tododeleteEscapeItem, 
    todoClearAll, 
    todocheckAll, 
    todoUncheckAll 
    } = tasksSlice.actions;

export default tasksSlice.reducer;