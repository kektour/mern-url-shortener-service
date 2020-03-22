import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import { useRoutes } from './routes';
import Loader from './components/Loader';

function App() {
  const { token, userId, login, logout, isReady } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!isReady) {
    return <Loader />;
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        login,
        logout,
        isAuthenticated
      }}
    >
      <Router>
        {isAuthenticated && <Navbar />}
        <div className="container">{routes}</div>;
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
