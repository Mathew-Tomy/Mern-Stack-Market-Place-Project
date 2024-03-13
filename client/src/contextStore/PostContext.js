// PostContext.js for managing state

import React, { createContext, useState } from 'react';

export const PostContext = createContext();

const ContextPost = ({ children }) => {
  // Your post-related logic here
  const[postContent,setPostContent]=useState([])

  // Return the provider with value prop
  return (
    <PostContext.Provider value={{ postContent, setPostContent }}>
      {children}
    </PostContext.Provider>
  );
};

export default ContextPost;
