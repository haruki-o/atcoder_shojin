import React from 'react';
import '../css/App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Home } from "./Home"
import { NavigationBar } from "./NavigationBar"
import { ContestIndex} from './ContestIndex'
import { HeldContest } from './HeldContest';
import { Create } from "./Create"
import { ContestPage } from './ContestPage';
import { ContestInfo } from './ContestInfo';


const App: React.FC = () => {  
  console.log("render <App>")

  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index" element={<ContestIndex/>} />
          <Route path="/held" element={<HeldContest/>} />
          <Route path="/create" element={<Create />} />
          <Route path="/contest_page/*" element={<ContestPage />} />
          <Route path="/contest_info/*" element={<ContestInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
