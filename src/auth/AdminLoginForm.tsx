import { useState } from "react";
import { LoginUser } from "../type/user";
import { Box, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import { config } from "../config";

export default function AdminLoginFrom(){
    const navigate  = useNavigate();
    const baseUrl = config.baseUrl;

    const [user, setUser] = useState<LoginUser>({
        email:"",
        password:"",
      });
      const Login = async() => {
        if (user.email && user.password.length >= 6) {
            await signInWithEmailAndPassword(auth, user.email, user.password)
          console.log("user login successfully!")
          return navigate(`/${baseUrl}/camping/admin`)
        }else {
          console.log("user required")
      console.log("auth", auth)

        }
      }  
    return(

      <div className="register-container">
      <div className="register-form">
        <h1>Login</h1>
      
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <TextField

type="email"
          placeholder="jane@framer.com"

          sx={ {width:"100%"}}
          size="small"
          className="form-group"
          onChange={(e) => setUser({...user, email:e.target.value})}
        />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <TextField

          placeholder="please type at least 6 characters"
          type="password"
          sx={ {width:"100%"}}
          size="small"
          className="form-group"
          onChange={(e) => setUser({...user, password:e.target.value})}
        />
        </div>
        <button className="submit" onClick={Login}>Login</button>
      </div>
    </div>
    )
}