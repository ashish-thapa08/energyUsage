import React from 'react'
import {useFormik} from "formik"
import * as yup from "yup"
import { Signin } from '../../api/Control'
const validate = yup.object().shape({
email: yup
  .string()
  .email("Invalid email format")
  .required("Email Required!!!"),
  password: yup
    .string()
    .required("Password Required!!!")
})
export default function  Login() {
  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:validate,
    onSubmit : async(values,{setSubmitting,setErrors})=>{
      let returnData = await Signin(values);
      console.log("Return Data:", returnData);
      if(returnData.data.errMsg1){
        setErrors({ email: returnData.data.errMsg1 });
      }
      else if(returnData.data.errMsg){
        setErrors({ password: returnData.data.errMsg });
      }
      else{
        localStorage.setItem('userData',values.email.split('@')[0])
        setSubmitting(false);
        alert(returnData.data.msg)
      }
    }
  })
  return (
   <>
      <div className="bg-white mt-16 ml-[25rem] w-[25rem] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-gray-800 font-semibold mb-4">Login</h2>
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
          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-800 font-medium mb-2">Password</label>
            <input value={formik.values.password} onChange={formik.handleChange} type="password" id="password" name="password" 
            className={`${
              formik.touched.password && formik.errors.password
                ? "focus:ring-red-600 border-red-600 focus:border-red-50"
                : "focus:ring-blue-200 border-gray-300 focus:border-blue-200 "
            } border form-input shadow-sm rounded-md w-full  px-3 py-2`}/>
            {formik.touched.password && formik.errors.password && (
                <p className="text-red-400 text-sm">{formik.errors.password}</p>
              )}
          </div>
          <div className="flex items-center">
            <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-600">Login</button>
            <a href="#" className="text-gray-600 hover:underline ml-4">Forgot Password?</a>
          </div>
        </form>
      </div>
   </>
  )
}
