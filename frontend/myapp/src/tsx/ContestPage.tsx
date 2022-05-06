import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"
import { HoldContestInfo } from '../interface/index';


import { createContests } from "../api/contests"

interface ContestPageProps {
  allProblems: Problem[] 
}

export const ContestPage: React.FC<ContestPageProps> = ({allProblems
}) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)

  console.log("render <ContestPage>")
  return (
    <div>
      <ul>
      {
          allProblems.map((value: Problem, index: number) => {
          return(
            <li>{value.contest_id}</li> 
          )
        })
      }
      </ul>
      <h1></h1>
    </div>
  )
}