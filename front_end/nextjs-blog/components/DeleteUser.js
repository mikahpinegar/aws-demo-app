// components/DeleteUser.js
import { useState } from 'react';
import { deleteUser } from '../utils/response';

const DeleteUser = () => {
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      deleteUser(userId).then((response) => console.log(response));
      setMessage('User deleted successfully!');
    } catch (error) {
      setMessage('Error deleting user.');
    }
  };

  return (
    <div>
      <h2>Delete User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
        <button type="submit">Delete</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default DeleteUser;