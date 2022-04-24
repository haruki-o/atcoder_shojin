export interface Contest {
  contest_name: string
  user_name?: string
  password?: string
  perf_system?: number
}

export interface Problem {
  //abc
  contest_id: string
  //Ignore Operations
  title: string
  //A
  problem_index: string
  //1257
  difficulty: number
}
