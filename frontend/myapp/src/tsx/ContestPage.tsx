import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Col, Label, InputGroup, Input } from 'reactstrap';

import { Contest, Problem, HoldContestInfo, User } from '../interface/index';

import { getContestInfo, joinUser, joiningUser } from "../api/contests"
import { stringify } from 'querystring';

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
  const [ userName, setUserName ] = useState<string>("");
  const [ contestProblem, setContestProblem ] = useState<string[]>([]);

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
        navigate(`${location.pathname}/${userName}`,
        {state: location.state});
      }
    }
    catch (err) {
      console.log(err);
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
    try {
      const res: any = await joiningUser(location.state.contest_name, location.state.time);
      console.log(res);
      if(res.status === 200){
        console.log("success");
        console.log(res.data)
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

  console.log("render <ContestPage>")
  return (
    <div>
      { isLogin === false && 
        <Col>
          <InputGroup style={{padding: "10px"}}>
            username: 
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
      <Table striped style={{margin: "5%", width: "80%", textAlign: "center"}}>
        <thead>
          <tr>
            <th>#</th>
            <th>username</th>
            {
              contestProblem.map((problem: string, index: number) => {
                const problemUrl: string = `https://atcoder.jp/contests/${problem.substr(0,problem.length-2)}/tasks/${problem}`;
                  return(
                    <th>
                      <a href={problemUrl} target="_blank" >{index}</a>
                    </th>
                  )
              }) 
            }
          </tr>
        </thead>
        <tbody>
          <th scope="row">1</th>
          <td>og</td>
          {
            contestProblem.map((problem: string, index: number) => {
                return(
                  <td>-</td>
                )
            }) 
          }
        </tbody>
      </Table>
    </div>     
  )
}