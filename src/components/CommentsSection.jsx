import React, { useState } from "react";
import { FaComments, FaTrash } from "react-icons/fa";

const generateRandomName = () => {
  const names = [
    "Iron Man",
    "Captain America",
    "Batman",
    "Joker",
    "Wonder Woman",
    "Harley Quinn",
    "Spider-Man",
    "Thor",
    "Loki",
    "Black Widow",
  ];
  return names[Math.floor(Math.random() * names.length)];
};

const CommentSection = () => {
  const [user, setUser] = useState(generateRandomName());
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (user) {
      setComments([...comments, { user, comment }]);
      setComment("");
    }
  };

  const handleDeleteComment = (index) => {
    setComments(comments.filter((comment, i) => i !== index));
  };

  return (
    <>
      <h1 className="text-gray-700 text-[2vw] mb-6 ml-6 ">
        <span className="text-orange-600 text-2xl relative top-9 right-7">
          <FaComments />
        </span>
        Comments
      </h1>
      <form className=" ml-7">
        <div className="w-[50vw] mb-4 border border-yellow-500 rounded-lg bg-gray-500  dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-red-200 rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="4"
              className="w-full px-0 text-lg font-semibold text-lime-500 bg-red-200 border-0 dark:bg-gray-800 focus:ring-0 dark:text-lime-400 dark:placeholder-lime-400"
              placeholder="Write a comment..."
              required
              value={comment}
              onChange={handleCommentChange}
            />
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              onClick={handleCommentSubmit}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-purple-500 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              Post comment
            </button>
            <div className="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2">
              <button
                type="button"
                class="inline-flex justify-center items-center p-2  text-blue-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                  />
                </svg>
                <span class="sr-only">Attach file</span>
              </button>
              <button
                type="button"
                class="inline-flex justify-center items-center p-2 text-blue-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 20"
                >
                  <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                </svg>
                <span class="sr-only">Set location</span>
              </button>
              <button
                type="button"
                class="inline-flex justify-center items-center p-2 text-blue-600 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 18"
                >
                  <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                </svg>
                <span class="sr-only">Upload image</span>
              </button>
              {/* Add your button functionalities here */}
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="w-[50vw] h-[1vh] mb-4 border border-gray-200 rounded-lg bg-red-500 dark:bg-gray-700 dark:border-gray-600"
            >
              <div className=" h-[10vh] px-4 py-2  bg-lime-400 rounded-lg dark:bg-gray-800">
                <h2 className=" font-semibold text-red-400 ">
                  By {comment.user}
                </h2>
                <p className="mt-2 text-gray-500 ">{comment.comment}</p>
                {comment.user === user && (
                  <button
                    onClick={() => handleDeleteComment(index)}
                    className=" relative left-[47vw] bottom-[7vh] p-2 text-red-500 text-xl"
                  >
                    <FaTrash className="relative top-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </form>
    </>
  );
};

export default CommentSection;
