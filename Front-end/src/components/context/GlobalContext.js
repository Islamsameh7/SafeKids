import React, { createContext, useState } from 'react';


export const GlobalContext = createContext();


export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [kidImages, setKidImages]= useState([]);
  const loginContext = (userData) => {
    setUser(userData);
  };

  const logoutContext = () => {
    setUser(null);
  };
  
  const emptyImages = () =>{
    setKidImages([]);
  };



  return (
    <GlobalContext.Provider value={{ user, loginContext, logoutContext,kidImages,setKidImages,emptyImages }}>
      {children}
    </GlobalContext.Provider>
  );
};
