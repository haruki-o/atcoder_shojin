import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <ul style={{listStyle : 'none'}}>
        <li style={{margin: "10px 0"}}>・トップページ</li>
        <li><Link to="/held">・ held</Link></li>
        <li style={{margin: "10px 0"}}><Link to="/create">・ create</Link></li>
        <li><Link to="/index">・ index</Link></li>
        <li style={{margin: "10px 0"}}><Link to="/join">・ join</Link></li>
      </ul>
    </div>
  )
}