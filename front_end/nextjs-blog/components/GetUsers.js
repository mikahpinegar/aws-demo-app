// components/GetUsers.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUsers } from '../utils/response';

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await axios.get(apiUrl + '/api/users');
        getUsers().then((response) => {
            console.log(response)
            setUsers(Object.values(response))
        });
      } catch (error) {
        console.log(error.message)
        setMessage('Error fetching users.', error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Users</h2>
      {message && <p>{message}</p>}
      <ul>
        {users.map(user => (
          <li key={user.userId}>{user.name} - {user.email} - {user.role}</li>
        ))}
      </ul>
    </div>
  );
};

export default GetUsers;