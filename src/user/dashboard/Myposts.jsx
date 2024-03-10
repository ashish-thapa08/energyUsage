import React, { useEffect, useState,Fragment } from 'react'
import { Getposts,Removeposts,Comments,getComments,deleteComments } from '../../api/Control'
import { BsThreeDots } from "react-icons/bs";
import { Menu,Transition,Dialog } from '@headlessui/react'
import Editpost from '../post/Editpost';
import Editcomment from '../post/Editcomment';
import {useFormik} from "formik"
import * as yup from "yup"
const validate = yup.object().shape({
  comment: yup
  .string()
  .min(1, "Too Short!")
  .max(150, "Too Long!")
  .required("Comment Required!!!"),
})
function PostCard({ _id, title, device, description,savePostt }) {
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
    let [isOpen, setIsOpen] = useState(false)
  let closeModal=()=> {
    setIsOpen(false)
    savePostt();
  }

  let openModal=()=> {
    setIsOpen(true)
  }
  let [isOpen1, setIsOpen1] = useState(false)
  let closeModal1=()=> {
    setIsOpen1(false)
    getComment();
  }

  let openModal1=()=> {
    setIsOpen1(true)
  }
    const removePost = async ({ id }) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this post?');
        if(isConfirmed){
        try {
            let responseData = await Removeposts(id);
            if (responseData.data.msg) {
                savePostt();
            } else {
                alert(responseData.data.errMsg1);
            }
        } catch (error) {
            console.error('Error saving post:', error);
        }
    }
    };
    const removeComment = async ({ id }) => {
      const isConfirmed = window.confirm('Are you sure you want to delete this post?');
      if(isConfirmed){
      let resp = await deleteComments(id);
      resp.data.msg?getComment():alert(resp.data.err)
  }
  };
    useEffect(()=>{
        getComment();
    },[])
    return (
        <div className="flex flex-col border rounded-lg shadow-lg bg-white p-6 mb-6">
            <div className='flex gap-2'>
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <Menu>
                <Menu.Button>
                <BsThreeDots className='font-extrabold mt-[-1.8rem] text-2xl text-gray-600 hover:cursor-pointer hover:text-gray-800'/>
                </Menu.Button>
                <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
                <Menu.Items className="absolute ml-[18rem] mt-11 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                    <Menu.Item>
                    {({ active }) => (
                    <button
                    onClick={openModal}
                        className={`${
                        active ? 'bg-gray-800 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                        Edit Post
                    </button>
                    )}
                </Menu.Item>
                </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                  onClick={() => removePost({ id: _id})}
                    className={`${
                      active ? 'bg-red-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Delete Post
                  </button>
                )}
              </Menu.Item>
              </div>
                </Menu.Items>
                </Transition>
            </Menu>
            </div>
            <Editpost Posts={Myposts} id={_id} title={title} device={device} description={description} closeModal={closeModal} isOpen={isOpen}/>
            <p className="text-gray-600 mb-4">Category: {device}</p>
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
                    {
                      isOpen1?<Editcomment close={closeModal1} comment={commentItem.comment} id={commentItem._id}/>
                      :<h3 className="text-gray-800 font-semibold">{commentItem.comment}</h3>
                    }
                    <p className="text-gray-600">
                      <span className="flex items-center">
                      <span className="font-bold mr-1">Commented By:</span>
                        <span>{commentItem.user}</span>
                        {commentItem.user === commentUser && 
                        (<>
                        <Menu>
                          <Menu.Button>
                          <BsThreeDots className='ms-2 mt-1 text-xl font-extrabold hover:text-gray-800 hover:cursor-pointer'/>
                          </Menu.Button>
                          <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                          >
                             <Menu.Items className="absolute ml-[18rem] mt-11 w-44 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div className="px-1 py-1 ">
                    <Menu.Item>
                    {({ active }) => (
                    <button
                    onClick={openModal1}
                        className={`${
                        active ? 'bg-gray-800 text-white' : 'text-gray-900'
                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                        Edit
                    </button>
                    )}
                </Menu.Item>
                </div>
            <div className="px-1 py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                  onClick={() => removeComment({ id: commentItem._id})}
                    className={`${
                      active ? 'bg-red-500 text-white' : 'text-gray-900'
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    Delete
                  </button>
                )}
              </Menu.Item>
              </div>
                </Menu.Items>
                          </Transition>
                        </Menu>
                        </>)}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
  </div>
        </div>
        </div>
    );
}
export default function Myposts() {
    const myUser = localStorage.getItem('userData');
    const [posts,getPost] = useState([])
    let Saveposts = async()=>{
        let Post =await Getposts();
        let myPost = Post.data.msg.filter((curval)=>{
            return curval.user===myUser
        })
        getPost(myPost)
    }
    useEffect(()=>{
        Saveposts();
    },[])
    return (
        <div className="container mx-auto px-2 py-4">
            <div className="grid grid-cols-2 gap-2">
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <PostCard savePostt = {Saveposts} key={index} {...post} />
                        ))
                    ) : (
                        <p>No Posts Yet!!!</p>
                    )}
            </div>
        </div>
    );
}
