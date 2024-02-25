import React, { useEffect } from 'react'
import {useFormik} from "formik"
import * as yup from "yup"
import { useNavigate } from 'react-router-dom'
import { Recoverpw } from '../../api/Control'
const validate = yup.object().shape({
      password: yup
        .string()
        .required("Password Required!!!"),
    password1: yup
    .string()
    .required("Password Required!!!")
    .oneOf([yup.ref('password'), null], 'Passwords mis-matched!!!')
    })
export default function Recoverpassword() {
    const navigate = useNavigate();
    const emailValidation = sessionStorage.getItem('fwpeValidation');
    let user = localStorage.getItem('userData');
    const formik = useFormik({
        initialValues:{
          password:'',
          password1:''
        },
        validationSchema:validate,
        onSubmit : async(values,{setSubmitting,setErrors})=>{
          let returnData = await Recoverpw({password:values.password,email:emailValidation});
          if(returnData.data.errMsg1){
            setErrors({ email: returnData.data.errMsg1 });
          }
          else{
            setSubmitting(false);
           alert(returnData.data.msg)
            console.log("Return Data:", returnData);
            sessionStorage.removeItem('fwpeValidation')
            navigate('/login')
          }
        }
      })
      useEffect(()=>{
        user?navigate('/login'):!emailValidation&&navigate('/forgot-password')
      })
  return (
   <>
      <div className="bg-white mt-16 ml-[25rem] w-[25rem] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-gray-800 font-semibold mb-4">Recover Password</h2>
        <hr className='mx-auto w-24 mb-2'/>
        <form onSubmit={formik.handleSubmit}>
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
          <div className="mb-6">
            <label htmlFor="password1" className="block text-gray-800 font-medium mb-2">Re-Password</label>
            <input value={formik.values.password1} onChange={formik.handleChange} type="password" id="password1" name="password1" 
            className={`${
              formik.touched.password1 && formik.errors.password1
                ? "focus:ring-red-600 border-red-600 focus:border-red-50"
                : "focus:ring-blue-200 border-gray-300 focus:border-blue-200 "
            } border form-input shadow-sm rounded-md w-full  px-3 py-2`}/>
            {formik.touched.password1 && formik.errors.password1 && (
                <p className="text-red-400 text-sm">{formik.errors.password1}</p>
              )}
          </div>
          <div className="flex items-center">
            <button type="submit" className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-600">Update Password</button>
          </div>
        </form>
      </div>
   </>
  )
}

