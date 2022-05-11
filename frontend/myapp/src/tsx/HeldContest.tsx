import React, { useState, useEffect } from 'react';
import { NavigationType, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

import { Contest, Problem, HoldContestInfo } from '../interface/index';

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
  const navigate = useNavigate();

  const handleHoldContest = async () => {
    console.log("call handleHoldContest")
    try {
      const res1 = await updateContestTime(holdContestInfo.contest_info.contest_name);
      console.log(res1);
      if(res1.status === 200){
        holdContestInfo.contest_info.time = res1.data.time;
        console.log(holdContestInfo);
        const res2 = await holdContests(holdContestInfo);
        console.log(res2)
        if(res2.status === 201){
          navigate(
            `/contest_page/${holdContestInfo.contest_info.contest_name}/${holdContestInfo.contest_info.time}`,
            {state: {
              contest_name: holdContestInfo.contest_info.contest_name,
              time: holdContestInfo.contest_info.time,
              start_date: new Date(`${holdContestInfo.contest_info.startDate} ${holdContestInfo.contest_info.startHour}:${holdContestInfo.contest_info.startMinute}`),
              end_date: new Date(`${holdContestInfo.contest_info.endDate} ${holdContestInfo.contest_info.endHour}:${holdContestInfo.contest_info.endMinute}`),
            }}
          );
        }
      }
    }
    catch (err) {
      console.log(err);           
    }
  }

  // const getContestTime = async () => {
  //   try { 
  //     const res: any = await getContests();
  //     if(res.status === 200){
  //     res.data.map((value: Contest, key: number) =>{
  //       if(value.contest_name === holdContestInfo.contest_info.contest_name){
  //         holdContestInfo.contest_info.time = value.time;
  //       }
  //     })
  //   } 
  //   catch (err) {
  //     console.log(err);
  //   }
  // }

  const checkHoldContest = async () => {
    try {
      const res = await getContests();
      console.log(res.data);
      if(res.status === 200){
        console.log("get contests all success!")
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
  return (
    <div style={{margin: "20px 20px"}}>
      contest name
      <input 
        type="text"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { value }: { value : string } = e.target
          setHoldContestInfo({
            ...holdContestInfo,
            contest_info: {
              ...holdContestInfo.contest_info,
              contest_name: value},
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
      <Button 
        style={{marginTop: "20px"}}
        onClick={() => checkHoldContest()}>held</Button>
    </div>
  )
}