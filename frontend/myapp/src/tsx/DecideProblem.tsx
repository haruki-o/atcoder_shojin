import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"

import { getEstimatedDifficulties } from "../api/atcoderProblems"

interface ProblemsProps {
  problems: Problem[]
  setProblems: Function
}

const Diff: string[] = ["grey", "brawn", "green", "lightBlue", "blue", "yellow", "orange", "red"]
const downDiff: number[] = [0, 400, 800, 1200, 1600, 2000, 2400, 2800]
const upDiff: number[] = [400, 800, 1200, 1600, 2000, 2400, 2800, 5000]

export const DecideProblem: React.FC<ProblemsProps> = ({problems, setProblems}) => {
  const displayProblem = async (id: number) => {
    try {
      const res: any = await getEstimatedDifficulties()
      console.log(res.data);
      
      if(res.status === 200){
        console.log("create success!")
        for(const key of Object.keys(res.data)){
          if(downDiff[id] <= res.data[key].difficulty && res.data[key].difficulty <= upDiff){
            console.log(res.data[key].difficulty)
          }
        }
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  return (
    <div>
      {
        Diff.map((value: string, index: number) => {
          return (
            <button 
              style={{listStyle : 'none'}}
              onClick = {() => {displayProblem(index)}}
            >
              {value}
            </button>
          )
        })
      }
    </div>
  )
}