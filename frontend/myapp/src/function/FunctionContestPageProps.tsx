
import React, { useState, useEffect } from 'react';
import '../css/App.css';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import axios from "axios";

import { Problem, Contest, HoldContestInfo } from "../interface/index"

import { getProblems } from '../api/apis';
import { getContests} from "../api/contests"


const allProblems : Problem[] = []

export const getAllProblems = async () => {
  try {
    const res: any = await getProblems()
    console.log(res);
    if(res.status === 200){
      console.log("get allProblem success!")
      for(const key of Object.keys(res.data)){
      const diff: number = res.data[key].diff
      const id: string = res.data[key].contestId
      if(id == undefined || diff == undefined)continue;
      const addProblem: Problem = {contest_id: id, difficulty: diff}
      allProblems.push(addProblem)
      }
      console.log(allProblems)
      return allProblems;
    }
  }
  catch (err) {
    console.log(err)
  }
}

export const FunctionContestPageProps = () => {
  getAllProblems()
}