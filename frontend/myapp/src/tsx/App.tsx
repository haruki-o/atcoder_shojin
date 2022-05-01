import React, { useState, useEffect } from 'react';
import '../css/App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import { Home } from "./Home"
import { NavigationBar } from "./NavigationBar"
import { ContestIndex} from './ContestIndex'
import { HeldContest } from './HeldContest';
import { Create } from "./Create"

import { Contest } from "../interface/index"
import { HoldContestInfo } from '../interface/index';

import { getContests} from "../api/contests"
import { isConstructorDeclaration } from 'typescript';


const App: React.FC = () => {

  console.log("render <App>")

  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index" element={<ContestIndex />} />
          <Route path="/held" element={<HeldContest />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
