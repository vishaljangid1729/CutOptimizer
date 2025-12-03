import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '../pages/Home'
import { Solution } from '../pages/Solution'
import { ManualEntry } from '../pages/ManualEntry'
import { CSVEntry } from '../pages/CSVEntry'

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/manual" element={<ManualEntry />} />
        <Route path="/csv-entry" element={<CSVEntry />} />
        <Route path="/solution" element={<Solution />} />
      </Routes>
    </BrowserRouter>
  )
}
