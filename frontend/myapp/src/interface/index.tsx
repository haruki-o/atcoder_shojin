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
  id: number
  date: Date
  user_name: string
  user_rating: number
}

export interface HoldContestInfo {
  contest_info: Contest
  problems: Problem[]
}