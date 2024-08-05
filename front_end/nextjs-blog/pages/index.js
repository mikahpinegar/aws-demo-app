// pages/users.js
import CreateUser from '../components/CreateUser';
import GetUsers from '../components/GetUsers';
import UpdateUser from '../components/UpdateUser';
import DeleteUser from '../components/DeleteUser';

export default function Home() {
  return (
    <div>
      <h1>Manage Users</h1>
      <CreateUser />
      <GetUsers />
      <UpdateUser />
      <DeleteUser />
    </div>
  );
}
