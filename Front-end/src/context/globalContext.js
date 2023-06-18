import React, { useState, useEffect, useRef, createContext} from "react";


const Context = createContext()

const Provider = ( { children } ) => {

  const [ domain, setDomain ] = useState("https://9c18-102-41-240-254.eu.ngrok.io")
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ userName, setUserName ] = useState()
 

  const setToken = async (token) => {
    await SecureStore.setItemAsync('token', token);
  }

  

  const globalContext = {
    domain,
    isLoggedIn,
    setIsLoggedIn,
    userName,
    setUserName,
    setToken,
  }

  return <Context.Provider value={globalContext}>{children}</Context.Provider>

};

export { Context, Provider };