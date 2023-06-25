import React, { createContext, useState } from "react";

import apiRoutes from "../apiRoutes";
export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [kidImages, setKidImages] = useState([]);
  const [matchingProfiles, setMatchingProfiles] = useState([]);

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
  const fetchMatchingProfiles = async (image) => {
    const formData = new FormData();
    try {
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();

        const fileName = image.split("/").pop(); // Extract the file name from the URI

        const fileType = blob.type; // Get the MIME type of the file

        if (
          fileType === "image/jpeg" ||
          fileType === "image/png" ||
          fileType === "image/jpg"
        ) {
          formData.append("photo", {
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
