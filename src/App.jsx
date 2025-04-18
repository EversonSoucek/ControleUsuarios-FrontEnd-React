import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./presentation/pages/HomePage"
import UsuarioFormPage from "./presentation/pages/UsuarioFormPage"
import CadastraUsuarioPage from "./presentation/pages/CadastraUsuarioPage"
import EditarUsuarioPage from "./presentation/pages/EditarUsuarioPage"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cadastraUsuario" element={<CadastraUsuarioPage />} />
        <Route path="/editaUsuario/:idUsuario" element={<EditarUsuarioPage />} />
      </Routes>
    </Router>
  )
}

export default App
