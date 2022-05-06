import React, { useState, useEffect } from 'react';
import { NavigationType, useNavigate } from "react-router-dom";

import { Contest } from "../interface/index";
import { Problem } from "../interface/index";
import { HoldContestInfo } from '../interface/index';

import { getContests, updateContestTime, holdContests } from "../api/contests";
import { getProblems } from "../api/apis";

import { DecideProblem } from "./DecideProblem";
import { DateForm } from './DateForm';
import { DecideDate } from './DecideDate';

interface HeldContestProps {
  allProblems: Problem[] 
}

export const HeldContest:React.FC<HeldContestProps> = ({allProblems}) => {
  const [ holdContestInfo, setHoldContestInfo] = useState<HoldContestInfo>({
    contest_info: {contest_name: 'none'},
    problems: []
  })
  const [ isContest, setIsContest ] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleHoldContest = async () => {
    try {
      const res1 = await updateContestTime(holdContestInfo.contest_info.contest_name);
      console.log(res1);
      if(res1.status === 200){
        setHoldContestInfo((prev: HoldContestInfo) => ({
          contest_info: prev.contest_info,
          problems: [...holdContestInfo.problems, addProblem]
        }))
        setHoldContestInfo((prev: HoldContestInfo) =>({
          problems: prev.problems,
          contest_info:{
            ...holdContestInfo.contest_info,
            time: res1.data.time}
        }))
        console.log(holdContestInfo);
        const res2 = await holdContests(holdContestInfo);
        if(res2.status === 200){
          navigate('contest_page');
        }
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
            setIsContest(true);
          else 
            setIsContest(false);
        } else handleHoldContest();
      }
    }
    catch (err) {
      console.log(err);           
    }
  }
  

  console.log("<HeldContest>")
  console.log(holdContestInfo)

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
      { isContest ? '存在しません' : ''}
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
      <DecideDate 
        holdContestInfo={ holdContestInfo } 
        setHoldContestInfo={ setHoldContestInfo } />
      <button onClick={() => checkHoldContest()}>held</button>
    </div>
  )
}