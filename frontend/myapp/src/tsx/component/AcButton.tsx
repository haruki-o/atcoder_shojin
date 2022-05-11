import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Button, Col, Label, InputGroup, Input } from 'reactstrap';

interface AcButtonProps{
  handleAC: Function
  index: number
}

export const AcButton: React.FC<AcButtonProps> = ({ handleAC, index }) => {
  console.log(index)
  return (
    <Button style={{
        height: "15px",
        width: "20px",
        margin: "0 0 0 0",
        padding: "0 0 0 0",
        fontSize: "2px",
        textAlign: "center",
        verticalAlign: "middle",
        borderRadius: "4px",
        backgroundColor: "#5CB85C",
        border: "none"
      }}
      onClick = {() => {handleAC(index)}}
    >
      AC
    </Button>
  )
}