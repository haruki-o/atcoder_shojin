import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { List, Table, Button, Col, Label, InputGroup, Input } from 'reactstrap';

import { Contest, History, User, Graph } from "../interface/index"

import { getHistoryIndex, userHistory } from "../api/contests"
import { url } from "inspector";
import { LinePlot } from "./LinePlot";

interface ContestInfoProps {
}

export const ContestInfo: React.FC<ContestInfoProps> = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const [ allHistory, setAllHistory] = useState<History[]>([])
  const [ userName, setUserName ] = useState<string>("")
  const [ userRating , setUserRating ] = useState<User[]>([])
  const [ afterProcessData, setAfterProcessData ] = useState<Graph>({performance: [],date: []})

  const getContestInit = async () => {
    console.log("call getContestInit")
    try {
      const url_split: string[] = location.pathname.split('/');
      const contest_name: string = url_split[url_split.length - 1]
      const res: any = await getHistoryIndex(contest_name);
      console.log(res);
      if(res.status === 200){
        console.log(res.data);
        const pushAllHistory: History[] = [];
        res.data.map((value: History, key: number) => {
          pushAllHistory.push(value);
        })
        setAllHistory(pushAllHistory);
        console.log(allHistory)
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const handleUserPerf = async () => {
    console.log("call handleUserPerf")
    try {
      const res: any = await userHistory(location.state.contest_name,userName)
      console.log(res);
      if(res.status === 200){
        console.log("success")
        setUserRating(res.data);
        setAfterProcessData(processData(res.data))
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  const processData = (prop: User[]): Graph => {
    const returnGraph: Graph = {performance: [],date: []};
    prop.map((value: User, index: number) => {
      let heldDate!: Date;
      Object.entries(value).map((val: string[], key: number) => {
        if(val[0].indexOf("Problem") === 0 && val[1] !== null){
          heldDate = new Date(val[1]);
        }
      })
      if(heldDate !== undefined){
        returnGraph.performance.push(value.performance);
        returnGraph.date.push(`${heldDate.getMonth()}/${heldDate.getDay()}`);
      }
    })
    console.log(returnGraph)
    return returnGraph
  }
  useEffect(() => {
    getContestInit()
   },[])

  console.log("render <ContestInfo>")
  console.log(location.state)
  return (
    <div>
      <Col style={{width: "350px"}}>
        <InputGroup style={{padding: "20px 0", height: "80px"}}>
          <span style={{padding: "10px 0"}}>username : </span> 
          <Input 
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const { value }: { value : string } = e.target
              setUserName(value)
            }}
            style={{margin: "0 0 0 10px"}}/>
          <Button onClick={() => handleUserPerf()}>search</Button>
        </InputGroup>
      </Col>
      <List style={{padding:"0 0 0 20px"}}>
        {
          allHistory.map((value: History, key:number) => {
            return(key < 5 &&
              <li>{value.contest_name}{value.time.toFixed().padStart(3,"0")}</li>
            )
          })
        }
      </List>
      <List>
        {
          userRating.map((value: User, key: number) => {
            return(key < 5 && 
              <li>{value.performance}</li>
            )
          })
        }
      </List>
      {afterProcessData.date.length !== 0 &&
        <LinePlot afterProcessData = { afterProcessData } />
      }
    </div>
  )
}