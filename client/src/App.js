import { BrowserRouter, Routes, Route } from "react-router-dom"
import Game from "./pages/Game"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Leaderboard from "./pages/Leaderboard"

function App() {

return (

<BrowserRouter>

<Routes>

<Route path="/" element={<Game />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/leaderboard" element={<Leaderboard />} />

</Routes>

</BrowserRouter>

)

}

export default App