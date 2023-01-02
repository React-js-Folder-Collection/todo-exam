import TodoForm from "./TodoForm";
import TodoList from './TodoList';
import TodoRemaining from './TodoRemaining';
import CheckUncheckAll from './CheckUncheckAll';
import ClearAll from './ClearAll';
import Pagination from './Pagination';
import '../App.css';
import {useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import { useLocalStorage } from './useLocalStorage';
function App() {
const todos = useSelector((state)=>{
  return state.todos;
});
// useEffect(() => {
//   localStorage.setItem('todos', JSON.stringify(todos));
//   }, ['todos', todos]);
const [currentPage, paginate] = useState(1);
const postsPerPage = 5;
const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost);
const [check, setCheck] = useState(true);
// const [todos, setTodos] = useLocalStorage('todos',[]);
  return (
     <div className='container w-50 bg-light p-3 mt-5 border rounded'>
        <div>
          <h1 className='mt-2 text-center tw-text-5xl'>
            Todo List
          </h1>
          <TodoForm/>
          <TodoList currentPosts={currentPosts} check={check} setCheck={setCheck}/>
          <Pagination currentPage={currentPage} paginate={paginate} postsPerPage={postsPerPage}/>
          <br />
          <TodoRemaining/>
          <div className='mt-3'>
            <CheckUncheckAll check={check} setCheck={setCheck}/>
            <ClearAll/>
          </div>
        </div>
      </div>
  )
}

export default App;
