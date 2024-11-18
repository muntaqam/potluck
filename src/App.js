// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import CreatePartyForm from './components/CreatePartyForm';
import JoinPartyForm from './components/JoinPartyForm';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/create-potluck" element={<CreatePartyForm />} />
        <Route path="/join-potluck" element={<JoinPartyForm />} />
      </Routes>
    </Router>
  );
};

export default App;
