import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Form from './components/Form'
import Home from './components/Home'
function App() {
  return (
    <Routes>
      <Route path="/create" element={<Form />} />
      <Route path="/" element={<Home />} />
    </Routes>
  )
}

export default App