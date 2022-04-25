export interface Contest {
  contest_name: string
  user_name?: string
  password?: string
  perf_system?: number
}

export interface Problem {
  //abc013
  contest_id: string
  //1257
  difficulty: number
}
