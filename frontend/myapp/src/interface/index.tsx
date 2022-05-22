export interface Contest {
  contest_name: string
  password?: string
  time?: number
  startDate?: string
  startHour?: number
  startMinute?: number
  endDate?: string
  endHour?: number
  endMinute?: number
}

export interface Problem {
  //abc013_d
  contest_id: string
  //1257
  difficulty: number
}

export interface History {
  contest_name: string
  time: number
  start_date: Date
  end_date: Date
  problems?: string[]
}

export interface HoldContestInfo {
  contest_info: Contest
  problems: Problem[]
}

export interface User {
  contest_name: string
  time: number
  user_name: string
  performance: number
  WA?: number
  ProblemA?: Date
  ProblemB?: Date
  ProblemC?: Date
  ProblemD?: Date
  ProblemE?: Date
  ProblemF?: Date
  ProblemG?: Date
  ProblemH?: Date
  ProblemI?: Date
  ProblemJ?: Date
}

export interface Graph {
  performance: number[]
  date: string[]
}
