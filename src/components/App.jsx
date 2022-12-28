import {useEffect, useRef, useState } from 'react';
import '../App.css';
import TodoList from './TodoList';
import CheckUncheckAll from './CheckUncheckAll';
import ClearAll from './ClearAll';
import TodoRemaining from './TodoRemaining';
import Pagination from './Pagination';
import TodoForm from './TodoForm';
import {TodoContext} from './TodoContext';
import { useLocalStorage } from './useLocalStorage';
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
useEffect(() => {
  focus.current.focus();
}, []);
  return (
    <TodoContext.Provider
    value={{ 
      input,
      setInput,
      check,
      setCheck,
      todos,
      setTodos,
      focus,
      currentPage, 
      paginate,
      postsPerPage,
      currentPosts,
     }}    
    >
      <div className='container w-50 bg-light p-3 mt-5 border rounded'>
        <div>
        <h1 className='mt-2 text-center tw-text-5xl'>
          Todo List
        </h1>
        <TodoForm/>
        <TodoList/>
        <Pagination/>
        <br />
        <TodoRemaining/>
        <div className='mt-3'>
        <CheckUncheckAll/>
        <ClearAll/>
        </div>
        </div>
      </div>
    </TodoContext.Provider>
  );
}

export default App;
