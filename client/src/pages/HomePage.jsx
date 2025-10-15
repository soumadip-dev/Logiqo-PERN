import React from 'react';
import useAuthStore from '../store/useAuthStore';

const HomePage = () => {
  const { authUser } = useAuthStore();
  return (
    <div>
      {authUser && (
        <div>
          <h1>Welcome {authUser.name}</h1>
        </div>
      )}
    </div>
  );
};

export default HomePage;
