import React from 'react'
import { Routes, Route, Link } from "react-router-dom"
import { Board } from '../../board'
import { NotFound } from './NotFound'

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Board />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}