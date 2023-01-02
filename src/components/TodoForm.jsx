import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/tasksSlice";
export default function TodoForm() {
const dispatch = useDispatch();
const [input, setInput] = useState("");
function HandleSubmit(event){
  event.preventDefault();
  if (input.length === 0) {
    return;
  }
  dispatch(
    addTodo({
        todo: input
    })
  );
  setInput("");
} 
  return (
    <form action="#" className="mt-3" onSubmit={HandleSubmit}>
        <input className="form-control" type="text"
        value={input} placeholder="What You Need To Plan Todo?"
        onChange = {(e)=> setInput(e.target.value)}
        />
    </form>
  )
}
