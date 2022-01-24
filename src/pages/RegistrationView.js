import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useAxiosFetch } from '../hooks/useAxiosFetch';

const RegistrationView = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { methodCall } = useAxiosFetch();
  let navigate = useNavigate();

  const onChangeNameHandler = ({ target: { value } }) => setName(value);
  const onChangeLastNameHandler = ({ target: { value } }) => setLastName(value);
  const onChangeEmailHandler = ({ target: { value } }) => setEmail(value);
  const onChangePasswordHandler = ({ target: { value } }) => setPassword(value);

  const postData = (e) => {
    e.preventDefault();
    const dataObject = {
      name: name,
      last_name: lastName,
      email: email,
      password: password,
    };
    methodCall('post', dataObject).then(() => {
      navigate('/user-list');
    });
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
              onChange={onChangePasswordHandler}
            />
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
