import React from 'react'
import { NavLink } from 'react-router-dom'

export const NavigationBar = () => {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#CCFFFF', textDecoration: 'none' }}>
      <NavLink to="/" style={{ color: 'black', textDecoration: 'none' }}>
        Home
      </NavLink>
      <NavLink to="/index" style={{ margin: '0 10px', color: 'black', textDecoration: 'none' }}>
        index
      </NavLink>
      <NavLink to="/held" style={{ color: 'black', textDecoration: 'none' }}>
        held
      </NavLink>
      <NavLink to="/create" style={{ margin: '0 10px', color: 'black', textDecoration: 'none' }}>
        create
      </NavLink>
    </nav>
  )
}
