export interface Contest {
  contest_name: string
  user_name?: string
  password?: string
  perf_system?: number
}

export interface Problem {
  //abc013_d
  contest_id: string
  //1257
  difficulty: number
}

export interface History {
  contest_name: string
  id: number
  date: Date
  user_name: string
  user_rating: number
}

export interface HoldContestInfo {
  contest_info: Contest
  problems: Problem[]
}