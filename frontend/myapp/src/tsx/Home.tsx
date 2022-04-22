import React from "react"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export const Home = () => {
  return (
    <div>
      <ul style={{listStyle : 'none'}}>
        <li>・トップページ</li>
        <li><Link to="/held">- index</Link></li>
        <li><Link to="/create">- consest index</Link></li>
        <li><Link to="/index">- consest index</Link></li>
        <li><Link to="/join">- consest index</Link></li>
      </ul>
    </div>
  )
}