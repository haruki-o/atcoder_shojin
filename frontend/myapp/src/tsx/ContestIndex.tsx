import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Col, Label, InputGroup, Input } from 'reactstrap';

import { Contest, History } from "../interface/index"

import { getContests, getHistoryIndex } from "../api/contests"

interface ContestIndexProps {
  allContests: Contest[]
}

export const ContestIndex: React.FC<ContestIndexProps> = ({ allContests }) => {
  const location: any = useLocation();
  const navigate = useNavigate();

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
          navigate(
            `/contest_page/${contest_name}/${holdTime}`,
            {state: {
              contest_name: contest_name, time: holdTime,
              start_date: sta_date, end_date: en_date,
            }}
          )
        }
      }
    }
    catch (err) {
      console.log(err);
    }
  }
  console.log("render <ContestIndex>")
  return (
    <div style={{padding: "10px"}}>
      ContestIndexEE
      {
        allContests.map((value: Contest, key: number) => {
          return(
            <div style={{padding: "10px 0"}}>
              <span style = {{padding : "0 10px 0 0"}}>{value.contest_name}</span>
              <Button 
                onClick={() => {
                  navigate(`/contest_info/${value.contest_name}`)
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
      }
    </div>
  )
}