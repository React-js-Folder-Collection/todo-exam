import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen} from '@fortawesome/free-solid-svg-icons'

export default function TodoList(props) {
  return (
    props.todos.filter(todo => todo).length>0 ?(
    <ul className="list-group my-3">     
        {
        props.todos.reverse().map((todo,index)=>(
          <li key={index} className={`${todo.isComplete ? 'opacity-50 list-group-item' : 'list-group-item' }`}>
            <div>
              <input className='form-check-input tw-mr-2'
                    type="checkbox"
                    onChange={() => props.checkItem(todo.id)}
                    checked={todo.isComplete ? true : false}
                  />
              {!todo.isEditing ? (
                          <span onDoubleClick={() => props.inputChange(todo.id)}
                          className={`${
                            todo.isComplete ? 'text-decoration-line-through' : ''
                          }`}
                          >{todo.title}</span>
                      ) : (
                          <input
                          type="text" className='form-control tw-inline-block tw-w-[600px]'
                          onBlur={event => props.updateItem(event,todo.id)}
                          onKeyDown={event => 
                            {
                              if(event.key == "Enter"){
                                props.updateItem(event,todo.id)
                              }else if(event.key == "Escape"){
                                props.deleteEscapeItem(event, todo.id)
                              }
                            }
                          }
                          defaultValue={todo.title}
                          />
                      )
              }
              <button className='float-end border-0 bg-white' onClick={event => {if(window.confirm('Are you sure to delete this todo item?')){props.deleteItem(event,todo.id)}}}>X</button>
            </div>
          </li>
        ))}
    </ul>) : (
      <div className='text-center p-4'>
        <FontAwesomeIcon className='text-muted mb-4 tw-text-8xl' icon={faFolderOpen} />
        <h5 className='text-muted'>Nothing To Show</h5>
      </div>
    )
  )
}
