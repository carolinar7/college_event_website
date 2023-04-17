import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { useSession } from "next-auth/react";
import axios from "axios";
import { url } from "~/helper";

function Comments(props: any) {
  const { data } = useSession();
  const [comments, setComments] = useState<any>([]);
  const [inputValue, setInputValue] = useState("");
  const [rating, setRating] = useState(0);
  const [inputHeight, setInputHeight] = useState(40);
  const [selectedComment, setSelectedComment] = useState<any>(null);

  useEffect(() => {
    axios.get(`${url}/comment`).then(({ data }) => {
      setComments(data);
    }).catch(() => {return;});
  }, []);

  function handleInputChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(event.target.value);
    setInputHeight(event.target.scrollHeight);
  }

  function handleRatingClick(ratingValue: number) {
    setRating(ratingValue);
  }

  async function handleAddComment() {
    if (selectedComment) {
      const updatedComment = await axios.put(`${url}/comment`, {
        commentId: selectedComment.id,
        comment: inputValue,
        rating: rating,
      });
      setComments(comments.map((comment: any) => comment.id === selectedComment.id ? updatedComment.data : comment));
      setInputValue("");
      setRating(0);
      setSelectedComment(null);
      setInputHeight(40);
    } else {
      const newComment = await axios.post(`${url}/comment`, {
        comment: inputValue,
        rating: rating,
        userId: data?.user.id,
        eventId: props.eventId,
      });
      setComments([newComment.data, ...comments]);
      setInputValue("");
      setRating(0);
      setInputHeight(40);
    }
  }

  function handleEditComment(comment: any) {
    setSelectedComment(comment);
    setInputValue(comment.comment);
    setRating(comment.rating);
  }

  async function handleDeleteComment(comment: any) {
    await axios.delete(`${url}/comment`, {
      data: {
        commentId: comment.id,
      },
    });
    setComments(comments.filter((c: any) => c.id !== comment.id));
  }

  const containerStyle = {
    minHeight: "300px",
    maxHeight: "600px",
  };

  const options: Intl.DateTimeFormatOptions = { month: 'numeric', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };

  return (
    <div style={containerStyle}>
      <div className="flex py-2">
        {[...Array(5)].map((_, index) => {
          const ratingValue = index + 1;
          return (
            <FaStar
              key={index}
              className="star"
              size={30}
              color={ratingValue <= rating ? "#ffc107" : "#e4e5e9"}
              onClick={() => handleRatingClick(ratingValue)}
              style={{ marginRight: "10px", cursor: "pointer" }}
            />
          );
        })}
      </div>
      <div className="flex border rounded-md overflow-hidden mb-5">
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
      <ul>
        {comments.map((comment: any) => {
          return ( 
            <li key={comment.id}>
              <div className="border rounded-md p-4 flex items-start flex-col">
                <div className="flex mb-2">
                  <div className="mr-4">
                    <CgProfile size={30} />
                  </div>
                  <div className="w-52">{comment.comment}</div>
                </div>
                <div className="flex justify-between w-full text-gray-500 text-sm">
                  <div>Rating: {comment.rating}</div>
                  <div>{new Date(comment.updatedAt).toLocaleString('en-US', options)}</div>
                </div>
                {data?.user.id === comment?.User?.id && <div className="flex justify-end mt-2 w-full">
                  <AiFillEdit className="mr-2 cursor-pointer" onClick={() => handleEditComment(comment)} />
                  <AiFillDelete className="cursor-pointer" onClick={() => handleDeleteComment(comment)} />
                </div>}
              </div>
            </li>)
        })}
      </ul>
    </div>
  );
}

export default Comments;
