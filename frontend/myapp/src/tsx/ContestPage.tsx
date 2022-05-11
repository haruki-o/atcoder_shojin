import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Col, Label, InputGroup, Input } from 'reactstrap';

import { Contest, Problem, HoldContestInfo, User } from '../interface/index';

import { getContestInfo, joinUser, joiningUser, updateUserAC } from "../api/contests"

import { AcButton } from "./component/AcButton"
import { start } from 'repl';
interface ContestPageProps {
  allProblems: Problem[] 
}

export const ContestPage: React.FC<ContestPageProps> = ({allProblems
}) => {
  const location: any = useLocation();
  const navigate = useNavigate();

  const [ isOpen, setIsOpen ] = useState<boolean>(false);
  const [ isLogin, setIsLogin ] = useState<boolean>(
    location.pathname.split('/').length === 5 ? true : false
  );
  const [ userName, setUserName ] = useState<string>(
    location.pathname.split('/').length === 5 ? location.pathname.split('/')[location.pathname.split('/').length - 1] : ""
  );
  //arc153_a
  const [ contestProblem, setContestProblem ] = useState<string[]>([]);
  const [ contestUser, setContestUser ] = useState<User[]>([])
  console.log(location.state)

  const handleJoinContest = async () => {
    try {
      console.log(location.pathname)
      console.log(location.state);
      const sendDate: User = {
        contest_name: location.state.contest_name,
        time: location.state.time,
        user_name: userName
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
  const handleAC = async (key: number) => {
    console.log("call handleAC")
    console.log(key)
    const arg: User = {
      contest_name: location.state.contest_name,
      time: location.state.time,
      user_name: userName,
    }
    const problem: string = 'Problem' + String.fromCodePoint(key + (Number)("A".codePointAt(0)));
    const ACDate = new Date();
    try {
      const res: any = await updateUserAC(arg, problem, ACDate);
      console.log(res);
      if(res === 200){
        console.log("success")
        setContestUser(res.data);
      }
    }
    catch (err){
      console.log(err)
    }
  }
  const getContestInfoInitial = async () => {
    try {
      console.log(location.state)
      const res: any = await getContestInfo(location.state);
      console.log(res);
      if(res.status === 200){
        console.log(res.data)
        const pattern: string = "problem"
        const addContestProblem: string[] = []
        for(const [key, value] of Object.entries(res.data)){
          if(key.indexOf(pattern) === 0 && value !== "null"){
            console.log(key, value);
            addContestProblem.push(String(value));
            // console.log(typeof(key),typeof(value))
          }
        }
        setContestProblem(addContestProblem);
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const getContestUserInfo = async () => {
    console.log("call getContestUserInfo")
    try {
      const res: any = await joiningUser(location.state.contest_name, location.state.time);
      console.log(res);
      if(res.status === 200){
        console.log("success");
        setContestUser(res.data)
      }
    }
    catch (err) {
      console.log(err);
    } 
  }



  useEffect(() => {
    getContestInfoInitial()
    getContestUserInfo();
  }, [])
  console.log(location.state.start_date)
  console.log("render <ContestPage>")
  return (
    <div style={{margin: "5%"}}>
      <h1>{location.state.contest_name}{('000' + String(location.state.time)).slice(-3)}</h1>
      <p>
        {`${location.state.start_date.getHours().toFixed().padStart(2, "0")}:${location.state.start_date.getMinutes().toFixed().padStart(2, "0")}`} ~ {`${location.state.end_date.getHours().toFixed().padStart(2, "0")}:${location.state.end_date.getMinutes().toFixed().padStart(2, "0")}`} ({(location.state.end_date.getTime()-location.state.start_date.getTime())/1000/60}分)
      </p>
      { isLogin === false && 
        <Col>
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
      <Table striped style={{margin: "0", textAlign: "center"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            {
              contestProblem.map((problem: string, index: number) => {
                const problemUrl: string = `https://atcoder.jp/contests/${problem.substr(0,problem.length-2)}/tasks/${problem}`;
                const uni: number = (Number)("A".codePointAt(0))
                  return(
                    <th>
                      <a href={problemUrl} target="_blank" >{String.fromCodePoint(index + uni)}</a>
                    </th>
                  )
              }) 
            }
          </tr>
        </thead>
        <tbody>
          {
            contestUser.map((value: User, key: number) => {
              return(
                <tr>
                  <th scope="row">{key}</th>
                  <td>{value.user_name}</td>
                  {
                    // console.log(valect.entries(contestSituation))
                    // (Number)("A".codePointAt(0)
                    Object.entries(value).map((val: string[], key: number) => {
                      console.log(val[0], val[1])
                      console.log(Date.parse(val[1]))
                      console.log(contestProblem.length)
                      if(val[0].indexOf("Problem") === 0 && key - 6 < contestProblem.length){
                        if(val[1] !== null){
                          console.log(`${Date.parse(val[1]) - location.state.start_date.getTime()}`)
                          return(
                            <td className = "m">{(Date.parse(val[1]) - location.state.start_date.getTime())/60/1000}</td>
                          )
                        }
                        else{
                          if(value.user_name === userName){
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
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>     
  )
}