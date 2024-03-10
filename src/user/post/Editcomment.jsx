import React from 'react'
import { useFormik } from 'formik';
import { editComments } from '../../api/Control';
import * as yup from 'yup';
const validate = yup.object().shape({
    comment: yup.string().min(1, 'Too Short!').max(150, 'Too Long!').required('Comment Required!!!'),
  });
export default function Editcomment({comment,id,close}) {
    const closeModal = ()=>{
        close();
    }
    const formik = useFormik({
        initialValues: {
          comment: comment,
        },
        validationSchema: validate,
        onSubmit: async (values, { setSubmitting, resetForm }) => {
            //console.log(values)
          let returnData = await editComments(values.comment, id);
          if (returnData.data.msg) {
            setSubmitting(false);
            returnData.data.msg && closeModal();
            resetForm();
          } else {
            alert('Network Issues!!!');
          }
        },
      });
  return (
    <>
    <form onSubmit={formik.handleSubmit}>
        <div className="mt-4 flex gap-1 items-center">
          <input
            type="text"
            value={formik.values.comment}
            name="comment"
            onChange={formik.handleChange}
            placeholder="Add a comment..."
            className="border border-gray-300 rounded-md py-1 px-3 mr-2 focus:outline-none focus:border-blue-500 w-1/2"
          />
          <button
            type="submit"
            className={`font-semibold py-1 px-3 rounded-md focus:outline-none ${
              formik.values.comment && formik.isValid
                ? 'hover:bg-gray-800 hover:text-white bg-slate-100 text-gray-800'
                : 'bg-slate-50 text-gray-200'
            }`}
            disabled={!formik.values.comment || !formik.isValid}
          >
            Update
          </button>
          <button onClick={closeModal} className='btn hover:text-white hover:shadow hover:cursor-pointer hover:bg-red-700 text-red-700 py-1 px-3 hover:rounded-md'>Close</button>
        </div>
      </form>
    </>
  )
}
