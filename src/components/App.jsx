import { useEffect, useRef, useState } from 'react';
import '../App.css';
import uuid from 'react-uuid';
import TodoList from './TodoList';
import CheckUncheckAll from './CheckUncheckAll';
import ClearAll from './ClearAll';
import TodoRemaining from './TodoRemaining';
import Pagination from './Pagination';
function App() {
const [input, setInput] = useState("");
const [check, setCheck] = useState(true);
const [todos, setTodos] = useLocalStorage('todos',[]);
const focus = useRef(null);
const [currentPage, paginate] = useState(1);
const postsPerPage = 5;
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost);
const nextPage = () => {
    paginate(currentPage + 1 )
};
const prevPage = () => paginate(currentPage - 1 );
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
  ].reverse())
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
useEffect(() => {
  focus.current.focus();
}, []);
  return (
    <div className='container w-50 bg-light p-3 mt-5 border rounded'>
      <div>
      <h1 className='mt-2 text-center tw-text-5xl'>
        Todo List
      </h1>
      <form action="#" className="mt-3" onSubmit={HandleSubmit}>
          <input className="form-control" type="text" ref={focus}
          value={input} placeholder="What You Need To Plan Todo?"
          onChange = {(e)=> setInput(e.target.value)}
          />
      </form>
      <TodoList
        todos={currentPosts}
        checkItem={checkItem}
        inputChange={inputChange}
        updateItem={updateItem}
        deleteEscapeItem={deleteEscapeItem}
        deleteItem={deleteItem}
      />
      <Pagination todos={todos} currentPosts={currentPosts}  postsPerPage={postsPerPage} totalPosts={todos.length} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
      <br />
      <TodoRemaining todos={todos}/>
      <div className='mt-3'>
      <CheckUncheckAll
      todos={todos}
      check={check}
      checkAll={checkAll} 
      uncheckAll={uncheckAll}
      />
      <ClearAll todos={todos} clearAll={clearAll}/>
      </div>
      </div>
    </div>
  );
}

export default App;
