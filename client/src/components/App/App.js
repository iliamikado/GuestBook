import { Component } from "react";
import { getPosts, createPostsSync } from "../../service/Service";

import './App.css';

import Header from "../Header/Header";
import PostCard from "../PostCard/PostCard";
import AddPostModal from "../AddPostModal/AddPostModal";
import AddPostButton from "../AddPostButton/AddPostButton";
import LoginModal from "../LoginModal/LoginModal";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            showAddPostModal: false,
            showLoginModal: false,
            user: null
        }
        this.userId = null;
    }

    componentDidMount() {
        getPosts().then(posts => {
            this.setState({posts});
        });
        createPostsSync((data) => {
            this.setState(({posts}) => ({posts: [data, ...posts]}));
        });
    }

    setUser = (user) => {this.setState({user})}
    setUserId = (userId) => {this.userId = userId}

    render() {

        const posts = this.state.posts.map(post => {
            return (
                <PostCard post={post} key={post.id}/>
            )
        })

        return (
            <div>
                <Header openLoginModal={() => this.setState({showLoginModal: true})} user={this.state.user}/>
                <div className="container">
                    {posts}
                </div>
                {this.state.showAddPostModal ? <AddPostModal onHide={() => this.setState({showAddPostModal: false})} userId={this.userId} user={this.state.user}/> : null}
                {this.state.showLoginModal ? <LoginModal onHide={() => this.setState({showLoginModal: false})} setUser={this.setUser} setUserId={this.setUserId}/> : null}
                {this.state.user ? <AddPostButton onClick={() => this.setState({showAddPostModal: true})}/> : null}
            </div>
        )
    }
}

export default App;