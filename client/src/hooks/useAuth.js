import { useCallback, useState, useEffect } from 'react';

const storageKey = 'user-data';

export function useAuth() {
  const [token, setToken] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);
    localStorage.setItem(storageKey, JSON.stringify({ userId: id, token: jwtToken }));
  }, []);
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageKey);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageKey));
    if (data && data.token) {
      login(data.token, data.userId);
    }
    setIsReady(true);
  }, [login]);

  return { login, logout, token, userId, isReady };
}
