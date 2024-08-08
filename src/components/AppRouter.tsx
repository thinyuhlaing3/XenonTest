import { BrowserRouter, Route, Routes } from "react-router-dom";
import CampingPage from "../pages/CampingPage";
import AdminPage from "../pages/AdminPage";
import RegisterForm from "../auth/RegisterForm";
import AdminLoginFrom from "../auth/AdminLoginForm";
import GetCode from "../pages/GetCode";
export default function AppRouter(){
    return(
        <BrowserRouter>
    <Routes>
      <Route path="/camping" element={<CampingPage />} />
      <Route path="/:key/register" element={<RegisterForm />} /> {/* BC/register */} {/* get token */}
      <Route path="/get-code/" element={<GetCode />} /> {/* need token */} {/* click and generate code*/}
      <Route path="/camping/admin/login" element={<AdminLoginFrom />} /> 
      <Route path="/camping/admin" element={<AdminPage />} /> {/* need token */} {/* click and generate code*/}
    </Routes>
  </BrowserRouter>
    )
} 
