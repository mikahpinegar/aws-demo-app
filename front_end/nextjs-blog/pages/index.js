// pages/users.js
import React from 'react';
import UserTabs from '../components/UserTabs';
import { Container, Title } from '../styles/commonStyles';

export default function Home() {
  return (
    <Container>
      <Title>Manage Users</Title>
      <UserTabs />
    </Container>
  );
}
