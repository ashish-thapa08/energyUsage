import React, { useState, useEffect } from 'react';
import { Getposts, fetchSavedPosts, Saveposts,Comments,getComments  } from '../../api/Control';
import {useFormik} from "formik"
import * as yup from "yup"
const validate = yup.object().shape({
  comment: yup
  .string()
  .min(1, "Too Short!")
  .max(150, "Too Long!")
  .required("Comment Required!!!"),
})
function PostCard({ _id, title, device, description, user,savePostt }) {
    let [comment,userComments] = useState([])
  const commentUser = localStorage.getItem('userData')
  const getComment = async()=>{
    let userComment = await getComments();
    userComments(userComment.data.msg)
    console.log(userComment.data.msg)
  }
  const formik = useFormik({
    initialValues:{
      comment:"",
    },
    validationSchema:validate,
    onSubmit : async(values,{setSubmitting, setErrors,resetForm })=>{
      let returnData=await Comments(values.comment,commentUser,_id);
      if(returnData.data.errMsg1){
        alert(returnData.data.errMsg1);
      }
      else{
        setSubmitting(false);
        returnData.data.msg&&getComment()
        resetForm();
      }
    }
  })  
    const savePost = async ({ id, user }) => {
        try {
            let responseData = await Saveposts(id, user);
            if (responseData.data.errMsg1) {
                alert(responseData.data.errMsg1);
            } else if (responseData.data.msg === 'unlike') {
                // Refresh saved posts after saving
                savePostt();
            }
        } catch (error) {
            console.error('Error saving post:', error);
        }
    };
    useEffect(()=>{
        getComment()
    },[])
    return (
        <div className="flex flex-col border rounded-lg shadow-lg bg-white p-6 mb-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4 font-semibold">Category: {device}</p>
        <p className="text-gray-800">{description}</p>
        <form onSubmit={formik.handleSubmit}>
        <div className="mt-4 flex items-center">
            <input
                type="text"
                value={formik.values.comment}
                name='comment'
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
              Comment
            </button>
            <button
                    type="button"
                    onClick={() => savePost({ id: _id, user: user })}
                    className="bg-gray-800 text-white font-semibold py-1 px-3 rounded-md hover:bg-gray-600 focus:outline-none ml-2"
                >
                    Unsaved Posts
                </button>
        </div>
        </form>
        <div className="mt-4 max-h-36 overflow-y-auto">
        <div className="mt-4">
    <h2 className="text-lg font-semibold mb-2">Comments</h2>
    {comment
      .filter((commentItem) => commentItem.postId === _id)
      .map((commentItem, index) => (
        <div key={index} className="bg-gray-100 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-2">
            <div className="mr-2">
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                {commentItem.user.substring(0, 1).toUpperCase()}
              </div>
            </div>
            <div>
              <h3 className="text-gray-800 font-semibold">{commentItem.comment}</h3>
              <p className="text-gray-600"><span className='font-bold mr-1'>Commented By:</span>{commentItem.user}</p>
            </div>
          </div>
        </div>
      ))}
  </div>
        </div>
    </div>
      );
    }
    function Sidebar() {
      return (
        <div className="fixed top-24 h-full overflow-y-auto bg-white w-64 border-r border-gray-200">
          <p className="text-gray-800 font-medium text-lg px-6 py-4">Filter By:</p>
          <div className="flex flex-col">
            <div className="relative w-full px-6 py-3">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 placeholder-gray-400"
                placeholder="Search..."
              />
            </div>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-4 border-b border-gray-200 focus:outline-none focus:ring focus:ring-blue-200">
              Old Posts
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-4 border-b border-gray-200 focus:outline-none focus:ring focus:ring-blue-200">
              Latest Posts
            </button>
            <div className="bg-gray-100 px-6 py-4">
              <h3 className="text-lg font-bold mb-2">Filter by Category</h3>
              {/* Category filter dropdown */}
              <select className="block w-full mt-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm">
                <option value="option1">Refrigerator</option>
                <option value="option2">LED Bulb</option>
                <option value="option3">Smart Plug</option>
              </select>
            </div>
          </div>
        </div>
    );
}

export default function Savedpost() {
    const myUser = localStorage.getItem('userData');
    const [savedPost, setSavepost] = useState([]);

    const mysavedPost = async () => {
        try {
            let posts = await Getposts();
            let savedPosts = await fetchSavedPosts(myUser);
            let filterPost = posts.data.msg.filter(curval => {
                return savedPosts.some(savedPost => savedPost.postId === curval._id);
            });
            setSavepost(filterPost);
            console.log('Filtered posts: ', filterPost);
        } catch (error) {
            console.error('Error fetching saved posts:', error);
        }
    };

    useEffect(() => {
        mysavedPost();
    }, [myUser]); // Trigger the effect when myUser changes

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex">
                <div className="grid grid-cols-2 gap-3">
                    {savedPost.length > 0 ? (
                        savedPost.map((post, index) => (
                            <PostCard savePostt = {mysavedPost} key={index} {...post} />
                        ))
                    ) : (
                        <p>No saved Posts.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
