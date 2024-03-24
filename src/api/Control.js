import Axios from "axios";
const url = "http://localhost:3003/"
export const Register = async (data) => {
  try {
    const response = await Axios.post(url + "user-registration", data, { withCredentials: true });
     return response;
  } catch (err) {
    throw err;
  }
};
export const userProfile = async (user) => {
  try {
      // fetch saved posts data for the current user
      const response = await Axios.get(url+`profile/${user}`);
      return response.data
  } catch (error) {
      console.error('Error fetching saved posts:', error);
      throw error;
  }
};
export const Signin = async(data) => {
  //return(data);
  try {
    const response = await Axios.post(url + "user-login", data, { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
};
export const Forgotpw = async(data)=>{
  try {
    const response = await Axios.post(url + "forgotPassword", data, { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
}
export const Recoverpw = async(data)=>{
  try {
    const response = await Axios.put(url + "forgotPassword", data, { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
}
export const Posts = async (data) => {
  if (typeof localStorage !== 'undefined') {
    let user = localStorage.getItem('userData');
    try {
      console.log( user);
      const response = await Axios.post(url + `createPost/${user}`, data, { withCredentials: true });
      return response;
    } catch (err) {
      throw err;
    }
  } else {
    console.error('localStorage is not available in this environment');
    // Handle the absence of localStorage
  }
};
export const Devices = async (data) => {
  if (typeof localStorage !== 'undefined') {
    let user = localStorage.getItem('userData');
    try {
      console.log( user);
      const response = await Axios.post(url + `addDevice/${user}`, data, { withCredentials: true });
      return response;
    } catch (err) {
      throw err;
    }
  } else {
    console.error('localStorage is not available in this environment');
    // Handle the absence of localStorage
  }
};
export const Getposts = async(data)=>{
  try {
    const response = await Axios.get(url + "getPost", data, { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
}
export const Saveposts = async(id,user)=>{
  try {
    console.log(id,user)
    const response = await Axios.post(url + "savePost", {id:id,user:user}, { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
}
export const Removeposts = async(id)=>{
  try {
    console.log(id)
    const response = await Axios.delete(url + `removePost/${id}`, { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
}
export const Updateposts = async(id,title,device,description)=>{
  try {
    console.log(id)
    const response = await Axios.put(url + `updatePost/${id}`,{title:title,device:device,description:description}, { withCredentials: true });
    return response.data;
  } catch (err) {
    throw err;
  }
}
export const fetchSavedPosts = async (userId) => {
  try {
      // fetch saved posts data for the current user
      const response = await Axios.get(url+`savedposts/${userId}`);
      return response.data
  } catch (error) {
      console.error('Error fetching saved posts:', error);
      throw error;
  }
};

export const checkIfPostIsSaved = async (postId, userId) => {
  try {
    // Fetch saved posts data for the current user
    const savedPosts = await fetchSavedPosts(userId);
    console.log(savedPosts)
    // Check if the postId exists in the saved posts data
    const isPostSaved = savedPosts.some(post => post.postId === postId);
    const myPostSaved = savedPosts.filter(post => post.postId === postId);
    console.log(myPostSaved);
    return (isPostSaved,myPostSaved);
  } catch (error) {
    console.error('Error checking if post is saved:', error);
    return false; 
  }
};
export const Comments = async(comment,user,postId)=>{
  try {
    //console.log(comment)
    const response = await Axios.post(url + "userComment", {comment:comment,user:user,postId:postId}, { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
}
export const getComments = async()=>{
  try {
    //console.log(comment)
    const response = await Axios.get(url + "getuserComment", { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
}
export const editComments = async(comment,id)=>{
  try {
    console.log(comment,id)
    const response = await Axios.put(url + "editComment", {comment:comment,id:id}, { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
}
export const deleteComments = async(id)=>{
  try {
    const response = await Axios.delete(url + `editComment/${id}`, { withCredentials: true });
    return response;
  } catch (err) {
    throw err;
  }
}