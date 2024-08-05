// components/UserTabs.js
import React from 'react';
import {
  Tab, Tabs, TabList, TabPanel,
} from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CreateUser from './CreateUser';
import GetUsers from './GetUsers';
import UpdateUser from './UpdateUser';
import DeleteUser from './DeleteUser';

const UserTabs = () => (
  <Tabs>
    <TabList>
      <Tab>Create User</Tab>
      <Tab>View Users</Tab>
      <Tab>Update User</Tab>
      <Tab>Delete User</Tab>
    </TabList>

    <TabPanel>
      <CreateUser />
    </TabPanel>
    <TabPanel>
      <GetUsers />
    </TabPanel>
    <TabPanel>
      <UpdateUser />
    </TabPanel>
    <TabPanel>
      <DeleteUser />
    </TabPanel>
  </Tabs>
);

export default UserTabs;
