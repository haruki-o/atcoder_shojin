import React, { useState, useEffect } from 'react';
import { Col, Label, Row , Input, InputGroup } from 'reactstrap';
import { Range } from 'immutable';

import { Contest } from "../interface/index"
import { Problem } from "../interface/index"
import { HoldContestInfo } from '../interface/index';
import { stat } from 'fs';


interface DecideDateProps {
  holdContestInfo: HoldContestInfo
  setHoldContestInfo: Function
}


export const DecideDate: React.FC<DecideDateProps> = ({holdContestInfo, setHoldContestInfo }) => {
  const setInitialDate = () => {
    const today: Date = new Date();
    const yyyy = today.getFullYear();
    const mm = ("0"+(today.getMonth()+1)).slice(-2);
    const dd = ("0"+today.getDate()).slice(-2);
    setHoldContestInfo((prev: HoldContestInfo) => ({
      contest_info:{
        ...holdContestInfo.contest_info,
        startDate: `${yyyy}-${mm}-${dd}`,
        startMinute: (today.getMinutes() - today.getMinutes() % 5 + 5) % 60,
        startHour: (today.getMinutes() - today.getMinutes() % 5 + 5) % 60 === 0 ? today.getHours() + 1 : today.getHours(),
        endDate: mm == "23" ? `${yyyy}-${mm}-00` : `${yyyy}-${mm}-${dd}`,
        endHour: ((today.getMinutes() - today.getMinutes() % 5 + 5) % 60 === 0 ? today.getHours() + 1 : today.getHours() + 1) % 24,
        endMinute: (today.getMinutes() - today.getMinutes() % 5 + 5) % 60
      },
      problems: prev.problems
    }))
  }

  useEffect(() =>{
    setInitialDate();
  }, [])
  console.log("<DecideDate>")
  console.log(holdContestInfo)
  return (
    <div>
      <Row>
        <Col>
          <Label>Start Time</Label>
          <InputGroup>
            <Input
              type="date"
              value={holdContestInfo.contest_info.startDate}
              onChange={(e): void => setHoldContestInfo({
                ...holdContestInfo,
                contest_info:{
                  ...holdContestInfo.contest_info,
                  startDate: e.target.value}})}
            />
            <Input
              type="select"
              value={holdContestInfo.contest_info.startHour}
              onChange={(e): void => setHoldContestInfo({
                ...holdContestInfo,
                contest_info:{
                  ...holdContestInfo.contest_info,
                  startHour: Number(e.target.value)}})}
            >
              {Range(0, 24).map((i) => (
                <option key={i} value={i}>
                  {i.toFixed().padStart(2, "0")}
                </option>
              ))}
            </Input>
            <Input
              type="select"
              value={holdContestInfo.contest_info.startMinute}
              onChange={(e): void => setHoldContestInfo({
                ...holdContestInfo,
                contest_info:{
                  ...holdContestInfo.contest_info,
                  startMinute: Number(e.target.value)}})}
            >
              {Range(0, 60, 5).map((i) => (
                <option key={i} value={i}>
                  {i.toFixed().padStart(2, "0")}
                </option>
              ))}
            </Input>
          </InputGroup>
        </Col>
      </Row>

      <Row>
        <Col>
          <Label>End Time</Label>
          <InputGroup>
            <Input
              type="date"
              value={holdContestInfo.contest_info.endDate}
              onChange={(e): void => setHoldContestInfo({
                ...holdContestInfo,
                contest_info:{
                  ...holdContestInfo.contest_info,
                  endDate: e.target.value}})}
            />
            <Input
              type="select"
              value={holdContestInfo.contest_info.endHour}
              onChange={(e): void => setHoldContestInfo({
                ...holdContestInfo,
                contest_info:{
                  ...holdContestInfo.contest_info,
                  endHour: Number(e.target.value)}})}
            >
              {Range(0, 24).map((i) => (
                <option key={i} value={i}>
                  {i.toFixed().padStart(2, "0")}
                </option>
              ))}
            </Input>
            <Input
              type="select"
              value={holdContestInfo.contest_info.endMinute}
              onChange={(e): void => setHoldContestInfo({
                ...holdContestInfo,
                contest_info:{
                  ...holdContestInfo.contest_info,
                  endMinute: Number(e.target.value)}})}
            >
              {Range(0, 60, 5).map((i) => (
                <option key={i} value={i}>
                  {i.toFixed().padStart(2, "0")}
                </option>
              ))}
            </Input>
          </InputGroup>
        </Col>
      </Row>
    </div>
  )
}