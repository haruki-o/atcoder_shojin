import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"
import { HoldContestInfo } from '../interface/index';


import { createContests } from "../api/contests"
import { getProblems } from '../api/atcoderProblems';

interface ContestPageProps {
  holdContest: HoldContestInfo
}

export const ContestPage: React.FC<ContestPageProps> = ({holdContest}) => {
  console.log("render <ContestPage>")
  console.log(holdContest);
  console.log(holdContest.problems)
  return (
    <div>
      <ul>
      {
        holdContest.problems.map((value: Problem, index: number) => {
          return(
            <li>{value.contest_id}</li> 
          )
        })
      }
      </ul>
    </div>
  )
}