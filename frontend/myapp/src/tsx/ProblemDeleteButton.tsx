import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'reactstrap';

import { HoldContestInfo, Problem } from '../interface/index';

interface ProblemDeleteButtonProps {
  holdContestInfo: HoldContestInfo
  setHoldContestInfo: Function
  index: number
}

export const ProblemDeleteButton: React.FC<ProblemDeleteButtonProps> = ({holdContestInfo, setHoldContestInfo, index}) => {

  const handleDelete = (index: number) => {
    const newProblems: Problem[] = [];
    holdContestInfo.problems.map((value: Problem, key: number) =>{
      if(key != index)newProblems.push(value);
    })
    setHoldContestInfo({
      ...holdContestInfo,
      problems: newProblems
    })
  }
  return(
    <Button 
      style={{
        backgroundColor: "white",color: "black",
        padding: "0 5px 5px 5px", border: "none", 
        verticalAlign: "middle"
      }}
      onClick = { () => handleDelete(index)}
    >✖</Button>
  )
}