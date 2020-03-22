import React from 'react';
import { Link } from 'react-router-dom';

function LinksList(props) {
  const { links } = props;

  if (links.length === 0) {
    return <p className="center">Links are empty</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>From</th>
          <th>To</th>
          <th>Open</th>
        </tr>
      </thead>

      <tbody>
        {links.map((link, indx) => (
          <tr key={link._id}>
            <td>{indx + 1}</td>
            <td>{link.from}</td>
            <td>{link.to}</td>
            <td>
              <Link to={`/detail/${link._id}`}>Open</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LinksList;
