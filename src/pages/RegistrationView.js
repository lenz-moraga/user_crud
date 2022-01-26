import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAxiosFetch } from '../hooks/useAxiosFetch';
import usePasswordValidation from '../hooks/usePasswordValidation';

const RegistrationView = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userPassword, setUserPassword] = useState({
    firstPassword: '',
    secondPassword: '',
  });
  const { methodCall } = useAxiosFetch();
  const isValidPassword = usePasswordValidation({
    firstPassword: userPassword.firstPassword,
    secondPassword: userPassword.secondPassword,
  });
  let navigate = useNavigate();

  const onChangeNameHandler = ({ target: { value } }) => setName(value);
  const onChangeLastNameHandler = ({ target: { value } }) => setLastName(value);
  const onChangeEmailHandler = ({ target: { value } }) => setEmail(value);
  const onChangePasswordHandler = ({ target: { value } }) =>
    setUserPassword({ ...userPassword, firstPassword: value });

  const password2OnChangeHandler = ({ target: { value } }) =>
    setUserPassword({ ...userPassword, secondPassword: value });

  const postData = (e) => {
    e.preventDefault();
    const dataObject = {
      name: name,
      last_name: lastName,
      email: email,
      password: userPassword.secondPassword,
    };
    if (isValidPassword) {
      methodCall('post', dataObject).then(() => {
        navigate('/user-list');
      });
    } else {
      alert('invalid password!');
    }
  };

  return (
    <>
      <div className="container p-3">
        <h1>Login POC</h1>
        <form>
          <div className="mb-3 row">
            <div className="col-6">
              <label htmlFor="exampleInputName1" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputName1"
                onChange={onChangeNameHandler}
              />
            </div>

            <div className="col-6">
              <label htmlFor="exampleInputLast_Name1" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="exampleInputLast_Name1"
                onChange={onChangeLastNameHandler}
              />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={onChangeEmailHandler}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              aria-describedby="password1Help"
              onChange={onChangePasswordHandler}
            />
            <div id="password1Help" className="form-text">
              Your password must have one lowerCase, one uppercase character, one number, one special character and be more than 8 characters.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword2" className="form-label">
              Password 2
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              aria-describedby="password2Help"
              onChange={password2OnChangeHandler}
            />
            <div id="password1Help" className="form-text">
              Your passwords must be the same.
            </div>
          </div>
          <div className="d-flex justify-content-between">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={postData}
            >
              Submit
            </button>
            <Link className="btn btn-primary" to="/user-list">
              View UserList
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegistrationView;
