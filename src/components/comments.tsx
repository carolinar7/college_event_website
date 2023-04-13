import React, { useState } from "react";
import axios from "axios";

interface Comment {
  id: number;
  body: string;
  rating: number;
}

function Comments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [rating, setRating] = useState(1);

  function fetchComments() {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setComments(response.data.slice(0, 10));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function handleRatingChange(event: React.ChangeEvent<HTMLInputElement>) {
    setRating(parseInt(event.target.value));
  }

  function handleAddComment() {
    const newComment: Comment = {
      id: comments.length + 1,
      body: inputValue,
      rating: rating,
    };
    setComments([newComment, ...comments]);
    setInputValue("");
    setRating(1);
  }

  return (
    <div>
      <button onClick={fetchComments}>Fetch comments</button>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.body}</p>
            <p>Rating: {comment.rating}</p>
          </li>
        ))}
      </ul>
      <div>
        <label htmlFor="comment-input">Leave a comment:</label>
        <input
          type="text"
          id="comment-input"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="rating-select">Rating:</label>
        <input
          type="range"
          id="rating-select"
          min="1"
          max="5"
          value={rating}
          onChange={handleRatingChange}
        />
        <span>{rating}</span>
      </div>
      <button onClick={handleAddComment}>Add comment</button>
    </div>
  );
}

export default Comments;
