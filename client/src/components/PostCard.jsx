import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import Actions from "./Actions";
import moment from "moment";
import { AuthContext } from '../App';
import { useState } from 'react';

export default function Post(props) {
    const { user, _id, title, content, image, createdOn } = props.post;
    const { auth } = React.useContext(AuthContext)

    const [comments, setComments] = useState([]);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const newComment = e.target.comment.value;
        setComments([...comments, newComment]);
        e.target.comment.value = '';
    };

    return (
        <Card sx={{ width: '100%', borderRadius: "10px" }} id={_id} elevation={7}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {user?.name?.slice(0, 1)}
                    </Avatar>
                }
                action={
                    auth?._id === user?._id && <Actions id={_id} />
                }
                title={title}
                subheader={moment(createdOn).fromNow()}
            />
            <CardMedia
                component="img"
                height="100%"
                image={image}
                alt={user}
            />
            <CardContent>
                <Typography variant="body2">
                    {content}

                    <h3>Comments</h3>
                    <form onSubmit={handleCommentSubmit}>
                        <textarea cols="69" name="comment" placeholder="Write a comment"></textarea>
                        <button type="submit">Add Comment</button>
                    </form>
                    {Array.isArray(comments) && comments.length > 0 ? (
                        comments.map((comment, index) => (
                            <p key={index}>{comment}</p>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}

                </Typography>
            </CardContent>
        </Card>
    );
}

