import React, { useState, useEffect, useLayoutEffect } from 'react';
import { NavigationType, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

import { Contest, Problem, HoldContestInfo } from '../interface/index';

import { getContests, updateContestTime, holdContests } from "../api/contests";
import { getProblems } from "../api/apis";

import { DecideProblem } from "./DecideProblem";
import { DateForm } from './DateForm';
import { DecideDate } from './DecideDate';


export const HeldContest = () => {
  const [ holdContestInfo, setHoldContestInfo] = useState<HoldContestInfo>({
    contest_info: {contest_name: 'none'},
    problems: []
  })
  const [ isContest, setIsContest ] = useState<boolean>(false)
  const [ allProblems, setAllProblems ] = useState<Problem[]>([])
  const downDiff: number[] = [0, 400, 800, 1200, 1600, 2000, 2400, 2800]
  const upDiff: number[] = [400, 800, 1200, 1600, 2000, 2400, 2800, 5000]
  const [ allDiffProblems, setAllDiffProblems ] = useState<Problem[][]>(new Array(8));

  const navigate = useNavigate();
  
  const getAllProblems = async () => {
    try {
      const res: any = await getProblems()
      console.log(res);
      if(res.status === 200){
        console.log("get allProblem success!")
        const pushAllProblems : Problem[] = []
        const pushAllDiffProblems: Problem[][] = new Array(8);
        for(let i = 0;i < 8;i++){
          pushAllDiffProblems[i] = new Array();
        }
        for(const key of Object.keys(res.data)){
          const diff: number = res.data[key].diff
          const id: string = res.data[key].contestId
          if(id == undefined || diff == undefined)continue;
          const addProblem: Problem = {contest_id: id, difficulty: diff}
          for(let i=0; i < 8; i++){
            if(downDiff[i] <= diff && diff <= upDiff[i]){
              pushAllDiffProblems[i].push(addProblem)
            }
          }
          pushAllProblems.push(addProblem)
        }
        setAllProblems(pushAllProblems);
        setAllDiffProblems(pushAllDiffProblems)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const handleHoldContest = async () => {
    console.log("call handleHoldContest")
    console.log(holdContestInfo.problems)
    try {
      const res1 = await updateContestTime(holdContestInfo.contest_info.contest_name);
      console.log(res1);
      if(res1.status === 200){
        const sortedProblems: Problem[] = sortProblem(holdContestInfo.problems);
        // console.log(sortProblem(holdContestInfo.problems));
        holdContestInfo.contest_info.time = res1.data.time;
        const res2 = await holdContests({
          contest_info: holdContestInfo.contest_info,
          problems: sortedProblems
        });
        console.log(res2)
        if(res2.status === 201){
          navigate(
            `/contest_page/${holdContestInfo.contest_info.contest_name}/${holdContestInfo.contest_info.time}`,
            {state: {
              contest_name: holdContestInfo.contest_info.contest_name,
              time: holdContestInfo.contest_info.time,
              start_date: new Date(`${holdContestInfo.contest_info.startDate} ${holdContestInfo.contest_info.startHour}:${holdContestInfo.contest_info.startMinute}`),
              end_date: new Date(`${holdContestInfo.contest_info.endDate} ${holdContestInfo.contest_info.endHour}:${holdContestInfo.contest_info.endMinute}`),
              contest_problems: sortedProblems
            }}
          );
        }
      }
    }
    catch (err) {
      console.log(err);           
    }
  }

  const checkHoldContest = async () => {
    try {
      console.log(holdContestInfo)
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
        console.log(holdContestInfo)
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
  const sortProblem = (problemProps: Problem[]): Problem[] => {
    const returnProblem: Problem[] = new Array(problemProps.length);
    console.log("before")
    console.log(problemProps)
    let seen: number[] = new Array(problemProps.length).fill(0);
    console.log(returnProblem)
    console.log(seen)
    for (let i = 0; i < problemProps.length; i++) {
      let ind: number = -1;
      for (let j = 0; j < problemProps.length; j++){
        if(ind === -1 && seen[j] === 0){
          ind = j;
        }        
      }
      for (let j = ind; j < problemProps.length; j++){
        if(problemProps[j].difficulty < problemProps[ind].difficulty && seen[j] === 0){
          ind = j;
        }        
      }
      returnProblem[i] = problemProps[ind];
      console.log(returnProblem)
      console.log(seen)
      console.log(ind)
      seen[ind] = 1;
    }
    console.log("after")
    console.log(returnProblem)
    return returnProblem;
  } 

  useLayoutEffect(() => {
    getAllProblems()
  }, [])

  console.log("<HeldContest>")
  return (
    <div style={{margin: "20px"}}>
      {console.log("display <HeldContest>")}
      contest name
      <input 
        type="text"
        style={{margin: "0 0 0 10px"}}
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
        holdContestInfo={ holdContestInfo } setHoldContestInfo={ setHoldContestInfo } allDiffProblems = { allDiffProblems }
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