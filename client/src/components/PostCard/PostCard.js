import { Component } from "react";

import './PostCard.css';

class PostCard extends Component {
    render() {
        const {post} = this.props;
        const {value, login, date} = post;
        
        return (
            <div className="post-card">
                <p className="text-block" style={{whiteSpace: 'pre-wrap'}}>
                    {value}
                </p>
                <p className="author">{login}</p>
                <p className="date">{date}</p>
            </div>
        )
    }
}

export default PostCard;