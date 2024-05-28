import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css'
import Layout from './components/Layout'
import ViewPage from './pages/View'
import UploadPage from "./pages/Upload"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<UploadPage />} />
          <Route path="/view/:id" element={<ViewPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
