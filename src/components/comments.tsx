import React, { useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

interface Comment {
  id: number;
  body: string;
  rating: number;
  date: string;
}

function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [rating, setRating] = useState(0);
  const [inputHeight, setInputHeight] = useState(40);

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value);
    setInputHeight(event.target.scrollHeight);
  }

  function handleRatingClick(ratingValue: number) {
    setRating(ratingValue);
  }

  function handleAddComment() {
    const newComment: Comment = {
      id: comments.length + 1,
      body: inputValue,
      rating: rating,
      date: new Date().toLocaleString()
    };
    setComments([newComment, ...comments]);
    setInputValue("");
    setRating(0);
    setInputHeight(40);
  }

  const containerStyle = {
    minHeight: "300px",
    maxHeight: "600px",
  };

  return (
    <div style={containerStyle}>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <div className="border rounded-md p-4 flex items-start flex-col">
              <div className="flex items-center mb-2">
                <div className="mr-4">
                  <CgProfile size={30} />
                </div>
                <p>{comment.body}</p>
              </div>
              <div className="flex justify-between w-full text-gray-500 text-sm">
                <div>Rating: {comment.rating}</div>
                <div>{comment.date}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="py-2" style={{ display: "flex" }}>
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <FaStar
              key={ratingValue}
              className="star"
              size={30}
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              onClick={() => handleRatingClick(ratingValue)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
          );
        })}
      </div>
      <div className="flex border rounded-md overflow-hidden">
        <textarea
          className="flex-1 p-2 outline-none resize-none"
          placeholder="Add a comment..."
          value={inputValue}
          onChange={handleInputChange}
          style={{ height: inputHeight }}
        />
        <button
          className="bg-rose-500 text-white px-4 py-2"
          onClick={handleAddComment}
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default Comments;
