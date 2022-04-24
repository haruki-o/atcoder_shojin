import axios from "axios"

const base = axios.create({
  baseURL: "https://kenkoooo.com/atcoder/resources/"
})

export const getEstimatedDifficulties = () => {
  return base.get("/problem-models.json")
}

export const getProblems = () => {
  return base.get("/problems.json")
}
