import { useState } from 'react';
import { updateUser } from '../utils/response';
import { Container, Title, Form, FormGroup, Label, Input, Button, Message } from '../styles/commonStyles';

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
      updateUser(userId, user).then((response) => setMessage('User updated successfully!'));
    } catch (error) {
      setMessage('Error updating user.');
    }
  };

  return (
    <Container>
      <Title>Update User</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>User ID:</Label>
          <Input
            type="text"
            placeholder="User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Name:</Label>
          <Input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Role:</Label>
          <Input
            type="text"
            name="role"
            placeholder="Role"
            value={user.role}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Button type="submit">Update</Button>
      </Form>
      {message && <Message error={message.includes('Error')}>{message}</Message>}
    </Container>
  );
};

export default UpdateUser;