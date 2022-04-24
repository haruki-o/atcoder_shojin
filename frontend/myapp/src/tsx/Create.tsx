import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import { Contest } from "../interface/index"

import { createContests } from "../api/contests"

interface createContest {
  contest: Contest
  condition: boolean
}
export const Create = () => {
  const [ contest, setContests] = useState<Contest>({ contest_name : "none" })
  const navigate = useNavigate()

  const handleCreateContest = async () => {
    try {
      const res = await createContests(contest)
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
  return (
    <div>
      <input 
        type="text" 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const { value }: { value : string } = e.target
          setContests({contest_name: value})
        }}
      />
      <button onClick={() => {
        handleCreateContest()
        navigate("/")
      }}>create</button>
    </div>
  )
}