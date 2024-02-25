import React, { useEffect } from 'react'
import {useFormik} from "formik"
import { Forgotpw } from '../../api/Control'
import { Link,useNavigate } from 'react-router-dom';
import * as yup from "yup"
const validate = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email Required!!!")
  })
export default function Forgotpassword() {
  const navigate = useNavigate();
  const emailValidation = sessionStorage.getItem('fwpeValidation')
  let user = localStorage.getItem('userData');
  const formik = useFormik({
    initialValues:{
      email:""
    },
    validationSchema:validate,
    onSubmit : async(values,{setSubmitting,setErrors})=>{
      let returnData = await Forgotpw(values);
      if(returnData.data.errMsg1){
        setErrors({ email: returnData.data.errMsg1 });
      }
      else{
        setSubmitting(false);
        sessionStorage.setItem('fwpeValidation',returnData.data.msg)
        navigate('/recover-password')
        console.log("Return Data:", returnData);
      }
    }
  })
  useEffect(()=>{
    user?navigate('/userDash'):emailValidation&&navigate('/recover-password')
  })
  return (
    <>
    <div className="bg-white mt-16 ml-[25rem] w-[25rem] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-gray-800 font-semibold mb-4">Forgot Password</h2>
        <hr className='mx-auto w-24 mb-2'/>
     <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 font-medium mb-2">Email</label>
            <input value={formik.values.email} onChange={formik.handleChange} type="text" id="email" name="email" 
             className={`${
              formik.touched.email && formik.errors.email
                ? "focus:ring-red-600 border-red-600 focus:border-red-50"
                : "focus:ring-blue-200 border-gray-300 focus:border-blue-200 "
            } border form-input shadow-sm rounded-md w-full  px-3 py-2`}/>
             {formik.touched.email && formik.errors.email && (
                <p className="text-red-400 text-sm">{formik.errors.email}</p>
              )}
          </div>
          <div className="flex items-center">
            <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-600">Validate</button>
          </div>
        </form>
      </div>
    </>
  )
}
