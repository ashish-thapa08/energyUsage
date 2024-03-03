import React,{useState,useEffect} from 'react'
import { Getposts, Saveposts,checkIfPostIsSaved } from '../../api/Control';
function PostCard({ _id,title, device, description,user, likes, comments }) {
    const [comment, setComment] = useState('');
    const [postedComments, setPostedComments] = useState([]);
    const[isSave,setSave] = useState(false);
    useEffect(() => {
      // Check if the post is saved when the component mounts
      async function checkSavedStatus() {
          try {
              // Make an API call to check if the post is saved
              const response = await checkIfPostIsSaved(_id, user); // Implement this function
              setSave(response[0]);
          } catch (error) {
              console.error('Error checking if post is saved:', error);
          }
      }
      checkSavedStatus();
  }, []);
    const handleCommentChange = (event) => {
      setComment(event.target.value);
    };
    const handleSaveComment = () => {
      const newComments = [...postedComments, comment];
      setPostedComments(newComments);
      setComment('');
    };
    const savePost = async({id,user})=>{
      let responseData = await Saveposts(id,user);
      if(responseData.data.errMsg1){
        alert(responseData.data.errMsg1);
      }
      else if(responseData.data.msg=='unlike'){
        setSave(false);
      }
      else{
        if(responseData.data.msg){
          setSave(true);
        }
        else{
          setSave(false);
        }
      }
    }
    return (
      <div className="flex flex-col border rounded-lg shadow-lg bg-white p-6 mb-6">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4 font-semibold">Category: {device}</p>
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
              onClick={()=>savePost({id:_id,user:user})}
              className="bg-gray-800 text-white font-semibold py-1 px-3 rounded-md hover:bg-gray-600 focus:outline-none ml-2"
          >
              {!isSave?'Save Post':'Saved'}
          </button>
      </div>
      <div className="mt-4 max-h-24 overflow-y-auto">
          {postedComments.map((postedComment, index) => (
              <div key={index} className="text-gray-800 bg-slate-100 mb-2">{postedComment}</div>
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
export default function Posts() {
  const[post,getPost]=useState([])
  const Posts = async()=>{
    try {
      let posts = await Getposts();
      getPost(posts.data.msg)
      console.log(posts);
  } catch (error) {
      console.error('Error fetching posts:', error);
  }
  }
  useEffect(()=>{
    Posts()
  },[])
  return (
    <div className="container mx-auto px-4 py-8">
      <PostList posts={post} />
    </div>
  )
}
