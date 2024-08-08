import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser } from "../type/user";
import { FirebaseError } from 'firebase/app'; // Make sure you import FirebaseError if necessary

import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
export default function RegisterForm(){
  const navigate  = useNavigate();
 
const [user, setUser] = useState<LoginUser>({
  email:"",
  password:"",
});

const SignUp = async() => {
  if (user.email && user.password.length >= 6) {
    await createUserWithEmailAndPassword(auth, user.email, user.password)
    console.log("user created successfully!")
    navigate("/get-code");
  }else {
    console.log("user required")
  }
}  



const logOut = async () => {
    await signOut(auth);
    
};
const signInOrSignUp =  async()  =>{
  if (user.email && user.password.length >= 6) {
    // Email not registered, create a new account
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      console.log("Account created successfully:", userCredential.user);
    } catch (error  ) {
      if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
        
        console.log("Unexpected: Email already in use, attempting to sign in instead.");
        const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
        console.log("Signed in successfully:", userCredential.user);
      } 
    }
  } 
}

console.log("users", auth.currentUser?.email)
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
          onClick={signInOrSignUp}
          >
           register
          </button>
        </Box>
        <Box className="gap-2 flex flex-col" >
          <button
            className="button"
          >
            Login with Google
          </button>
        </Box>
        <Box className="gap-2 flex flex-col" >
          <button
            className="button"
            onClick={logOut}
          >
            Login out
          </button>
        </Box>
      </Box>
    </Box>

    )
}