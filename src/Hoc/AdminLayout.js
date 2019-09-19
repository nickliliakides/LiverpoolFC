import React from 'react';
import AdminNav from '../components/admin/navigation/AdminNav';

const AdminLayout = props => {
  const styles = {
    position: 'fixed',
    background: '#b5151c'
  };

  return (
    <div className="admin_container">
      <div className="admin_left_nav" style={styles}>
        <AdminNav />
      </div>
      <div className="admin_right">{props.children}</div>
    </div>
  );
};

export default AdminLayout;
