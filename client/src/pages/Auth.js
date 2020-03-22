import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/useHttp';
import { useMessage } from '../hooks/useMessage';

function Auth() {
  const auth = useContext(AuthContext);
  const [form, setForm] = useState({ email: '', password: '' });
  const { isLoading, error, request, clearError } = useHttp();
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  useEffect(()=> {
    window.M.updateTextFields();
  }, [])

  function changeHandler(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  async function registerHandler() {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form });
      console.log(data);
    } catch (err) {}
  }

  async function loginHandler() {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form });
      auth.login(data.token, data.userId);
    } catch (err) {}
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Url shortener</h1>
        <div className="card blue darket-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>
            <div>
              <div className="input-field ">
                <input
                  placeholder="Enter Email"
                  id="email"
                  name="email"
                  type="email"
                  className="yellow-input"
                  onChange={changeHandler}
                  value={form.email}
                />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field ">
                <input
                  placeholder="Enter Password"
                  id="password"
                  name="password"
                  type="password"
                  className="yellow-input"
                  onChange={changeHandler}
                  value={form.password}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              disabled={isLoading}
              style={{ marginRight: 10 }}
              onClick={loginHandler}
            >
              Sign in
            </button>
            <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={isLoading}>
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
