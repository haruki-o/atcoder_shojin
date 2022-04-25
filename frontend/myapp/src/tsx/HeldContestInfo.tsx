import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"

import { createContests } from "../api/contests"
import { getEstimatedDifficulties } from "../api/atcoderProblems"

import { DecideProblem } from "./DecideProblem"

export const HeldContestInfo = () => {
  const [ contest, setContests] = useState<Contest>({ contest_name : "none" })
  const [ contestProblems, setContestProblems ] = useState<Problem[]>([])
  
  const allProblems: Problem[] = []

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

  const getAllProblems = async () => {
    try {
      const res: any = await getEstimatedDifficulties()
      console.log(res.data);
      
      if(res.status === 200){
        console.log("create success!")
        for(const key of Object.keys(res.data)){
          const diff: number = res.data[key].difficulty
          const id: string = key
          if(id == undefined || diff == undefined)continue;
          console.log(diff)
          console.log(id)
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
      <DecideProblem 
        contestProblems={ contestProblems } setContestProblems={ setContestProblems } 
        allProblems = { allProblems } />
      {/* <ul>
        {
          contestProblems.map((problem: Problem, index: number) =>{
            return (
              <li>{index}</li>
            )
          })
        }
      </ul> */}
      <button onClick={() => handleCreateContest()}>held</button>
    </div>
  )
}