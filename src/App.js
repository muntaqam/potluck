// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeComponent from './components/HomeComponent';
import CreatePartyForm from './components/CreatePotluckForm';
import JoinPartyForm from './components/JoinPartyForm';
import PartyDetails from './components/PartyDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />} />
        <Route path="/create-potluck" element={<CreatePartyForm />} />
        <Route path="/join-potluck" element={<JoinPartyForm />} />
        <Route path="/party/:partyCode" element={<PartyDetails />} />

      </Routes>
    </Router>
  );
};

export default App;
