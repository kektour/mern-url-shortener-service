import React from 'react';

function LinkCard(props) {
  const { link } = props;
  
  return (
    <React.Fragment>
      <h2>Link</h2>
      <p>
        Short Link:{' '}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.to}
        </a>
      </p>
      <p>
        From Link:{' '}
        <a href={link.to} target="_blank" rel="noopener noreferrer">
          {link.from}
        </a>
      </p>
      <p>Click Count: <strong>{link.clicks}</strong></p>
      <p>
        Creation Date: <strong>{new Date(link.createdAt).toLocaleDateString()}</strong>
      </p>
    </React.Fragment>
  );
}

export default LinkCard;
