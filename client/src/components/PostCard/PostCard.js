import { Component } from "react";
import Card from 'react-bootstrap/Card';

import './PostCard.css';

class PostCard extends Component {
    render() {
        const {post} = this.props;
        const {value, login, date} = post;
        
        return (
            <Card className="post-card">
                <Card.Body>
                    <Card.Text>
                        {value}
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted footer">
                    <p className="author">{login}</p>
                    <p className="date">{date}</p>
                </Card.Footer>
            </Card>
        )
    }
}

export default PostCard;