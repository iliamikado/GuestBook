import { Component } from "react";
import { getPosts, createPostsSync } from "../../service/Service";

import './App.css';

import Header from "../Header/Header";
import PostCard from "../PostCard/PostCard";
import AddPostModal from "../AddPostModal/AddPostModal";
import AddPostButton from "../AddPostButton/AddPostButton";
import LoginModal from "../LoginModal/LoginModal";
import MySpinner from "../MySpinner/MySpinner";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            showAddPostModal: false,
            showLoginModal: false,
            user: null,
            postsLoading: false,
            register: false
        }
        this.userId = null;
    }

    componentDidMount() {
        this.setState({postsLoading: true});
        getPosts().then(posts => {
            this.setState({posts});
            this.setState({postsLoading: false});
        });
        createPostsSync((data) => {
            this.setState(({posts}) => ({posts: [data, ...posts]}));
        });
    }

    setUser = (user) => {this.setState({user})}
    setUserId = (userId) => {this.userId = userId}
    logout = () => {
        this.setState({user: null});
        this.userId = null;
    }

    render() {

        const posts = this.state.posts.map(post => {
            return (
                <PostCard post={post} key={post.id}/>
            )
        })

        return (
            <div>
                <Header 
                    openLoginModal={(register) => {this.setState({showLoginModal: true, register});}}
                    user={this.state.user}
                    logout={this.logout}
                    addPost={() => this.setState({showAddPostModal: true})}
                />
                {this.state.postsLoading ? <MySpinner/> : <div className="container">{posts}</div>}
                {this.state.showAddPostModal ? <AddPostModal onHide={() => this.setState({showAddPostModal: false})} userId={this.userId} user={this.state.user}/> : null}
                {this.state.showLoginModal ? <LoginModal onHide={() => this.setState({showLoginModal: false})} setUser={this.setUser} setUserId={this.setUserId} register={this.state.register}/> : null}
            </div>
        )
    }
}

export default App;