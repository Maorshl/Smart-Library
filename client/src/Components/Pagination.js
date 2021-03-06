import React from "react";

function Pagination({ postsPerPage, totalPosts, paginate, fromPage }) {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul className="nav-link">
        {pageNumbers.map(number => (
          <li key={number} className="page-list">
            <a onClick={() => paginate(number)} href={`/${fromPage}/#!`}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
