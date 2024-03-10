import React, { useState, useEffect,Fragment } from 'react';
import { Getposts, Saveposts, checkIfPostIsSaved, Comments, getComments, deleteComments } from '../../api/Control';
import { Menu,Transition,Dialog } from '@headlessui/react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { BsThreeDots } from "react-icons/bs";
import Editcomment from './Editcomment';
const validate = yup.object().shape({
  comment: yup.string().min(1, 'Too Short!').max(150, 'Too Long!').required('Comment Required!!!'),
});

function PostCard({ _id, title, device, description, user }) {
  let [comment, userComments] = useState([]);
  const commentUser = localStorage.getItem('userData');
  const getComment=async()=>{
    let userComment = await getComments();
    userComments(userComment.data.msg);
  }
  useEffect(() => {
    getComment();
  }, []);

  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: validate,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      let returnData = await Comments(values.comment, commentUser, _id);
      if (returnData.data.errMsg1) {
        alert(returnData.data.errMsg1);
      } else {
        setSubmitting(false);
        returnData.data.msg && getComment();
        resetForm();
      }
    },
  });
  const [isSave, setSave] = useState(false);
  useEffect(() => {
    async function checkSavedStatus() {
      try {
        const response = await checkIfPostIsSaved(_id, user);
        setSave(response[0]);
      } catch (error) {
        console.error('Error checking if post is saved:', error);
      }
    }
    checkSavedStatus();
  }, []);

  const savePost = async ({ id, user }) => {
    let responseData = await Saveposts(id, user);
    if (responseData.data.errMsg1) {
      alert(responseData.data.errMsg1);
    } else if (responseData.data.msg === 'unlike') {
      setSave(false);
    } else {
      responseData.data.msg ? setSave(true) : setSave(false);
    }
  };
  let [isOpen, setIsOpen] = useState(false)
  let closeModal=()=> {
    setIsOpen(false)
    getComment()
  }

  let openModal=()=> {
    setIsOpen(true)
  }
    const removeComment = async ({ id }) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this comment?');
        if(isConfirmed){
        let resp = await deleteComments(id);
        resp.data.msg?getComment():alert(resp.data.err)
    }
    };
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
            Comment
          </button>
          <button
            type="button"
            onClick={() => savePost({ id: _id, user: user })}
            className="bg-gray-800 text-white font-semibold py-1 px-3 rounded-md hover:bg-gray-600 focus:outline-none ml-2"
          >
            {!isSave ? 'Save Post' : 'Saved'}
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
                      isOpen?<Editcomment close={closeModal} comment={commentItem.comment} id={commentItem._id}/>
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
                    onClick={openModal}
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

function Sidebar({ posts, setFilteredPosts }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  useEffect(() => {
    let filteredPosts = posts;

    // Filter by search term
    if (searchTerm.trim() !== '') {
      filteredPosts = filteredPosts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.device.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All') {
      filteredPosts = filteredPosts.filter((post) => post.device === selectedCategory);
    }

    setFilteredPosts(filteredPosts);
  }, [searchTerm, selectedCategory, posts, setFilteredPosts]);

  return (
    <div className="fixed top-24 h-full overflow-y-auto bg-white w-64 border-r border-gray-200">
      <p className="text-gray-800 font-medium text-lg px-6 py-4">Filter By:</p>
      <div className="flex flex-col">
        <div className="relative w-full px-6 py-3">
          <input
            type="text"
            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500 placeholder-gray-400"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="bg-gray-100 px-6 py-4">
          <h3 className="text-lg font-bold mb-2">Filter by Category</h3>
          {/* Category filter dropdown */}
          <select
            className="block w-full mt-1 border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="All">All</option>
            <option value="Refrigerator">Refrigerator</option>
            <option value="LED Bulb">LED Bulb</option>
            <option value="Smart Plug">Smart Plug</option>
          </select>
        </div>
      </div>
    </div>
  );
}
function PostList({ posts }) {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  return (
    <div className="flex">
      <div className="flex-1">
        {filteredPosts.length<1?<p className='text-2xl font-bold'>No Posts!!!</p>:filteredPosts.map((post, index) => (
          <PostCard key={index} {...post} />
        ))}
      </div>
      <div className="w-1/4 ml-4">
        <Sidebar posts={posts} setFilteredPosts={setFilteredPosts} />
      </div>
    </div>
  );
}

export default function Posts() {
  const [post, setPost] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        let posts = await Getposts();
        setPost(posts.data.msg);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <PostList posts={post} />
    </div>
  );
}
