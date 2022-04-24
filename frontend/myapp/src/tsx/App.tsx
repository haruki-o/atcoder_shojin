import React, { useState, useEffect } from 'react';
import '../css/App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import { ContestsIndex} from './ContestsIndex'
import { Home } from "./Home"
import { NavigationBar } from "./NavigationBar"
import { Create } from "./Create"

import { Contest } from "../interface/index"

import { getContests} from "../api/contests"
import { isConstructorDeclaration } from 'typescript';
import { HeldContestInfo } from './HeldContestInfo';


const App: React.FC = () => {
  const [contests, setContests] = useState<Contest[]>([])

  const handleGetContests = async () => {
    try {
      const res = await getContests()
      console.log(res.data);
      
      if(res.status === 200){
        await setContests(res.data)
        console.log(contests[0])
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    handleGetContests()
  }, [])

  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index" element={<ContestsIndex Contests={contests} />} />
          <Route path="/held" element={<HeldContestInfo />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
