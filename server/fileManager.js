const fs = require('fs');

class FileManager {
    constructor() {
        this.path = __dirname + '/db.json';
        try {
            this.data = JSON.parse(fs.readFileSync(this.path, "utf-8"));
        } catch {
            this.data = {
                users: [],
                posts: []
            }
        }
        this.webSockets = new Set();
    }

    getPosts() {
        return this.data.posts;
    }

    addPost(post) {
        post.id = this.data.posts.length;
        this.data.posts.unshift(post);
        this.webSockets.forEach(ws => {
            ws.send(JSON.stringify(post));
        });
        this.writeToFile();
    }

    addUser(user) {
        this.data.users.push(user);
        this.writeToFile();
    }

    userExist(login) {
        return this.data.users.find((user) => (login === user.login));
    }

    userLogin(login, password) {
        return this.data.users.find((user) => (login === user.login && password === user.password));
    }

    writeToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }

    addWS(ws) {
        this.webSockets.add(ws);
        console.log(this.webSockets.size);
    }

    removeWs(ws) {
        this.webSockets.delete(ws);
    }

}


const fileManager = new FileManager();

module.exports = fileManager;