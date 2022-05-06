import React, { useState, useEffect } from 'react';

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"
import { HoldContestInfo } from '../interface/index';


interface DecideProblemsProps {
  holdContestInfo: HoldContestInfo
  setHoldContestInfo: Function
  allProblems: Problem[] 
}

const Diff: string[] = ["grey", "brawn", "green", "lightBlue", "blue", "yellow", "orange", "red"]
const downDiff: number[] = [0, 400, 800, 1200, 1600, 2000, 2400, 2800]
const upDiff: number[] = [400, 800, 1200, 1600, 2000, 2400, 2800, 5000]

export const DecideProblem: React.FC<DecideProblemsProps> = ({holdContestInfo, setHoldContestInfo, allProblems }) => {
  console.log("<DecideProblem>")
  const gachaProblem = (id: number) => {
    console.log(Diff[id])
    const problemIndex: Problem[] = []
    allProblems.forEach((value, key) => {
      if(downDiff[id] <= value.difficulty && value.difficulty <= upDiff[id]){
        problemIndex.push(value);
      }
    })
    const addProblem: Problem = problemIndex[Math.floor(Math.random() * problemIndex.length)]
    setHoldContestInfo((prev: HoldContestInfo) => ({
      contest_info: prev.contest_info,
      problems: [...holdContestInfo.problems, addProblem]
    }))
  }

  return (
    <div>
      {
        Diff.map((value: string, index: number) => {
          return (
            <button
              disabled = {holdContestInfo.problems.length > 10 ? true : false}
              onClick = {() => {gachaProblem(index)}}
            >
              {value}
            </button>
          )
        })
      }
    </div>
  )
}