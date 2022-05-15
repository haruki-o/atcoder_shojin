import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Col, Label, InputGroup, Input } from 'reactstrap';

import { Contest, Problem, HoldContestInfo, User } from '../interface/index';

import { getContestInfo, joinUser, joiningUser, updateUserAC } from "../api/contests"

import { AcButton } from "./component/AcButton"



export const ContestPage= () => {
  const location: any = useLocation();
  const navigate = useNavigate();

  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ isEnd, setIsEnd ] = useState<boolean>(false);

  const [ isLogin, setIsLogin ] = useState<boolean>(
    location.pathname.split('/').length === 5 ? true : false
  );
  const [ userName, setUserName ] = useState<string>(
    location.pathname.split('/').length === 5 ? location.pathname.split('/')[location.pathname.split('/').length - 1] : ""
  );
  const [ contestUser, setContestUser ] = useState<User[]>([])

  const handleJoinContest = async () => {
    try {
      console.log(location.pathname)
      console.log(location.state);
      const sendDate: User = {
        contest_name: location.state.contest_name,
        time: location.state.time,
        user_name: userName,
        performance: 0
      }
      const res: any = await joinUser(sendDate);
      console.log(res);
      if(res.status === 200){
        console.log("success")
        setIsLogin(true)
        getContestUserInfo();
        navigate(`${location.pathname}/${userName}`,
        {state: location.state});
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const calcPerf = (props: number): number => {
    let index: number = 0;
    contestUser.map((value:User, key:number) =>{
      if(userName === value.user_name)index = key;
    })
    let Perf: number = 0;
    console.log("call calcPerf")
    console.log(contestUser[index])
    Object.entries(contestUser[index]).map((val: string[], key: number) => {
      console.log(val[0], val[1])
      // console.log(Date.parse(val[1]))
      // console.log(contestProblem.length)
      if(val[0].indexOf("Problem") === 0 && key - 6< location.state.contest_problems.length){
        if(val[1] !== null || key - 6 === props){
          console.log(location.state.contest_problems[key - 6].difficulty)
          Perf = location.state.contest_problems[key - 6].difficulty;
        }
      }
    })
    console.log(`calcPerf: ${Perf}`)
    return Perf;
  }
  const handleAC = async (key: number) => {
    console.log("call handleAC")
    console.log(key)
    const updatePerf: number = calcPerf(key);
    const arg: User = {
      contest_name: location.state.contest_name,
      time: location.state.time,
      user_name: userName,
      performance: updatePerf
    }
    const problem: string = 'Problem' + String.fromCodePoint(key + (Number)("A".codePointAt(0)));
    const ACDate = new Date();
    try {
      const res: any = await updateUserAC(arg, problem, ACDate);
      console.log(res);
      if(res.status === 200){
        console.log("success")
        getContestUserInfo();
        console.log(res.data);
      }
    }
    catch (err){
      console.log(err)
    }
  }
  const sortRank = (userProps: User[]): User[] => {
    const N: number = userProps.length
    console.log(N)
    console.log(userProps[0].performance)
    const returnUser: User[] = new Array(N);
    let seen: number[] = new Array(N).fill(0);
    for (let i = 0; i < N; i++) {
      let ind: number = -1;
      for (let j = 0; j < N; j++){
        if(ind === -1 && seen[j] === 0){
          ind = j;
        }        
      }
      console.log(ind)
      for (let j = ind; j < N; j++){
        console.log(j)
        if(userProps[j].performance > userProps[ind].performance && seen[j] === 0){
          ind = j;
        }        
      }
      returnUser[i] = userProps[ind];
      console.log(returnUser)
      seen[ind] = 1;
    }
    return returnUser;
  }

  const getContestUserInfo = async () => {
    console.log("call getContestUserInfo")
    const now: Date = new Date();
    if(now >= location.state.start_date)setIsOpen(true);
    if(now > location.state.end_date)setIsEnd(true);
    try {
      const res: any = await joiningUser(location.state.contest_name, location.state.time);
      console.log(res);
      if(res.status === 200){
        console.log("success");
        console.log(res.data)
        const newUser: User[] = sortRank(res.data)
        setContestUser(newUser)
      }
    }
    catch (err) {
      console.log(err);
    } 
  }

  useEffect(() => {
    getContestUserInfo();
  }, [])
  
  console.log(location.state)
  console.log("render <ContestPage>")
  return (
    <div style={{margin: "20px"}}>
      <h1>{location.state.contest_name}{('000' + String(location.state.time-1)).slice(-3)}</h1>
      <p>
        {`${location.state.start_date.getHours().toFixed().padStart(2, "0")}:${location.state.start_date.getMinutes().toFixed().padStart(2, "0")}`} ~ {`${location.state.end_date.getHours().toFixed().padStart(2, "0")}:${location.state.end_date.getMinutes().toFixed().padStart(2, "0")}`} ({(location.state.end_date.getTime()-location.state.start_date.getTime())/1000/60}分)
      </p>
      { isLogin === false && 
        <Col style={{width: "300px"}}>
          <InputGroup style={{padding: "20px 0", height: "80px"}}>
            <span style={{padding: "10px 0"}}>username : </span> 
            <Input 
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const { value }: { value : string } = e.target
                setUserName(value)
              }}
              style={{margin: "0 0 0 10px"}}/>
            <Button onClick = {() => handleJoinContest()}>join</Button>
          </InputGroup>
        </Col>
      }
      <Table striped responsive style={{margin: "0", textAlign: "center"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            {
              location.state.contest_problems.map((problem: Problem, index: number) => {
                const problemUrl: string = `https://atcoder.jp/contests/${problem.contest_id.substr(0,problem.contest_id.length-2)}/tasks/${problem.contest_id}`;
                return(
                  <th>
                    <a href={problemUrl} target="_blank" >{String.fromCharCode((Number)("A".codePointAt(0)) + index)}</a>
                  </th>
                )
              }) 
            }
            <th>Perf</th>
          </tr>
        </thead>
        <tbody>
          {
            contestUser.map((value: User, key: number) => {
              return(
                <tr>
                  <th scope="row">{key}</th>
                  <td>
                    <a 
                      href={`https://atcoder.jp/users/${value.user_name}`}
                      rel="noopener" target="_blank"
                      style={{color: "black", textDecoration: "none"}}
                    >
                      {value.user_name}
                    </a>
                  </td>
                  {
                    // console.log(valect.entries(contestSituation))
                    // (Number)("A".codePointAt(0))
                    Object.entries(value).map((val: string[], key: number) => {
                      // console.log(val[0], val[1])
                      // console.log(Date.parse(val[1]))
                      // console.log(contestProblem.length)
                      if(val[0].indexOf("Problem") === 0 && key - 6 < location.state.contest_problems.length){
                        if(isOpen === false){
                          return(
                            <td>-</td>
                          )
                        }
                        else if(val[1] !== null){
                          const AcTimes: number = (Date.parse(val[1]) - location.state.start_date.getTime())/1000;
                          return(
                              <td style={{padding:"0 8px"}}>
                                <span style={{display:"block"}}>◦</span>
                                <span style={{display:"block", fontSize: "10px"}}>
                                  {(AcTimes/60/60).toFixed()}:
                                  {((AcTimes - AcTimes % 60)/60%60).toFixed().padStart(2,"0")}:
                                  {(AcTimes%60).toFixed().padStart(2,"0")}
                                </span>
                              </td>
                          )
                        }
                        else{
                          if(value.user_name === userName && isEnd === false){
                            return(
                              <td className = "text-center">
                                <AcButton handleAC={ handleAC } index = { key - 6 } />
                              </td>
                            )
                          }
                          else{
                            return(
                              <td className = "text-center">-</td> 
                            )
                          }
                        }
                      }
                    })
                  }
                  <td>{value.performance}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>     
  )
}