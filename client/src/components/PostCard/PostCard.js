import { Component } from "react";

import './PostCard.css';

class PostCard extends Component {
    render() {
        const {post} = this.props;
        const {text, author, date} = post;
        
        return (
            <div className="post-card">
                <p className="text-block" style={{whiteSpace: 'pre-wrap'}}>
                    {text}
                </p>
                <p className="author">{author}</p>
                <p className="date">{date}</p>
            </div>
        )
    }
}

export default PostCard;