import React, { createContext, useState } from "react";

import apiRoutes from "../apiRoutes";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [kidImages, setKidImages] = useState([]);
  const [matchingProfiles, setMatchingProfiles] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentKidProfile, setCurrentKidProfile] = useState({
    kid: {},
    photo: '',
  });

  const loginContext = (userData) => {
    setUser(userData);
  };
  const updateUserContext = (userData) => {
    setUser(userData);
  };
  const logoutContext = () => {
    setUser(null);
  };
  const emptyImages = () => {
    setKidImages([]);
  };

  const fetchMatchingProfiles = async (images,type,kidId) => {
    const formData = new FormData();
    formData.append("type",type);
    console.log(kidId);
    formData.append("kid_id",kidId);
    try {
      console.log(images.length);
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
        const response = await fetch(image);
        const blob = await response.blob();
        const fileName = image.split("/").pop(); // Extract the file name from the URI
        const fileType = blob.type; // Get the MIME type of the file

        if (
          fileType === "image/jpeg" ||
          fileType === "image/png" ||
          fileType === "image/jpg"
        ) {
          formData.append("photos", {
            uri: image,
            name: fileName,
            type: fileType,
          });
        } else {
          console.log(
            "Invalid file type. Only JPG, PNG, and JPEG images are allowed."
          );
          return;
        }
      }

      const response = await fetch(apiRoutes.getMatchingProfiles, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data)
        setMatchingProfiles(data);
      } else {
        console.error("Failed to fetch missing kids data");
      }
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the fetch request
      // ...
    }
  };
  const fetchNotifications = async () => {
    const formData = new FormData();
    formData.append("user",user.id);
    try {
      

      const response = await fetch(apiRoutes.getNotifications, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setNotifications(data);
      } else {
        console.error("Failed to fetch notification");
      }
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the fetch request
      // ...
    }
  };

  const readNotifiation = async (notification) => {
    const formData = new FormData();
    formData.append("id",notification);
    try {
      

      const response = await fetch(apiRoutes.readNotifiation, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const profile = await response.json();
 
      
        setCurrentKidProfile(profile);
        console.log('current kid profile id is'+currentKidProfile.kid.id);
      } else {
        console.error("Failed to read notification");
      }
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the fetch request
      // ...
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        loginContext,
        logoutContext,
        updateUserContext,
        kidImages,
        setKidImages,
        emptyImages,
        matchingProfiles,
        fetchMatchingProfiles,
        currentKidProfile,
        setCurrentKidProfile,
        fetchNotifications,
        notifications,
        readNotifiation,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
