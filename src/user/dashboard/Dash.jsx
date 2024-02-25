import React from 'react'

export default function Dash() {
    
const Card = ({ color, title }) => {
    return (
      <div className="flex-auto max-w-xs rounded overflow-hidden shadow-lg m-4" style={{ backgroundColor: color }}>
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2 text-white">{title}</div>
        </div>
      </div>
    );
  };
  return (
    <>
     {/* <div className="flex flex-wrap justify-center">
      <Card color="#10AEDB" title="Card 1" />
      <Card color="#063455" title="Card 2" />
      <Card color="#FFBC81" title="Card 3" />
      <Card color="#EB274B" title="Card 4" />
    </div>
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden my-8">
  <div className="px-4 py-2 bg-gray-800">
    <h2 className="text-xl font-semibold text-white items-start">Title</h2>
  </div>
  <div className="px-4 py-2">
    <p className="text-gray-700">dskjfhkjsdhfkjashfjkashfkjashfjds</p>
  </div>
  <div className="px-4 py-2 flex items-center">
    <form className="w-full">
      <textarea
        placeholder="Add your comment..."
        className="w-full h-10 px-4 py-2 text-gray-700 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
      />
      <button type="submit" className="mt-2 ml-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Post Comment
      </button>
    </form>
  </div>
</div> */}
    </>
  )
}
