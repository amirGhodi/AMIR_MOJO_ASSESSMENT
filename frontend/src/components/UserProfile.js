import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <img src={user.picture.data.url} alt={user.name} />
      <h1>{user.name}</h1>
    </div>
  );
};

export default UserProfile;
