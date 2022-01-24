import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Loginview';
import RegistrationForm from './pages/RegistrationView';
import UserList from './pages/UserListView';

function App() {
  return (
    <div className="container p-3">
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/add-user" exact element={<RegistrationForm />} />
        <Route path="/user-list" exact element={<UserList />} />
      </Routes>
    </div>
  );
}

export default App;
