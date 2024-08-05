import React, { useState } from 'react';
import { createUser } from '../utils/response';

const CreateUser = () => {
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      createUser({ userId, name, email, role }).then((response) => {
        console.log(response)
        setResponse(response?.message);
      })
      
    } catch (error) {
      setResponse({ error: 'An error occurred' });
    }
  };

  return (
    <div>
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            User ID:
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Role:
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Create User</button>
      </form>
      {response && (
        <div>
          <h2>Response</h2>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default CreateUser;