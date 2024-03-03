import React, { useEffect, useState,Fragment } from 'react'
import { Getposts,Removeposts } from '../../api/Control'
import { BsThreeDots } from "react-icons/bs";
import { Menu,Transition,Dialog } from '@headlessui/react'
import Editpost from '../post/Editpost';
function PostCard({ _id, title, device, description,savePostt }) {
    const [comment, setComment] = useState('');
    const [postedComments, setPostedComments] = useState([]);
    let [isOpen, setIsOpen] = useState(false)

  let closeModal=()=> {
    setIsOpen(false)
    savePostt();
  }

  let openModal=()=> {
    setIsOpen(true)
  }
    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSaveComment = () => {
        const newComments = [...postedComments, comment];
        setPostedComments(newComments);
        setComment('');
    };

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
            <div className="mt-4 flex items-center">
                <input
                    type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                    className="border border-gray-300 rounded-md py-1 px-3 mr-2 focus:outline-none focus:border-blue-500 w-full"
                />
                <button
                    type="button"
                    onClick={handleSaveComment}
                    className="bg-slate-100 text-gray-800 w-32 font-semibold py-1 px-3 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none"
                >
                    Comment
                </button>
            </div>
            <div className="mt-4 max-h-24 overflow-y-auto">
                {postedComments.map((postedComment, index) => (
                    <div key={index} className="text-gray-800 mb-2 bg-slate-100 p-1">{postedComment}</div>
                ))}
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
