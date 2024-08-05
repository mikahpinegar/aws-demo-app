import React, { useState } from 'react';
import {
  Container,
  Title,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  ResponseContainer,
  ResponseTitle,
  Pre,
} from '../styles/commonStyles';
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
      createUser({
        userId, name, email, role,
      }).then((response) => {
        console.log(response);
        setResponse(response?.message);
      });
    } catch (error) {
      setResponse({ error: 'An error occurred' });
    }
  };

  return (
    <Container>
      <Title>Create User</Title>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>User ID:</Label>
          <Input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Name:</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Email:</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label>Role:</Label>
          <Input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit">Create User</Button>
      </Form>
      {response && (
        <ResponseContainer>
          <ResponseTitle>Response</ResponseTitle>
          <Pre>{JSON.stringify(response, null, 2)}</Pre>
        </ResponseContainer>
      )}
    </Container>
  );
};

export default CreateUser;
