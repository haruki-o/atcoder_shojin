import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Col, Label, InputGroup, Input } from 'reactstrap';

import { Contest, History, Problem } from "../interface/index"

import { getContests, getContestInfo, getHistoryIndex, getAllHistory } from "../api/contests"
import { getProblems } from "../api/apis"

const DiffColor: string[] = ["#808080","#804000","#008000","#00C0C0","#0000FF","#C0C000","#FF8000","#FF0000"]
const downDiff: number[] = [0, 400, 800, 1200, 1600, 2000, 2400, 2800]
const upDiff: number[] = [400, 800, 1200, 1600, 2000, 2400, 2800, 5000]

export const ContestIndex = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const [ allProblems, setAllProblems ] = useState<Problem[]>([])
  const [ allContests, setAllContests ] = useState<Contest[]>([])
  const [ allHistories, setAllHistories] = useState<History[]>([])
  const [ allObjectProblems, setAllObjectProblems ] = useState<{ [s: string]: number }>({})
  const [ contestName, setContestName ] = useState<string>("");

  const getAllProblems = async () => {
    try {
      const res: any = await getProblems()
      console.log(res);
      if(res.status === 200){
        console.log("get allProblem success!")
        const pushAllProblems : Problem[] = []
        const pushAllObjectProblems: { [s: string]: number } = {}
        console.log(res.data)
        for(const key of Object.keys(res.data)){
          const diff: number = res.data[key].diff
          const id: string = res.data[key].contestId
          if(id == undefined || diff == undefined)continue;
          const addProblem: Problem = {contest_id: id, difficulty: diff}
          pushAllProblems.push(addProblem)
          pushAllObjectProblems.id = diff
        }
        setAllProblems(pushAllProblems);
        setAllObjectProblems(pushAllObjectProblems);
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const getAllContests = async () => {
    try {
      const res: any = await getContests();
      console.log(res);
      const pushAllContests: Contest[] = []
      if(res.status === 200){
        res.data.map((value: Contest, key: number) => {
          pushAllContests.push(value);
        })
        setAllContests(pushAllContests)
        console.log(allContests);
      }
    }
    catch (err) {
      console.log(err)
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
  const handleContestPage = async (contest_name: string) => {
    try{
      const res: any = await getHistoryIndex(contest_name);
      console.log(res);
      var holdTime: number = -1;
      var holdKey: number = -1;
      if(res.status === 200){
        const now: Date = new Date();
        console.log(now)
        res.data.map((value: History, key: number) => {
          const sta_date: Date = new Date(value.start_date);
          const en_date: Date = new Date(value.end_date);
          sta_date.setHours(sta_date.getHours() - 9);
          en_date.setHours(en_date.getHours() - 9);
          if(sta_date < now && now < en_date){
            holdTime = value.time;
            holdKey = key;
          }
        })
        console.log(holdTime)
        console.log(`/contest_page/${contest_name}/${holdTime}`)
        if(holdTime !== -1){
          const sta_date: Date = new Date(res.data[holdKey].start_date);
          const en_date: Date = new Date(res.data[holdKey].end_date);
          sta_date.setHours(sta_date.getHours() - 9);
          en_date.setHours(en_date.getHours() - 9);
          const addContestProblem: Problem[] = []
          try {
            const res2: any = await getContestInfo(contest_name,holdTime);
            console.log(res2);
            if(res2.status === 200){
              console.log(res2.data)
              console.log(allProblems)
              const pattern: string = "problem"
              await allProblems.map((valueProblem: Problem, index: number) => {
                for(const [key, value] of Object.entries(res2.data)){
                  if(key.indexOf(pattern) === 0 && value !== "null"){
                    if(valueProblem.contest_id === value){
                      console.log(key, value);
                      console.log(valueProblem)
                      addContestProblem.push(valueProblem);
                    }
                    // console.log(typeof(key),typeof(value))
                  }
                }
              })
              const afterSortContestProblem: Problem[] = sortProblem(addContestProblem);
              navigate(
                `/contest_page/${contest_name}/${holdTime}`,
                {state: {
                  contest_name: contest_name, time: holdTime,
                  start_date: sta_date, end_date: en_date,
                  contest_problems: afterSortContestProblem
                }}
              )
            }
          }
          catch (err){
            console.log(err);
          }
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const getAllHistories = async () => {
    console.log("call getAllHistories")
    try {
      const res: any = await getAllHistory();
      console.log(res);
      if(res.status === 200){
        console.log(res.data);
        const pushAllHistories: History[] = [];
        allContests.map((valContest: Contest, key1: number) => {
          var isPush: boolean = false;
          res.data.map((valHistory: History, key2: number) => {
            if(valContest.contest_name === valHistory.contest_name && !isPush){
              pushAllHistories.push(valHistory);
              isPush = true;
            }
          })
        })
        setAllHistories(pushAllHistories);
        console.log(allHistories)
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getAllContests();
    getAllHistories();
    getA
  }, [])
  console.log("render <ContestIndex>")
  // console.log(allHistories)
  console.log(allObjectProblems);
  // console.log(allContests)
  return (
    <div style={{padding: "10px"}}>
      <Col style={{width: "300px"}}>
        <InputGroup style={{padding: "20px 0", height: "80px"}}>
          <span style={{padding: "10px 0"}}>contest name : </span> 
          <Input 
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { value }: { value : string } = e.target
              setContestName(value)
            }}
            style={{margin: "0 0 0 10px"}}/>
        </InputGroup>
      </Col>
      {/* {
        allContests.map((value: Contest, key: number) => {
          return((contestName === "" || (contestName !== "" && contestName === value.contest_name)) && 
            <div style={{padding: "10px 0"}}>
              <span style = {{padding : "0 10px 0 0"}}>{value.contest_name}</span>
              <Button 
                onClick={() => {
                  navigate(`/contest_info/${value.contest_name}`,
                  {state: {contest_name: value.contest_name}})
                }}>
                  info
              </Button>
              <Button 
                style={{margin: "10px"}}
                onClick={() => handleContestPage(value.contest_name)}
              >
                join
              </Button>
            </div>
          )
        })
      } */}
      <Table striped responsive style={{margin: "0", textAlign: "center"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>contest</th>
            <th>perf</th>
            <th>join</th>
            <th>recent duaring</th>
            <th>recent diff</th>
          </tr>
        </thead>
        <tbody>
        {
          allHistories.map((value: History, key: number) => {
            const sta_date: Date = new Date(value.start_date);
            const en_date: Date = new Date(value.end_date);
            const dua_time: number = en_date.getTime() - sta_date.getTime();
            return(
              <tr>
                <th scope="row">{key}</th>
                <td>{value.contest_name}</td>
                <td>
                  <Button 
                    onClick={() => {
                      navigate(`/contest_info/${value.contest_name}`,
                      {state: {contest_name: value.contest_name}})
                    }}>
                      info
                  </Button>
                </td>
                <td>
                  <Button 
                    onClick={() => handleContestPage(value.contest_name)}
                  >
                    join
                  </Button>
                </td>
                <td>
                  {(dua_time - dua_time % 60) / 1000 / 60}分
                </td>
                <td>
                  {
                    Object.entries(value).map((val: string[], key: number) => {
                      console.log(val[0]);
                      if(val[0].indexOf("problem") === 0 && val[1] !== null){
                        const at_diff: number = allObjectProblems[val[1]]
                        for(let i = 0; i < 8; i++){
                          if(downDiff[i] <= at_diff && at_diff <= upDiff[i]){
                            return(
                              // <span style={{color: `${DiffColor[i]}`}}>○</span>
                              <span></span>
                            )
                          }
                        }
                      }
                    })
                  }
                </td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
    </div>
  )
}