import React from "react"
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

export const NavigationBar = () => {
  return (
    <nav>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/index'>index</NavLink>
      <NavLink to='/held'>held</NavLink>
    </nav>
  )
}