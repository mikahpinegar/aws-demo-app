import { useState } from 'react';
import { Container, Title, Form, Input, Button, Message } from '../styles/commonStyles';
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
    <Container>
      <Title>Delete User</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <Button type="submit">Delete</Button>
      </Form>
      {message && <Message error={message.includes('Error')}>{message}</Message>}
    </Container>
  );
};

export default DeleteUser;