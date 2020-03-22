import React, { useContext, useState, useCallback, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/useHttp';
import Loader from '../components/Loader';
import LinksList from '../components/LinksList';

function Links() {
  const [links, setLinks] = useState([]);
  const { request, isLoading } = useHttp();
  const auth = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const data = await request(`/api/link`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      });
      setLinks(data);
    } catch (err) {}
  }, [auth.token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (isLoading) {
    return <Loader />;
  }

  return <React.Fragment>{!isLoading && <LinksList links={links} />}</React.Fragment>;
}

export default Links;
