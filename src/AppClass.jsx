import { useEffect, useState } from 'react';
import './App.css';
import uuid from 'react-uuid';
function App() {
const [input, setInput] = useState("");
const [check, setCheck] = useState(true);
const [todos, setTodos] = useLocalStorage('todos',[]);
function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
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
  ])
  setInput("");
}
function deleteItem(event,id){
  event.preventDefault();
  const deleteItem = [...todos].filter(todo => todo.id != id);
  setTodos(deleteItem);
}
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
function clearAll(){
  const clearAll = [...todos].filter(todo => todo.isComplete != true);
  setTodos(clearAll);
}
  return (
    <>
      <form action="#" onSubmit={HandleSubmit}>
        <input type="text"
        value={input}
        onChange = {(e)=> setInput(e.target.value)}
        />
       </form>
     
       <ul>
        {todos.map((todo,index)=>(
          <li key={index}>
              <input
                    type="checkbox"
                    onClick={() => checkItem(todo.id)}
                    checked={todo.isComplete ? true : false}
                  />
              {!todo.isEditing ? (
                          <span onDoubleClick={() => inputChange(todo.id)}
                          className={`${
                            todo.isComplete ? 'line-through' : ''
                          }`}
                          >{todo.title}</span>
                      ) : (
                          <input 
                          type="text"
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
            <button onClick={event => deleteItem(event,todo.id)}>delete</button>
          </li>
        ))}
       </ul>
       <button onClick={check ? checkAll : uncheckAll }>
        {check ? 'check All' : 'UnCheck All'}
       </button>
       <button onClick={()=>clearAll()}>Clear Selected All</button>
    </>
  );
}

export default App;
