import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAxiosFetch } from '../hooks/useAxiosFetch';

const UserListView = () => {
  const [APIData, setAPIData] = useState([]);
  const { response, error, loading, methodCall } = useAxiosFetch();

  useEffect(() => {
    try {
      if (response === null) {
        methodCall('get');
      } else if (response !== null) {
        setAPIData(response);
      }
    } catch (error) {
      console.log('error', error);
    }
  }, [response, methodCall, APIData]);

  const onUserStatusChangelHandler = (id) => (e) => {
    const {
      target: { checked },
    } = e;

    const dataObject = {
      blocked: checked,
    };

    methodCall('update', id, dataObject).then(() => methodCall('get'));
  };

  const onUsertoDeleteClickHandler = (id) => () => {
    methodCall('delete', id).then(() => methodCall('get'));
  };

  const renderUserList = () => {
    return APIData?.map((user) => {
      return (
        <tr key={user.id}>
          <th scope="row">{user.id}</th>
          <td>{user.name}</td>
          <td>{user.last_name}</td>
          <td>{user.email}</td>
          <td>{user.password}</td>
          <td>
            <input
              type="checkbox"
              checked={user.blocked}
              onChange={onUserStatusChangelHandler(user.id)}
            />
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger"
              onClick={onUsertoDeleteClickHandler(user.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  const renderContentSection = () => {
    if (loading) {
      return (
        <>
          <h1>Loading</h1>
        </>
      );
    } else if (!loading) {
      return (
        <div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">email</th>
                <th scope="col">password</th>
                <th scope="col">blocked</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>{renderUserList()}</tbody>
          </table>
        </div>
      );
    } else {
      return <>{error}</>;
    }
  };

  return (
    <>
      {renderContentSection()}
      <Link className="btn btn-secondary" to="/add-user">
        Back
      </Link>
    </>
  );
};

export default UserListView;
