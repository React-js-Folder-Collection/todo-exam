import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen} from '@fortawesome/free-solid-svg-icons'
import { TodoContext} from './TodoContext';

export default function TodoList() {
const {setCheck,todos,setTodos,currentPosts} = useContext(TodoContext);

function checkItem(id){
  const checkItem = todos.map(todo=>{
    if(todo.id == id){
      todo.isComplete = !todo.isComplete;
    }
    if(todo.isComplete == true){
      setCheck(false);
    }else{
      setCheck(true);
    }
    return todo;
  })
  setTodos(checkItem);
}
function inputChange(id){
  const item = todos.map(todo=>{
    if(todo.id == id){
      todo.isEditing = true;
    }
    return todo;
  })
  setTodos(item);
}
function updateItem(event, id){
  event.preventDefault();
  const item = todos.map(todo=>{

    if(todo.id == id){
      if(event.target.value == ''){
        todo.isEditing = false;
        return todo;
      }
      todo.title = event.target.value;
      todo.isEditing = false;
    }
    return todo;
  })
  setTodos(item);
}
function deleteEscapeItem(event, id){
  event.preventDefault();
  const item = todos.map(todo=>{
    if(todo.id == id){
      todo.isEditing = false;
    }
    return todo;
  })
  setTodos(item);
}
function deleteItem(event,id){
  event.preventDefault();
  const deleteItem = [...todos].filter(todo => todo.id != id);
  setTodos(deleteItem);
}
return (
  todos.filter(todo => todo).length>0 ?(
  <ul className="list-group my-3">     
      {
      currentPosts.reverse().map((todo,index)=>(
        <li key={index} className={`${todo.isComplete ? 'opacity-50 list-group-item' : 'list-group-item' }`}>
          <div>
            <input className='form-check-input tw-mr-2'
                  type="checkbox"
                  onChange={() => checkItem(todo.id)}
                  checked={todo.isComplete ? true : false}
                />
            {!todo.isEditing ? (
                        <span onDoubleClick={() => inputChange(todo.id)}
                        className={`${
                          todo.isComplete ? 'text-decoration-line-through' : ''
                        }`}
                        >{todo.title}</span>
                    ) : (
                        <input
                        type="text" className='form-control tw-inline-block tw-w-[600px]'
                        onBlur={event => updateItem(event,todo.id)}
                        onKeyDown={event => 
                          {
                            if(event.key == "Enter"){
                              updateItem(event,todo.id)
                            }else if(event.key == "Escape"){
                              deleteEscapeItem(event, todo.id)
                            }
                          }
                        }
                        defaultValue={todo.title}
                        />
                    )
            }
            <button className='float-end border-0 bg-white' onClick={event => {if(window.confirm('Are you sure to delete this todo item?')){deleteItem(event,todo.id)}}}>X</button>
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
