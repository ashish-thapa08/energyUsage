import React, { useState, useEffect } from 'react';
import { Getposts, fetchSavedPosts, Saveposts } from '../../api/Control';

function PostCard({ _id, title, device, description, user,savePostt }) {
    const [comment, setComment] = useState('');
    const [postedComments, setPostedComments] = useState([]);

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSaveComment = () => {
        const newComments = [...postedComments, comment];
        setPostedComments(newComments);
        setComment('');
    };

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

    return (
        <div className="flex flex-col border rounded-lg shadow-lg bg-white p-6 mb-6">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">Category: {device}</p>
            <p className="text-gray-800">{description}</p>
            <div className="mt-4 flex items-center">
                <input
                    type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                    className="border border-gray-300 rounded-md py-1 px-3 mr-2 focus:outline-none focus:border-blue-500 w-1/2"
                />
                <button
                    type="button"
                    onClick={handleSaveComment}
                    className="bg-slate-100 text-gray-800 font-semibold py-1 px-3 rounded-md hover:bg-gray-800 hover:text-white focus:outline-none"
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
            <div className="mt-4 max-h-24 overflow-y-auto">
                {postedComments.map((postedComment, index) => (
                    <div key={index} className="text-gray-800 mb-2 bg-slate-100 p-1">{postedComment}</div>
                ))}
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
