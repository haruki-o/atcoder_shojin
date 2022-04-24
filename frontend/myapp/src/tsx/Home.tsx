import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <ul style={{listStyle : 'none'}}>
        <li>・トップページ</li>
        <li><Link to="/held">- held</Link></li>
        <li><Link to="/create">- create</Link></li>
        <li><Link to="/index">- index</Link></li>
        <li><Link to="/join">- join</Link></li>
      </ul>
    </div>
  )
}