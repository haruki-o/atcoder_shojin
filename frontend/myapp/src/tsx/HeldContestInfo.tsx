import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"

import { createContests } from "../api/contests"

import { DecideProblem } from "./DecideProblem"

export const HeldContestInfo = () => {
  const [ contest, setContests] = useState<Contest>({ contest_name : "none" })
  const [ problems, setProblems ] = useState<Problem[]>([])

  const handleCreateContest = async () => {
    try {
      const res = await createContests(contest)
      console.log(res.data);
      
      if(res.status === 200){
        console.log("create success!")
        console.log(res.data)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      contest name
      <input 
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { value }: { value : string } = e.target
          setContests({contest_name: value})
        }}
      />
      <DecideProblem problems={ problems } setProblems={ setProblems } />
      <button onClick={() => handleCreateContest()}>held</button>
    </div>
  )
}