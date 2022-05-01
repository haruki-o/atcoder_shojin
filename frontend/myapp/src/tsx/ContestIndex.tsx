import React, { useState } from "react"

import { Contest } from "../interface/index"

import { getContests} from "../api/contests"

interface ContestsProps {
  Contests: Contest[]
}

export const ContestIndex: React.FC = () => {
  return (
    <div>
      ContestIndex
    </div>
  )
}