const pgp = require('pg-promise')(/* options */);
const db = pgp(process.env.DB_URL || 'postgres://iliamikado:34343434@0.0.0.0:5432/guestbook');
const bcrypt = require('bcrypt');
const saltRounds = 8;

class DBManager {
    constructor() {
        this.webSockets = new Set();
    }

    async getPosts() {
        try {
            console.log('Getting posts');
            return await db.any('SELECT P.id, P.date, P.value, U.login FROM posts as P INNER JOIN users as U on P.user_id = U.id ORDER BY P.date DESC');
        } 
        catch(e) {
            console.log('Error on getPosts');
            console.log(e);
        }
    }

    addPost(post) {
        const now = new Date();
        db.one('INSERT INTO posts(user_id, date, value) VALUES($1, $2, $3) RETURNING id', [post.user_id, now, post.value])
            .then(({id}) => {
                console.log('Post added succesfuly');
                post.id = id;
                post.date = now;
                this.webSockets.forEach(ws => {
                    ws.send(JSON.stringify(post));
                });
            })
            .catch(error => {
                console.log('Error on addPost');
                console.log(error);
            });
    }

    addUser(user) {
        const passwordHash = bcrypt.hashSync(user.password, saltRounds);
        return db.one('INSERT INTO users(login, password) VALUES($1, $2) RETURNING id', [user.login, passwordHash])
            .then(({id}) => {
                console.log('User added succesfuly');
                return id;
            })
            .catch(error => {
                console.log('Error on addUser');
                console.log(error);
            });
    }

    async userExist(login) {
        return (await db.any('SELECT * from users WHERE login = $1', [login])).length > 0;
    }

    async userLogin(login, password) {
        return await db.any('SELECT id, password FROM users WHERE login = $1', [login]).then(data => {
            if (data[0] && bcrypt.compareSync(password, data[0].password)) {
                return data[0].id;
            }
        }).catch(() => (false));
    }

    addWS(ws) {
        this.webSockets.add(ws);
    }

    removeWs(ws) {
        this.webSockets.delete(ws);
    }

}


const dbManager = new DBManager();

module.exports = dbManager;


// dbManager.getPosts().then((data) => {console.log(data)});
// dbManager.addUser({login: 'iliamikado4', password: 'qwaqwa'}).then(console.log);
// dbManager.addPost({user_id: 1, value: 'Hello, World3!'});
// dbManager.userLogin('iliamikado2', 'qwaqwa').then(console.log);