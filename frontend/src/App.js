import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import Login from './Login';
import Signup from './Signup';
import Header from './Header';
import Medicines from './Medicines';
import Test from './Test';
import Details from './Details';
import Cart from './Cart';
import Cartdetails from './Cartdetails';
import Consult from './Consult';
import Cancer from './Cancer';
import Lab from './Lab';
import AboutUs from './AboutUs';
import SearchResults from './SearchResults';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} /> {/* Default route */}
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/medicines" element={<Medicines />} />
          <Route path="/test" element={<Test />} />
          <Route path="/details" element={<Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/cartdetails" element={<Cartdetails />} />
          <Route path="/consult" element={<Consult />} />
          <Route path="/cancer" element={<Cancer />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/aboutus" element={<AboutUs />} />
         <Route path="/search-results" element={<SearchResults />} />
          <Route path="*" element={<Navigate to="/" />} /> {/* Catch-all redirect */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;