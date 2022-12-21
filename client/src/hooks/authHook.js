import { useCallback, useEffect, useState } from "react";

const storageName = 'userData';

export const useAuth = () => {
  const  [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  //Ready state is used to flag when useEffect is completed. 
  //This is needed to prevent loading routes before the useEffect confirms if user is athorized
  const [ready, setReady] = useState(false);
  
  const login = useCallback((jwtToken, id) => {
      setToken(jwtToken);
      setUserId(id);
      
      localStorage.setItem(storageName, JSON.stringify({token: jwtToken, userId: id}))
    }, []);
    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        
        localStorage.removeItem(storageName)
    }, []);
    
    useEffect(()=>{
      const storedData = JSON.parse(localStorage.getItem(storageName));
  
      if(storedData && storedData.token) {
          login(storedData.token, storedData.userId)
      }

      setReady(true);
    }, [login])

  return { login, logout, token, userId, ready };
};
