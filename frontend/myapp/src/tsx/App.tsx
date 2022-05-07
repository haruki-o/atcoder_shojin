import React, { useState, useEffect } from 'react';
import '../css/App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import { Home } from "./Home"
import { NavigationBar } from "./NavigationBar"
import { ContestIndex} from './ContestIndex'
import { HeldContest } from './HeldContest';
import { Create } from "./Create"
import { ContestPage } from './ContestPage';

import { Problem, HoldContestInfo } from "../interface/index"

import { getProblems } from '../api/apis';
import { getContests} from "../api/contests"

import { isConstructorDeclaration } from 'typescript';


const App: React.FC = () => {
  const allProblems : Problem[] = []
  const getAllProblems = async () => {
    try {
      const res: any = await getProblems()
      console.log(res);
      if(res.status === 200){
        console.log("get allProblem success!")
        for(const key of Object.keys(res.data)){
          const diff: number = res.data[key].diff
          const id: string = res.data[key].contestId
          if(id == undefined || diff == undefined)continue;
          const addProblem: Problem = {contest_id: id, difficulty: diff}
          allProblems.push(addProblem)
        }
        console.log(allProblems)
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
   getAllProblems()
  }, [])
  
  console.log("render <App>")

  return (
    <div>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/index" element={<ContestIndex />} />
          <Route path="/held" element={<HeldContest 
            allProblems = { allProblems } />} />
          <Route path="/create" element={<Create />} />
          <Route path="/contest_page/*" element={<ContestPage
            allProblems = { allProblems } />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
