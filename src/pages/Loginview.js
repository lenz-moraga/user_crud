import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAxiosFetch } from '../hooks/useAxiosFetch';

const Loginview = () => {
  const { methodCall } = useAxiosFetch();
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    userEmail: '',
    userPassword: '',
  });

  const inputOnChangeHandler = (evt) => {
    const inputHandler = {
      exampleInputEmail1: () =>
        setUserDetails({ ...userDetails, userEmail: evt.target.value }),
      exampleInputPassword1: () =>
        setUserDetails({ ...userDetails, userPassword: evt.target.value }),
    };

    return inputHandler[evt.target.id]();
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    const { userEmail, userPassword } = userDetails;

    if (userEmail && userPassword) {
      const { status } = await methodCall('login', userEmail, userPassword);

      if (status === 200) {
        return navigate('/user-list');
      }
    } else {
      alert('please, submit some valid information');
    }
  };

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
            onChange={inputOnChangeHandler}
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
            onChange={inputOnChangeHandler}
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
