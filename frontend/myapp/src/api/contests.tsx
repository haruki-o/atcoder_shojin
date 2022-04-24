import axios from "axios"
import { Contest } from "../interface/index"

const base = axios.create({
  baseURL: "http://localhost:8080"
})

export const getContests = () => {
  return base.get("/contests")
}

export const createContests = (date : Contest) => {
  return base.post("/contests", date);
}