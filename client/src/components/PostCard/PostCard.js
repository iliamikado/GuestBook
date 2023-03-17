import { Component } from "react";

import './PostCard.css';

class PostCard extends Component {
    render() {
        const {post} = this.props;
        const {text, author, date} = post;
        
        return (
            <div className="post-card">
                <div className="text-block">
                    {text}
                </div>
                <p className="author">{author}</p>
                <p className="date">{date}</p>
            </div>
        )
    }
}

export default PostCard;