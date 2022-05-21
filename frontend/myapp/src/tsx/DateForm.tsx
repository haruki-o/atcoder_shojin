import React, { useState, useEffect } from 'react';
import { HoldContestInfo } from '../interface/index';



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