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
        console.log(this.data);
    }

    getPosts() {
        return this.data.posts;
    }

    addPost(post) {
        post.id = this.data.posts.length;
        this.data.posts.push(post);
        this.writeToFile();
    }

    addUser(user) {
        this.data.users.push(user);
        this.writeToFile();
    }

    writeToFile() {
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    }
}


const fileManager = new FileManager();

module.exports = fileManager;