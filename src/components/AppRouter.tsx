import { BrowserRouter, Route, Routes } from "react-router-dom";
import CampingPage from "../pages/CampingPage";
import AdminPage from "../pages/AdminPage";
import RegisterForm from "../auth/RegisterForm";
import AdminLoginFrom from "../auth/AdminLoginForm";
import GetCode from "../pages/GetCode";
import { config } from "../config";
import Test from "../test/test";
export default function AppRouter(){
  const baseUrl = config.baseUrl;
    return(
        <BrowserRouter>
    <Routes>
    <Route path='/test' element={<Test />} />

      <Route path={`${baseUrl}/camping`} element={<CampingPage />} />
      <Route path={`${baseUrl}/:key/register`} element={<RegisterForm />} /> {/* BC/register */} {/* get token */}
      <Route path={`${baseUrl}/get-code`} element={<GetCode />} /> {/* need token */} {/* click and generate code*/}
      <Route path={`${baseUrl}/camping/admin/login`} element={<AdminLoginFrom />} /> 
      <Route path={`${baseUrl}/camping/admin`} element={<AdminPage />} /> {/* need token */} {/* click and generate code*/}
    </Routes>
  </BrowserRouter>
    )
} 
