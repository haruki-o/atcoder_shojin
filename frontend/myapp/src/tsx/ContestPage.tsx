import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"
import { HoldContestInfo } from '../interface/index';


import { createContests } from "../api/contests"

interface ContestPageProps {
  holdContestInfo: HoldContestInfo
  setHoldContestInfo: Function
  allProblems: Problem[] 
}

export const ContestPage: React.FC<ContestPageProps> = ({
  holdContestInfo, setHoldContestInfo, allProblems
}) => {
  console.log("render <ContestPage>")
  console.log(holdContestInfo);
  console.log(holdContestInfo.problems)
  return (
    <div>
      <ul>
      {
        holdContestInfo.problems.map((value: Problem, index: number) => {
          return(
            <li>{value.contest_id}</li> 
          )
        })
      }
      </ul>
    </div>
  )
}