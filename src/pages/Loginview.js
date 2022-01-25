import React, { useState, useEffect } from 'react';
import { useAxiosFetch } from '../hooks/useAxiosFetch';

const Loginview = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const { methodCall } = useAxiosFetch();

  const emailOnChangeHandler = (e) => setUserEmail(e.target.value);
  const password1OnChangeHandler = (e) => setUserPassword(e.target.value);

  const loginHandler = (e) => {
    e.preventDefault();
    if (userEmail && userPassword) {
      methodCall('login', userEmail, userPassword);
    } else {
      alert('please, submit some valid information');
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={emailOnChangeHandler}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password 1
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={password1OnChangeHandler}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={loginHandler}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default Loginview;
