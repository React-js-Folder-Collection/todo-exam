import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderOpen} from '@fortawesome/free-solid-svg-icons'
import { useDispatch,useSelector } from "react-redux";
import {todoinputChange , checkTask ,deleteTask, updateTodo, tododeleteEscapeItem} from "../redux/tasksSlice";

export default function TodoList(props) {
const dispatch = useDispatch();
const todos = useSelector((state)=>{
  return state.todos;
});
// const todos = localStorage.getItem('todos');
// useEffect(() => {
//   localStorage.setItem('todos', JSON.stringify(todos));
//   }, ['todos', todos]);

function checkItem(id){
  todos.map(todo=>{
    if(todo.id == id){
      dispatch(
        checkTask({
          id: todo.id
        })
      )
    }
    if(todo.isComplete === true){
      props.setCheck(false);
    }else{
      props.setCheck(true);
    }  
})
}
function deleteItem(event,id){
  event.preventDefault();
  dispatch(
    deleteTask({
      id: id
    })
  )
}
function inputChange(id){
  dispatch(
    todoinputChange({
      id: id
    })
  )
}
function updateItem(event, id){
  event.preventDefault();
  dispatch(
    updateTodo({
      id: id,
      event : event.target.value
    })
  )
}
function deleteEscapeItem(event, id){
  event.preventDefault();
  dispatch(
    tododeleteEscapeItem({
      id: id,
    })
  )
}
return (
  todos.filter(todo => todo).length>0 ?(
  <ul className="list-group my-3">
      {
      props.currentPosts.map((todo,index)=>(
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
