import React, { useContext } from 'react';
import { TodoContext } from './TodoContext';
export default function CheckUncheckAll() {
  const {todos,setTodos,check,setCheck} = useContext(TodoContext);  
function checkAll(){
  const checkAll = todos.map(todo=>{
      todo.isComplete = true;
      return todo;
    })
  setTodos(checkAll);
  setCheck(false);
}
function uncheckAll(){
  const checkAll = todos.map(todo=>{
    todo.isComplete = false;
    return todo;
  })
setTodos(checkAll);
setCheck(true);
}
  return (
    <>
    {todos.length > 0 ? (
    <button  type="button" className="btn btn-outline-primary tw-mr-5" onClick={check ? checkAll : uncheckAll }>
      {check ? 'check All' : 'UnCheck All'}
    </button>) : ''
    }
    </>
  )
}
