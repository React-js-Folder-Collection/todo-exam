import React, { useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import {todocheckAll, todoUncheckAll} from "../redux/tasksSlice";
export default function CheckUncheckAll(props) {
// const [check, setCheck] = useState(true);
const dispatch = useDispatch();
const todos = useSelector((state)=>{
  return state.todos;
});
function checkAll(){
  dispatch(
    todocheckAll()
  )
  props.setCheck(false);
}
function uncheckAll(){
  dispatch(
    todoUncheckAll()
  )
  props.setCheck(true);
}
  return (
    <>
    {todos.length > 0 ? (
    <button  type="button" className="btn btn-outline-primary tw-mr-5" onClick={props.check ? checkAll : uncheckAll }>
      {props.check ? 'check All' : 'UnCheck All'}
    </button>) : ''
    }
    </>
  )
}
