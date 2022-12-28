import React from 'react'
export default function ClearAll(props) {
  return (
    <>
        {props.todos.filter(todo => todo.isComplete).length > 0 ? 
        <button type="button" className="btn btn-outline-danger" onClick={()=>props.clearAll()}>Clear Selected All</button> : ''}
    </>
  )
}
