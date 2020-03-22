import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LinkCard from '../components/LinkCard';
import Loader from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/useHttp';

function Detail() {
  const auth = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const { request, isLoading } = useHttp();
  const linkId = useParams().id;
  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/link/${linkId}`, 'GET', null, {
        Authorization: `Bearer ${auth.token}`
      });
      setLink(data);
    } catch (err) {}
  }, [auth.token, linkId, request]);

  useEffect(() => {
    getLink();
  }, [getLink]);

  if (isLoading) {
    return <Loader />;
  }

  return <React.Fragment>{!isLoading && link && <LinkCard link={link} />}</React.Fragment>;
}

export default Detail;
