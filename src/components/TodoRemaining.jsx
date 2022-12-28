import React, { useContext } from 'react';
import { TodoContext } from './TodoContext'
export default function TodoRemaining() {
  const {todos} = useContext(TodoContext);
  return (
    <div className='text-center'>
    <hr />
    {todos.filter(todo => todo).length>0 ?(
    <span className='text-muted'>Remaining {todos.filter(todo => !todo.isComplete).length} items...</span>) : ''
    }
    </div>
  )
}
