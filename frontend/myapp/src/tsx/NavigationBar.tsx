import React from "react"
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/index' style={{margin: "0 10px"}}>index</NavLink>
      <NavLink to='/held'>held</NavLink>
      <NavLink to='/create' style={{margin: "0 10px"}}>create</NavLink>
    </nav>
  )
}