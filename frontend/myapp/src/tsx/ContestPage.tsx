import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, Col, Label, Row , Input, InputGroup } from 'reactstrap';

import { Contest, Problem, HoldContestInfo } from '../interface/index';

import { createContests, getContestInfo } from "../api/contests"
import { stringify } from 'querystring';

interface ContestPageProps {
  allProblems: Problem[] 
}

export const ContestPage: React.FC<ContestPageProps> = ({allProblems
}) => {
  const [ isOpen, setIsOpen ] = useState<boolean>(false)
  const location: any = useLocation().state;
  const contestProblem: string[] = [];

  const getContestInfoInitial = async () => {
    try {
      console.log(location)
      const res: any = await getContestInfo(location);
      console.log(res);
      if(res.status === 200){
        console.log(res.data)
        const pattern: string = "problem"
        for(const [key, value] of Object.entries(res.data)){
          if(key.indexOf(pattern) === 0 && value !== "null"){
            console.log(key, value);
            contestProblem.push(String(value));
            // console.log(typeof(key),typeof(value))
          }
        }
        console.log(contestProblem);
        console.log("success")
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
    <Container>
      <Row>
        <Col>a</Col>
        {
          // contestProblem.map((problem: string, index: number) => {
          //   console.log(problem)
          //   return(
          //     <Col>b{problem}</Col>
          //   )
          // }) 
          contestProblem.map((problem: string, index: number) => {
            console.log(problem)
            return(
              <Col>b{problem}</Col>
            )
          }) 
        }
        <Col>d</Col>
      </Row>
    </Container>
  )
}