import Axios from "axios";
const url = "http://localhost:3003/"
export const Register = async (data) => {
  try {
    const response = await Axios.post(url + "user-registration", data, { withCredentials: true });
    return response.data.msg;
  } catch (err) {
    throw err;
  }
};

export const Signin = async(data) => {
  //return(data);
  try {
    const response = await Axios.post(url + "user-login", data, { withCredentials: true });
    return response.data.msg;
  } catch (err) {
    throw err;
  }
};