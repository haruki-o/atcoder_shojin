import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"
import { HoldContestInfo } from '../interface/index';

import { createContests } from "../api/contests"
import { getContests } from "../api/contests"
import { getEstimatedDifficulties } from "../api/atcoderProblems"

import { DecideProblem } from "./DecideProblem"

interface HeldContestProps {
  holdContest: HoldContestInfo
  setHoldContest: Function
}

export const HeldContest:React.FC<HeldContestProps> = ({holdContest, setHoldContest}) => {
  const [ contest, setContests] = useState<Contest>({ contest_name : "none" })
  const [ contestProblems, setContestProblems ] = useState<Problem[]>([])
  const [ allProblems, setAllProblems ] = useState<Problem[]>([])
  const [ isDisplayMessage, setIsDisplayMessage ] = useState<boolean>(false)
  const navigate = useNavigate()


  const handleHoldContest = async (propHoldContest: Contest) => {
    try {
      const res = await getContests();
      console.log(res.data);
      var canNav: boolean = false;
      if(res.status === 200){
        console.log("get consts all success!")
        res.data.map((value: Contest) => {
          if(value.contest_name === propHoldContest.contest_name){
            console.log(`find same contest ${value.contest_name}`);
            canNav = true;
          }
        })
        if(isDisplayMessage)console.log("そんなコンテストは存在しません");
        if(canNav){
          setHoldContest({contest_info: contest, problems: contestProblems});
          navigate("/contest-page");
        }
        else setIsDisplayMessage(true);
      }
    }
    catch (err) {
      console.log(err);           
    }
  }

  console.log("held render test")

  const getAllProblems = async () => {
    try {
      const res: any = await getEstimatedDifficulties()
      console.log(res.data);
      
      if(res.status === 200){
        console.log("get allProblem success!")
        for(const key of Object.keys(res.data)){
          const diff: number = res.data[key].difficulty
          const id: string = key
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
      { isDisplayMessage ? '存在しません' : ''}
      <DecideProblem 
        contestProblems={ contestProblems } setContestProblems={ setContestProblems } 
        allProblems = { allProblems } />
      <ul>
        {
          contestProblems.map((problem: Problem, index: number) =>{
            const problemUrl: string = `https://atcoder.jp/contests/${problem.contest_id.substr(0,problem.contest_id.length-2)}/tasks/${problem.contest_id}`;
            return (
              <li>{problem.contest_id}, {problem.difficulty}<a href={problemUrl} target="_blank">url</a></li>
              
            )
          })
        }
      </ul>
      <button onClick={() => handleHoldContest(contest)}>held</button>
    </div>
  )
}