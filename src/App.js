// App.js
import React, { useEffect } from 'react';
import LineGraph from './LineGraph';
import { getData } from './data';

const App = () => {
  useEffect(() => {
    getData()
  },[])
  return (
    <div>
      <h1>Chart in PDF</h1>
      <LineGraph />
    
    </div>
  );
};

export default App;
