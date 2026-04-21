import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Form from './components/Form'
function App() {
  return (
    <Routes>
      <Route path="/create" element={<Form />} />
    </Routes>
  )
}

export default App