import axios from "axios"
import { Contest } from "../interface/index"
import { HoldContestInfo } from '../interface/index';


const base = axios.create({
  baseURL: "http://localhost:8080"
})

export const getProblems = () => {
  return base.get("/apis")
}
