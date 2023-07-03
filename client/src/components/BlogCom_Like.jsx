import React, { useState } from 'react';

const BlogPost = () => {
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);

    const handleComment = (comment) => {
        setComments([...comments, comment]);
    };

    const handleLike = () => {
        setLikes(likes + 1);
    };

    return (
        <div>
            
            <div>
                <button onClick={handleLike}>Like ({likes})</button>
            </div>

            <div>
                <h2>Comments</h2>
                <ul>
                    {comments.map((comment, index) => (
                        <li key={index}>{comment}</li>
                    ))}
                </ul>
                <input
                    type="text"
                    placeholder="Add a comment..."
                    onChange={(e) => setComments(e.target.value)}
                />
                <button onClick={() => handleComment(comments)}>Add Comment</button>
            </div>
        </div>
    );
};

export default BlogPost;