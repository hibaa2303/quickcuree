import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
          <Route path="/Homepage" element={<Homepage />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Medicines" element={<Medicines />} />
          <Route path="/Test" element={<Test />} />
          <Route path="/Details" element={<Details />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Cartdetails" element={<Cartdetails />} />
          <Route path="/Consult" element={<Consult />} />
          <Route path="/Cancer" element={<Cancer />} />
          <Route path="/Lab" element={<Lab />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/search-results" element={<SearchResults />} />
          

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
