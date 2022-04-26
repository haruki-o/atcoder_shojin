import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"

import { getEstimatedDifficulties } from "../api/atcoderProblems"

interface ProblemsProps {
  contestProblems: Problem[]
  setContestProblems: Function
  allProblems: Problem[]
}

const Diff: string[] = ["grey", "brawn", "green", "lightBlue", "blue", "yellow", "orange", "red"]
const downDiff: number[] = [0, 400, 800, 1200, 1600, 2000, 2400, 2800]
const upDiff: number[] = [400, 800, 1200, 1600, 2000, 2400, 2800, 5000]

export const DecideProblem: React.FC<ProblemsProps> = ({contestProblems, setContestProblems, allProblems }) => {
  console.log("render test")
  const gachaProblem = (id: number) => {
    console.log(Diff[id])
    const problemIndex: Problem[] = []
    allProblems.forEach((value, key) => {
      if(downDiff[id] <= value.difficulty && value.difficulty <= upDiff[id]){
        problemIndex.push(value);
      }
    })
    const addProblem: Problem = problemIndex[Math.floor(Math.random() * problemIndex.length)]
    setContestProblems((prev: Problem[]) => ([...contestProblems, addProblem]))
  }

  return (
    <div>
      {
        Diff.map((value: string, index: number) => {
          return (
            <button 
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