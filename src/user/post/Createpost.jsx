import React from 'react'
import {useFormik} from "formik"
import * as yup from "yup"
import {Posts} from '../../api/Control'
const validate = yup.object().shape({
    title: yup
    .string()
    .min(5, "Too Short!")
    .max(150, "Too Long!")
    .required("Title Required!!!"),
  description: yup
    .string()
    .min(5, "Too Short!")
    .max(1000, "Too Long!")
    .required("Description Required!!!"),
  })
export default function Createpost() {
    const formik = useFormik({
        initialValues:{
          title:"",
          description:"",
          option: 'Refrigerator',
        },
        validationSchema:validate,
        onSubmit : async(values,{setSubmitting, setErrors,resetForm })=>{
          let returnData=await Posts(values);
          if(returnData.data.errMsg1){
            alert(returnData.data.errMsg1);
          }
          else{
            setSubmitting(false);
            alert(returnData.data.msg)
            resetForm();
          }
        }
      })
  return (
    <>
    <div className="bg-white mt-8 mb-10 ml-[25rem] w-[25rem] p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl text-gray-800 font-semibold mb-4">Add Posts</h2>
        <hr className='mx-auto w-24 mb-2'/>
        <form onSubmit={formik.handleSubmit}>
        <div className="mb-4">
            <label htmlFor="title" className="block text-gray-800 font-medium mb-2">Title</label>
            <input value={formik.values.title} onChange={formik.handleChange} type="text" id="title" name="title" 
             className={`${
              formik.touched.title && formik.errors.title
                ? "focus:ring-red-600 border-red-600 focus:border-red-50"
                : "focus:ring-blue-200 border-gray-300 focus:border-blue-200 "
            } border form-input shadow-sm rounded-md w-full  px-3 py-2`}/>
             {formik.touched.title && formik.errors.title && (
                <p className="text-red-400 text-sm">{formik.errors.title}</p>
              )}
          </div>
          <div className="mb-4">
          <label htmlFor="option" className="block text-gray-800 font-medium mb-2">
                    Select an Option
                </label>
                <select
                    id="option"
                    name="option"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.option}
                    className="block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500"
                >
                    <option value="Refrigerator">Refrigerator</option>
                    <option value="LED Bulb">LED Bulb</option>
                    <option value="Smart Plug">Smart Plug</option>
                </select>
                {formik.touched.option && formik.errors.option ? (
                    <div className="text-red-500 text-xs mt-1">{formik.errors.option}</div>
                ) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-800 font-medium mb-2">Description</label>
            <textarea value={formik.values.description} rows={5}cols={50} onChange={formik.handleChange} id="description" name="description"
            className={`${
                  formik.touched.description && formik.errors.description
                    ? "focus:ring-red-600 border-red-600 focus:border-red-50"
                    : "focus:ring-blue-200 border-gray-300 focus:border-blue-200 "
                } border form-input shadow-sm rounded-md  w-full  px-3 py-2`}
          />
           {formik.touched.description && formik.errors.description && (
                <p className="text-red-400 text-sm">{formik.errors.description}</p>
              )}
          </div>
          <div className="flex">
            <button type="submit" className="bg-gray-800 text-white px-4 py-2 w-full rounded-lg hover:bg-gray-700 focus:outline-none focus:bg-gray-600">Add Posts</button>
          </div>
        </form>
        </div>
    </>
  )
}
