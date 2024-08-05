// components/GetUsers.js
import { useEffect, useState } from 'react';
import { getUsers } from '../utils/response';
import { Container, Title, Message, List, ListItem } from '../styles/commonStyles';

const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        getUsers().then((response) => {
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
    <Container>
      <Title>Users</Title>
      {message && <Message error>{message}</Message>}
      <List>
        {users.map(user => (
          <ListItem key={user.userId}>{user.name} - {user.email} - {user.role}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default GetUsers;