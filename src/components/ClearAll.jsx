import React from 'react';
import { useDispatch,useSelector } from "react-redux";
import {todoClearAll} from "../redux/tasksSlice";
export default function ClearAll() {  
const dispatch = useDispatch();
const todos = useSelector((state)=>{
  return state.todos;
});
function clearAll(){
  dispatch(
    todoClearAll()
  )
}
  return (
    <>
        {todos.filter(todo => todo.isComplete).length > 0 ? 
        <button type="button" className="btn btn-outline-danger" onClick={()=>clearAll()}>Clear Selected All</button> : ''}
    </>
  )
}
