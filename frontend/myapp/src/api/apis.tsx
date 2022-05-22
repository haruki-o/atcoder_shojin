import axios from 'axios'

const base = axios.create({
  baseURL: "https://atcoder-shojin-api.herokuapp.com/",
})

export const getProblems = () => {
  return base.get('/apis')
}
