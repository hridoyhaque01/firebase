import {getAuth,createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword} from "firebase/auth";
import { app } from "../firebase";
import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext();

export const authContext = () => {
    return useContext(AuthContext)
}


export const AuthProvider = ({children}) =>{
    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
  

    // sign up 


    const signup = async(email,password,username) =>{
        setLoading(true)
          const auth = getAuth();
         try{
            await createUserWithEmailAndPassword(auth, email,password);
            await updateProfile(auth.currentUser, {
                displayName : username
            })
            const user = auth.currentUser;
            setCurrentUser({...user})
         }catch(err){
            console.log(err)
         }
    }

    // sign in 

    const signin =(email,password) => {
        setLoading(true)
        const auth = getAuth();
        return signInWithEmailAndPassword(auth,email,password)
    }

    // sign out 

    const signout = () => {
        setLoading(true);
        const auth = getAuth();
        return signout(auth)
    }


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setCurrentUser(user);
          setLoading(false);
        });
        return unsubscribe;
      }, []);

    const value = {
        currentUser,
        loading,
        signin,
        signout,
        signup
    }

    return <AuthContext.Provider value={value}>
        {children}
    </AuthContext.Provider>
}
