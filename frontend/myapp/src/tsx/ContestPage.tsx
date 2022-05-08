import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button } from 'reactstrap';

import { Contest, Problem, HoldContestInfo } from '../interface/index';

import { createContests, getContestInfo } from "../api/contests"
import { stringify } from 'querystring';

interface ContestPageProps {
  allProblems: Problem[] 
}

export const ContestPage: React.FC<ContestPageProps> = ({allProblems
}) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const [ contestProblem, setContestProblem ] = useState<string[]>([]);
  const location: any = useLocation().state;

  const getContestInfoInitial = async () => {
    try {
      console.log(location)
      const res: any = await getContestInfo(location);
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

  useEffect(() => {
    getContestInfoInitial()
  }, [])

  console.log("render <ContestPage>")
  return (
    <div>
      <Button>join</Button>
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