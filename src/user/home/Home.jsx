import React from 'react'
import {useFormik} from "formik"
import * as yup from "yup"
import { Register } from '../../api/Control'
const validate = yup.object().shape({
  fullname: yup
  .string()
  .min(5, "Too Short!")
  .max(50, "Too Long!")
  .required("Full Name Required!!!"),
email: yup
  .string()
  .email("Invalid email format")
  .required("Email Required!!!"),
  password: yup
    .string()
    .required("Password Required!!!")
    .min(8, "Password is too short - should be 8 chars minimum!!!"),
})
export default function Home() {
  const formik = useFormik({
    initialValues:{
      fullname:"",
      email:"",
      password:""
    },
    validationSchema:validate,
    onSubmit : async(values,{setSubmitting})=>{
      let returnData = await Register(values);
      console.log("Return Data:", returnData);
      if(returnData){
        setSubmitting(false);
      }
    }
  })
  return (
    <>
     <div className="bg-white mt-16 ml-[25rem] w-[25rem] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-gray-800 font-semibold mb-4">Registration</h2>
        <hr className='mx-auto w-24 mb-2'/>
        <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
            <label htmlFor="fullname" className="block text-gray-800 font-medium mb-2">Full Name</label>
            <input value={formik.values.fullname} onChange={formik.handleChange} type="text" id="fullname" name="fullname" 
             className={`${
              formik.touched.fullname && formik.errors.fullname
                ? "focus:ring-red-600 border-red-600 focus:border-red-50"
                : "focus:ring-blue-200 border-gray-300 focus:border-blue-200 "
            } border form-input shadow-sm rounded-md w-full  px-3 py-2`}/>
             {formik.touched.fullname && formik.errors.fullname && (
                <p className="text-red-400 text-sm">{formik.errors.fullname}</p>
              )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 font-medium mb-2">Email</label>
            <input value={formik.values.email} onChange={formik.handleChange} type="email" id="email" name="email"
            className={`${
                  formik.touched.email && formik.errors.email
                    ? "focus:ring-red-600 border-red-600 focus:border-red-50"
                    : "focus:ring-blue-200 border-gray-300 focus:border-blue-200 "
                } border form-input shadow-sm rounded-md  w-full  px-3 py-2`}
          />
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
          <div className="flex">
            <button type="submit" className="bg-gray-800 text-white px-4 py-2 w-full rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-600">Register</button>
          </div>
        </form>
      </div>
    </>
  )
}
