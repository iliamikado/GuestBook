import { Component } from "react";
import { getPosts } from "../../service/Service";

import './App.css';

import Header from "../Header/Header";
import PostCard from "../PostCard/PostCard";
import AddPostModal from "../AddPostModal/AddPostModal";
import AddPostButton from "../AddPostButton/AddPostButton";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            showAddPostModal: false
        }
    }

    componentDidMount() {
        getPosts().then(posts => {
            this.setState({posts});
        });
    }

    render() {

        const posts = this.state.posts.map(post => {
            return (
                <PostCard post={post} key={post.id}/>
            )
        })

        return (
            <div>
                <Header />
                <div className="container">
                    {posts}
                </div>
                {this.state.showAddPostModal ? <AddPostModal onHide={() => this.setState({showAddPostModal: false})}/> : null}
                <AddPostButton onClick={() => this.setState({showAddPostModal: true})}/>
            </div>
        )
    }
}

export default App;