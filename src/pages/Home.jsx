import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to gray-100 text-center">
      <div className='max-w-2xl p-8 bg-white shadow-2xl rounded-2xl'>
        <h1 className='text-4xl font-extrabold text-gray-900 mb-4'>
          💈 Barbershop VT
        </h1>
        <p></p>
      </div>
    </div>
  );
}

export default Home