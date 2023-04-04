const url = process.env.REACT_APP_PATH_FOR_HTTP || 'http://localhost:3001/';
const ws_url = process.env.REACT_APP_PATH_FOR_WS || "ws://localhost:3001/";

function createPostsSync(onMessage) {
    let socket = new WebSocket(ws_url + 'posts_sync');

    socket.onmessage = function(event) {
        onMessage(JSON.parse(event.data));
    }

    socket.onopen = function(event) {
        console.log('WebSocket opened');
    }
}

async function getResource(path='') {
    return await fetch(url + path).then(data => (data.json()));
}

async function postResource(path='', body) {
    return await fetch(url + path, {method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}}).then(data => {
        return data.json();
    });
}

async function getPosts() {
    return await getResource('posts');
}

async function postPost(post) {
    return await postResource('posts', post);
}

async function postUser(user) {
    return await postResource('users', user);
}

async function loginUser(user) {
    return await postResource('users/login', user);
}

export {getPosts, postPost, createPostsSync, postUser, loginUser};