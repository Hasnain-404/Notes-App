import React from 'react';
import Layout from '../components/Layout';
import axios from 'axios';

// Enable cookies (like Clerk session) in every request
axios.defaults.withCredentials = true;

const App = () => {
  return (
    <>
      <div className='bg-black'>
        <Layout />
      </div>
    </>
  );
};

export default App;
