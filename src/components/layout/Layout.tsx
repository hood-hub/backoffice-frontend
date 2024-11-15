import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';

const Layout: React.FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '272px', flex: 1 }}> 
        <Navbar />
        <main style={{ paddingTop: '100px', paddingLeft: '32px', paddingRight: '16px' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
