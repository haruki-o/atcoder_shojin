import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'reactstrap'

interface AcButtonProps {
  handleAC: any
  index: number
}

export const AcButton: React.FC<AcButtonProps> = ({ handleAC, index }) => {
  return (
    <Button
      style={{
        height: '15px',
        width: '20px',
        margin: '0 0 0 0',
        padding: '0 0 0 0',
        fontSize: '2px',
        textAlign: 'center',
        verticalAlign: 'middle',
        borderRadius: '4px',
        backgroundColor: '#5CB85C',
        border: 'none',
      }}
      onClick={() => {
        handleAC(index)
      }}
    >
      AC
    </Button>
  )
}
