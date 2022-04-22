import axios from "axios"

const base = axios.create({
  baseURL: "http://localhost:8080"
})

export const getContests = () => {
  return base.get("/contests")
}