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
export const userHistory = (contest_name: string,user_name: string) => {
  return base.get(`/users/history/${contest_name}/${user_name}`)
}
// "/histries"
export const holdContests = async (data: HoldContestInfo) => {
  const addProblem: Problem = {contest_id: "null", difficulty: 0}
  const pushProblem: Problem[] = []
  for (let i: number = data.problems.length; i < 10; i++) {
   pushProblem.push(addProblem);
  }
  const new_data: HoldContestInfo = {
    contest_info: data.contest_info,
    problems: data.problems.concat(pushProblem)
  } 
  console.log(new_data);
  return base.post("/history", new_data);
}

export const getContestInfo = (contest_name: string, time: number) =>{
  return base.get(`/contest_page/${contest_name}/${time}`)
}

export const getHistoryIndex = (contest_name: string) => {
  return base.get(`/history/${contest_name}`);
}
