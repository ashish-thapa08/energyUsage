import React,{useState} from 'react'
function PostCard({ title, category, description, likes, comments }) {
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
  
    return (
      <div className="flex flex-col border rounded-lg shadow-lg bg-white p-6 mb-6">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">Category: {category}</p>
        <p className="text-gray-800">{description}</p>
        <form className="mt-4 flex items-center">
          <input
            type="text"
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment..."
            className="border border-gray-300 rounded-md py-1 px-3 w-full mr-2 focus:outline-none focus:border-blue-500"
          />
          <button
            type="button"
            onClick={handleSaveComment}
            className="bg-blue-500 text-white font-semibold py-1 px-3 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        </form>
        <div className="mt-4 max-h-24 overflow-y-auto">
          {postedComments.map((postedComment, index) => (
            <div key={index} className="text-gray-800">{postedComment}</div>
          ))}
        </div>
      </div>
    );
  }
  function Sidebar() {
    return (
      <div className="fixed top-24 h-full overflow-y-auto bg-white w-64 border-r border-gray-200">
        <p className='text-gray-800 font-medium text-lg px-6 py-4'>Filter By:</p>
        <div className="flex flex-col">
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
  
  
  function PostList({ posts }) {
    return (
      <div className="flex">
        <div className="flex-1">
          {posts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </div>
        <div className="w-1/4 ml-4">
          <Sidebar />
        </div>
      </div>
    );
  }
  
  const posts = [
    {
      title: 'Post 1',
      category: 'Technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      likes: 10,
      comments: 5,
    },
    {
      title: 'Post 2',
      category: 'Travel',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      likes: 20,
      comments: 8,
    },
    {
        title: 'Post 2',
        category: 'Travel',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        likes: 20,
        comments: 8,
      },
      {
        title: 'Post 2',
        category: 'Travel',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        likes: 20,
        comments: 8,
      },
      {
        title: 'Post 3',
        category: 'Travel',
        description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        likes: 20,
        comments: 8,
      },
    // Add more posts here
  ];
export default function Posts() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PostList posts={posts} />
    </div>
  )
}
