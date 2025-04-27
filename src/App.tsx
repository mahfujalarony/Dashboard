import React, { useState } from 'react';
import Dashboard from './Components/Deshboard';
import Login from './Components/Login';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div>
      {isAuthenticated ? (
        <Dashboard setIsAuthenticated={setIsAuthenticated}/>
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} />
      )}
    </div>
  );
};

export default App;
