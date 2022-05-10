import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { List, Table, Button, Col, Label, InputGroup, Input } from 'reactstrap';

import { Contest, History } from "../interface/index"

import { getHistoryIndex } from "../api/contests"
import { url } from "inspector";

interface ContestInfoProps {
}

export const ContestInfo: React.FC<ContestInfoProps> = () => {
  const location: any = useLocation();
  const navigate = useNavigate();
  const [allHistory, setAllHistory] = useState<History[]>([])

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

  useEffect(() => {
    getContestInit()
   },[])

  console.log("render <ContestInfo>")
  return (
    <div>
      <List>
        {
          allHistory.map((value: History, key:number) => {
            return(
              <li>{value.contest_name}{value.time}</li>
            )
          })
        }
      </List>
    </div>
  )
}