import React, { useState } from "react"

import { Contest } from "../interface/index"

import { getContests} from "../api/contests"

interface ContestsProps {
  Contests: Contest[]
}

export const ContestsIndex: React.FC<ContestsProps> = ({Contests}) => {
  return (
    <div>
      <h1>a</h1>
      <h2>{Contests[0].contest_name}</h2>
    </div>
  )
}