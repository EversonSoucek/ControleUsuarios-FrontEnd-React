import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./presentation/pages/HomePage"
import CadastraUsuarioPage from "./presentation/pages/CadastraUsuarioPage/CadastraUsuarioPage"
import EditarUsuarioPage from "./presentation/pages/EditarUsuarioPage"
import NotFoundPage from "./presentation/pages/NotFoundPage"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastraUsuario" element={<CadastraUsuarioPage />} />
        <Route path="/editaUsuario/:idUsuario" element={<EditarUsuarioPage />} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </Router>
  )
}

export default App
