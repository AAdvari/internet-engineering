import React from 'react';
import Navbar from "./components/header/Navbar";
import prods from './data/data'
import AppRoutes from "./components/AppRoutes/AppRoutes";

function App() {
    document.body.style.backgroundColor ='#F5F5F5';
  return (
    <div  className="App">
            <Navbar />
            <AppRoutes productItems={prods.data}/>
    </div>
  );
}


export default App;
