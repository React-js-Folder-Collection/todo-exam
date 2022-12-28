import React, {useContext } from 'react';
import uuid from 'react-uuid';
import {TodoContext} from './TodoContext';

export default function TodoForm() {
const {input,setInput,todos,setTodos,focus} = useContext(TodoContext);  
function HandleSubmit(event){
    event.preventDefault();
    if (input.length === 0) {
      return;
    }
    setTodos([
      ...todos,
      {
        id: uuid(),
        title: input,
        isComplete : false,
        isEditing : false,
      }
    ].reverse())
    setInput("");
}
  return (
    <form action="#" className="mt-3" onSubmit={HandleSubmit}>
        <input className="form-control" type="text" ref={focus}
        value={input} placeholder="What You Need To Plan Todo?"
        onChange = {(e)=> setInput(e.target.value)}
        />
    </form>
  )
}
