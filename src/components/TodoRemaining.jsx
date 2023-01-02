import React from 'react';
import {useSelector } from "react-redux";
export default function TodoRemaining() {
  const todos = useSelector((state)=>{
    return state.todos;
  });
  return (
    <div className='text-center'>
    <hr />
    {todos.filter(todo => todo).length>0 ?(
    <span className='text-muted'>Remaining {todos.filter(todo => !todo.isComplete).length} items...</span>) : ''
    }
    </div>
  )
}
