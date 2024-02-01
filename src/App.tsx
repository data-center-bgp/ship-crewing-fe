import "./App.css";
import LayoutAttendance from "./pages/LayoutAttendance";
import Login from "./pages/Login";
import { BrowserRouter as Router, Route, Routes, } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/attendance" element={<PrivateRoute><LayoutAttendance /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
