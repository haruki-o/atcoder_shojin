import axios from "axios"
import { Contest } from "../interface/index"
import { Problem, HoldContestInfo, User } from '../interface/index';


const base = axios.create({
  baseURL: "http://localhost:8080"
})


// "/contests"
export const getContests = () => {
  return base.get("/contests")
}

export const createContests = (date : Contest) => {
  return base.post("/contests", date);
}

export const updateContestTime = (contest_name: string) => {
  return base.patch("/contests", contest_name);
}

// "/users"
export const joinUser = (user: User) => {
  return base.post(`/contest_page/${user.contest_name}/${user.time}/${user.user_name}`, user);
}
export const joiningUser = (contest_name: string, time: number) => {
  return base.get(`/contest_page/user/${contest_name}/${time}`)
}
export const updateUserAC = (user: User, problem: string, ACDate: Date) => {
  return base.patch(`/contest_page/user/update`, {user, problem, ACDate})
}
// "/histries"
export const holdContests = (data: HoldContestInfo) => {
  const addProblem: Problem = {contest_id: "null", difficulty: 0}
  for (let i: number = data.problems.length; i < 10; i++) {
    data.problems.push(addProblem);
  }
  console.log(data);
  return base.post("/history", data);
}

export const getContestInfo = (contest: Contest) =>{
  return base.get(`/contest_page/${contest.contest_name}/${contest.time}`)
}

export const getHistoryIndex = (contest_name: string) => {
  return base.get(`/history/${contest_name}`);
}
