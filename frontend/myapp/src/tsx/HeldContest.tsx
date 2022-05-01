import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"
import { HoldContestInfo } from '../interface/index';

import { createContests } from "../api/contests"
import { getContests } from "../api/contests"
import { getEstimatedDifficulties } from "../api/atcoderProblems"

import { DecideProblem } from "./DecideProblem"
import { DateForm } from './DateForm';

export const HeldContest:React.FC = () => {
  const [ holdContestInfo, setHoldContestInfo] = useState<HoldContestInfo>({
    contest_info: {contest_name: 'none'},
    problems: []
  })
  const [ allProblems, setAllProblems ] = useState<Problem[]>([])
  const [ isDisplayMessage, setIsDisplayMessage ] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleHoldContest = async () => {
    try {
      const res = await getContests();
      console.log(res.data);
      if(res.status === 200){
          navigate("/contest-page");
      }
    }
    catch (err) {
      console.log(err);           
    }
  }

  const checkHoldContest = async () => {
    try {
      const res = await getContests();
      console.log(res.data);
      if(res.status === 200){
        console.log("get consts all success!")
        var isSameContest: boolean = false;
        res.data.map((value: Contest) => {
          if(value.contest_name === holdContestInfo.contest_info.contest_name){
            console.log(`find same contest ${value.contest_name}`);
            isSameContest = true;
          }
        })
        console.log(isSameContest)
        if(!isSameContest || holdContestInfo.problems.length === 0){
          if(!isSameContest)
            setIsDisplayMessage(true);
          else 
            setIsDisplayMessage(false);
        } else handleHoldContest();
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
          setHoldContestInfo({
            contest_info: {contest_name: value},
            problems: holdContestInfo.problems
          })
        }}
      />
      { isDisplayMessage ? '存在しません' : ''}
      <DecideProblem 
        holdContestInfo={ holdContestInfo } setHoldContestInfo={ setHoldContestInfo } 
        allProblems = { allProblems } />
      <ul className='problemIndex'>
        {
          holdContestInfo.problems.map((problem: Problem, index: number) =>{
            const problemUrl: string = `https://atcoder.jp/contests/${problem.contest_id.substr(0,problem.contest_id.length-2)}/tasks/${problem.contest_id}`;
            return (
              <li>{problem.contest_id}, {problem.difficulty}<a href={problemUrl} target="_blank">url</a></li>
              
            )
          })
        }
      </ul>
      <button onClick={() => checkHoldContest()}>held</button>
    </div>
  )
}