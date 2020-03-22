import React, { useEffect, useState, useContext } from 'react';
import { useHttp } from '../hooks/useHttp';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

function CreateLink() {
  const [link, setLink] = useState('');
  const auth = useContext(AuthContext);
  const history = useHistory();
  const { request } = useHttp();

  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  async function pressHandler(e) {
    if (e.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          { from: link },
          { Authorization: `Bearer ${auth.token}` }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (err) {}
    }
  }

  return (
    <div className="row">
      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field ">
          <input
            placeholder="Enter Link"
            id="link"
            type="text"
            onChange={e => {
              setLink(e.target.value);
            }}
            value={link}
            onKeyPress={pressHandler}
          />
          <label htmlFor="link">Link</label>
        </div>
      </div>
    </div>
  );
}

export default CreateLink;
