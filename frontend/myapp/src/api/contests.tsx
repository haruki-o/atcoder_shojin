import axios from "axios"
import { Contest } from "../interface/index"
import { Problem, HoldContestInfo } from '../interface/index';


const base = axios.create({
  baseURL: "http://localhost:8080"
})

export const getContests = () => {
  return base.get("/contests")
}

export const createContests = (date : Contest) => {
  return base.post("/contests", date);
}

export const holdContests = (data: HoldContestInfo) => {
  const addProblem: Problem = {contest_id: "null", difficulty: 0}
  for (let i: number = data.problems.length; i < 10; i++) {
    data.problems.push(addProblem);
  }
  console.log(data);
  return base.post("/history", data);
}

export const updateContestTime = (contest_name: string) => {
  return base.patch("/contests", contest_name);
}

export const getContestInfo = (contest: Contest) =>{
  return base.get(`/contest_page/${contest.contest_name}/${contest.time}`)
}