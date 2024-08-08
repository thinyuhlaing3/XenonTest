import { useState } from "react";
import { LoginUser } from "../type/user";
import { Box, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export default function AdminLoginFrom(){
    const navigate  = useNavigate();

    const [user, setUser] = useState<LoginUser>({
        email:"",
        password:"",
      });
      const Login = async() => {
        if (user.email && user.password.length >= 6) {
            await signInWithEmailAndPassword(auth, user.email, user.password)
          console.log("user login successfully!")
          navigate("/camping/admin");
        }else {
          console.log("user required")
      console.log("auth", auth)

        }
      }  
    return(

        <Box className="signIn_container">
        <Box className=" signIn_card">
          <Typography variant="h5" className="text-light-text text-center">
             Register
          </Typography>
          <TextField
            required
            id="outlined-basic"
            label="Name"
            variant="outlined"
            className="text-field"
            type="name"
            size="small"
            
          />
          <TextField
            required
            id="outlined-basic"
            label="Email"
            variant="outlined"
            className="text-field"
            type="email"
            size="small"
            onChange={(e) => setUser({...user, email:e.target.value})}
  
          />
          <TextField
            required
            id="outlined-basic"
            label="Password"
            placeholder="please type at least 6 characters"
            variant="outlined"
            className="text-field"
            type="password"
            size="small"
            onChange={(e) => setUser({...user, password:e.target.value})}
          />
          <Box className="gap-2 flex flex-col">
            <button
              className="button"
              // onClick={() => navigate("/get-code")}
            onClick={Login}
            >
             Login
            </button>
          </Box>
      
        </Box>
      </Box>
    )
}