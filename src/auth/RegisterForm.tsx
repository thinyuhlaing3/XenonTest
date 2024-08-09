
import { Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import {  RegisterUser, User } from "../type/user";
import { FirebaseError } from 'firebase/app'; // Make sure you import FirebaseError if necessary
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { config } from "../config";
import { red } from "@mui/material/colors";
export default function RegisterForm(){
  const currentUser = auth.currentUser;
  const baseUrl = config.baseUrl;
  const navigate  = useNavigate();
  const [required , setRequired] = useState(false)

  const [emailError , setEmailError] = useState(false)
  const [passwordError , setPasswordError] = useState(false)

  const { key } = useParams();
 console.log("key", key)
const [user, setUser] = useState<User>({
  id:0,
  name:"",
  email:"",
  password:"",
  code:""
});

// onAuthStateChanged(auth, (currentUser) => {
//   if (currentUser) {
//     return navigate(`/${baseUrl}/${key}/get-code`)
//  }
// });
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





function generateUserCode(id :number, key: string) {
  if (id <= 1500){
  const idString = id.toString().padStart(4, '0'); // Ensures the ID is zero-padded to 4 digits
  const randomString = generateRandomString(); // Generates a random string
  const code = `xenon-${randomString}-${key.toUpperCase()}-${idString}`;
  console.log("code", code)
  return code;
}else{
  console.log("limited time out, can't generate code")
}
}

function generateRandomString(length = 5) {
  const chars = 'adeghijklmnoqrstuvwxyz0123456789ADEGHIJKLMNOQUSTUVWXYX';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}
async function createAnewUser(key : string) {
  

  const usersCollection = collection(db, "user");
  const userSnapshot = await getDocs(usersCollection);
  const users = userSnapshot.docs.map(doc => ({
    ...doc.data() as User
  })).filter((user) => user.code.split("-")[2] === key.toUpperCase())
  console.log("alluser", users)

    const newId =users.length ?  users.length  + 1: 1;
 console.log("newID", newId)

    const newName = user.name
    const newEmail = user.email
    const newCode = generateUserCode(newId,key)
    const newUser = {  id: newId,
      username: newName,
      email: newEmail,
      code: newCode}
      console.log("newUser", newUser)
   const addUser =  await addDoc(usersCollection, newUser);
   console.log("newUser", newUser)
   return navigate(`/${baseUrl}/${key}/get-code`)

  return addUser

}

const register =  async()  =>{
  console.log("click")
  setRequired(false) 
  setEmailError(false)
  setPasswordError(false) 
  if (user.email && user.password.length >= 6 ) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password);
      key && createAnewUser(key);
      
      console.log("created account successfully")
    
    } catch (error) {
      if (error instanceof FirebaseError && error.code === 'auth/email-already-in-use') {
        const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
        console.log("login account successfully")
   return navigate(`/${baseUrl}/${key}/get-code`)
        
      
      } 
      setEmailError(true)
    }
  } else{

    if (!user.email  && user.password.length < 6  ) return setRequired(true) 
    
    
    if (!user.email ) return setEmailError(true) 
      if (user.password.length < 6 ) return setPasswordError(true)

  }
}

console.log("user", user)

    return(
      <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <TextField
          placeholder="Jane Smith"

          sx={ {width:"100%"}}
          size="small"
          className="form-group"
          onChange={(e) => setUser({...user, name:e.target.value})}
        />
        </div>
      
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <TextField
error={emailError || required}
helperText={emailError || required ? "Please enter a valid email" : "" }

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
error={passwordError || required}
helperText={passwordError || required ? "Please enter a password" : "" }

          placeholder="please type at least 6 characters"
          type="password"
          sx={ {width:"100%"}}
          size="small"
          className="form-group"
          onChange={(e) => setUser({...user, password:e.target.value})}
        />
        </div>
        <button className="submit" onClick={register}>Register</button>
        <button className="submit" onClick={logOut}>Logout</button>

      </div>
    </div>
    // <Box className="signIn_container">
    //   <Box className=" signIn_card">
    //     <Typography variant="h5" className="text-light-text text-center">
    //        Register
    //     </Typography>
    //     <TextField
    //       required
    //       id="outlined-basic"
    //       label="Name"
    //       variant="outlined"
    //       className="text-field"
    //       type="name"
    //       size="small"
          
    //     />
    //     <TextField
    //       required
    //       id="outlined-basic"
    //       label="Email"
    //       variant="outlined"
    //       className="text-field"
    //       type="email"
    //       size="small"
    //       onChange={(e) => setUser({...user, email:e.target.value})}

    //     />
    //     <TextField
    //       required
    //       id="outlined-basic"
    //       label="Password"
    //       placeholder="please type at least 6 characters"
    //       variant="outlined"
    //       className="text-field"
    //       type="password"
    //       size="small"
    //       onChange={(e) => setUser({...user, password:e.target.value})}
    //     />
    //     <Box className="gap-2 flex flex-col">
    //       <button
    //         className="button"
    //         // onClick={() => navigate("/get-code")}
    //       onClick={register}
    //       >
    //        register
    //       </button>
    //     </Box>
    //     <Box className="gap-2 flex flex-col" >
    //       <button
    //         className="button"
    //       >
    //         Login with Google
    //       </button>
    //     </Box>
    //     <Box className="gap-2 flex flex-col" >
    //       <button
    //         className="button"
    //         onClick={logOut}
    //       >
    //         Login out
    //       </button>
    //     </Box>
    //   </Box>
    // </Box>

    )
}