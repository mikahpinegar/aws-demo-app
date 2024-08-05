// components/UpdateUser.js
import { useState } from 'react';
import { updateUser } from '../utils/response';

const UpdateUser = () => {
  const [userId, setUserId] = useState('');
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      updateUser(userId, user).then((response) => setMessage('User updated successfully!'))
    } catch (error) {
      setMessage('Error updating user.');
    }
  };

  return (
    <div>
      <h2>Update User</h2>
      <input type="text" placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={user.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={user.email} onChange={handleChange} />
        <input type="text" name="role" placeholder="Role" value={user.role} onChange={handleChange} />
        <button type="submit">Update</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default UpdateUser;