import React, { useContext } from 'react';
import { TodoContext } from './TodoContext'
export default function ClearAll() {
  const {todos,setTodos} = useContext(TodoContext);  
function clearAll(){
  const clearAll = [...todos].filter(todo => todo.isComplete != true);
  setTodos(clearAll);
}
  return (
    <>
        {todos.filter(todo => todo.isComplete).length > 0 ? 
        <button type="button" className="btn btn-outline-danger" onClick={()=>clearAll()}>Clear Selected All</button> : ''}
    </>
  )
}
