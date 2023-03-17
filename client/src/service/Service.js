const url = 'http://localhost:3001/';

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
    postResource('posts', post);
}

export {getPosts, postPost};