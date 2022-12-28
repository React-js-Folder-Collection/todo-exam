import React from 'react'

export default function TodoRemaining(props) {
  return (
    <div className='text-center'>
    <hr />
    {props.todos.filter(todo => todo).length>0 ?(
    <span className='text-muted'>Remaining {props.todos.filter(todo => !todo.isComplete).length} items...</span>) : ''
    }
    </div>
  )
}
