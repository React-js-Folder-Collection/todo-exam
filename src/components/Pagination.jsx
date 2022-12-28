import React, { useContext } from 'react'
import { TodoContext } from './TodoContext';
export default function Pagination() {
const {todos,currentPage,paginate,postsPerPage} = useContext(TodoContext);
const pageNumbers = [];
const nextPage = () => {paginate(currentPage + 1 )};
const prevPage = () => paginate(currentPage - 1 );
for (let i = 1; i <= Math.ceil(todos.length / postsPerPage); i++) {
    pageNumbers.push(i);
}
  return (
    <>
        {todos.length > 5 ? (
        <nav>
            <ul className="pagination">
                <li className="page-item disabled">
                    <a className="page-link" href="#" aria-label="Previous" onClick={() => prevPage()}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pageNumbers.map(num => (
                    <li className="page-item" key={num}>
                        <a onClick={() => paginate(num)} href="#" className="page-link">{num}</a>
                    </li>
                ))}
                <li className="page-item disabled">
                    <a className="page-link" href="#" aria-label="Next" onClick={() => nextPage()}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>) :''
        }
    </>
  )
}
