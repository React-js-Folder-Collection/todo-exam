import React from 'react'

export default function Pagination(props) {
const pageNumbers = [];
for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
    pageNumbers.push(i);
}
  return (
    <>
        {props.todos.length > 5 ? (
        <nav>
            <ul className="pagination">
                <li className="page-item disabled">
                    <a className="page-link" href="#" aria-label="Previous" onClick={() => props.prevPage()}>
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
                {pageNumbers.map(num => (
                    <li className="page-item" key={num}>
                        <a onClick={() => props.paginate(num)} href="#" className="page-link">{num}</a>
                    </li>
                ))}
                <li className="page-item disabled">
                    <a className="page-link" href="#" aria-label="Next" onClick={() => props.nextPage()}>
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
            </ul>
        </nav>) :''
        }
    </>
  )
}
