import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Contest } from "../interface/index"

import { createContests, getContests } from "../api/contests"

interface createContest {
  contest: Contest
  condition: boolean
}
export const Create = () => {
  const [ contest, setContests] = useState<Contest>({ contest_name : "none", time : 1 })
  const [ allContests, setAllContest ] = useState<Contest[]>([])
  const [ isSame, setIsSame ] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleCreateContest = async () => {
    try {
      const res: any = await createContests(contest);
      console.log(res.data);
      
      if(res.status === 200){
        console.log("create success!")
        console.log(res.data)
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  const checkCreateContest = () => {
    let isSameJudge: boolean = false;
    allContests.map((value:Contest, key:number) => {
      if(value.contest_name === contest.contest_name){
        console.log("same")
        isSameJudge = true
      }
    })
    if(!isSameJudge){
      handleCreateContest()
      navigate("/")
    }
    else{
      setIsSame(true)
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
        setAllContest(pushAllContests)
        console.log(allContests);
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    getAllContests();
  },[])
  return (
    <div style={{padding: "20px"}}>
      <input 
        type="text" 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { value }: { value : string } = e.target
          setContests({contest_name: value, time: 1})
        }}
      />
      <button onClick={() => {
        checkCreateContest();
      }}>create</button>
      {isSame && 
        <p>同じ名前のコンテストが存在します</p>
      }
      
    </div>
  )
}