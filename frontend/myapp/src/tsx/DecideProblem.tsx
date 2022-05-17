import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"
import { HoldContestInfo } from '../interface/index';


interface DecideProblemsProps {
  holdContestInfo: HoldContestInfo
  setHoldContestInfo: Function
  allProblems: Problem[] 
  allDiffProblems: Problem[][]
}

const Diff: string[] = ["grey", "brawn", "green", "lightBlue", "blue", "yellow", "orange", "red"]
const DiffColor: string[] = ["#808080","#804000","#008000","#00C0C0","#0000FF","#C0C000","#FF8000","#FF0000"]
const DiffJP: string[] = ["灰","茶","緑","水","青","黄","橙","赤"]

const downDiff: number[] = [0, 400, 800, 1200, 1600, 2000, 2400, 2800]
const upDiff: number[] = [400, 800, 1200, 1600, 2000, 2400, 2800, 5000]

export const DecideProblem: React.FC<DecideProblemsProps> = ({holdContestInfo, setHoldContestInfo, allProblems, allDiffProblems}) => {
  const gachaProblem = (id: number) => {
    console.log(allDiffProblems)
    const addProblem: Problem = allDiffProblems[id][Math.floor(Math.random() * allDiffProblems[id].length)]
    console.log(addProblem)
    setHoldContestInfo({
      ...holdContestInfo,
      problems: [...holdContestInfo.problems, addProblem]
    })
  }
  console.log("<DecideProblem>")
  console.log(holdContestInfo)
  return (
    <div style={{margin: "15px 0"}}>
      {
        Diff.map((value: string, index: number) => {
          return (
            <Button
              style={{
                backgroundColor: DiffColor[index],
                height: "40px",
                width: "50px",
                margin: "4px",
                borderRadius: "30px",
              }}
              disabled = {holdContestInfo.problems.length > 10 ? true : false}
              onClick = {() => {gachaProblem(index)}}
            >
              {DiffJP[index]}
            </Button>
          )
        })
      }
    </div>
  )
}