import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"
import { HoldContestInfo } from '../interface/index';


import { createContests } from "../api/contests"

interface DateFormProps {
  holdContest: HoldContestInfo
}

export const DateForm: React.FC<DateFormProps> = () => {
  console.log("render <DateForm>")
  return (
    <div>
      data form
    </div>
  )
}