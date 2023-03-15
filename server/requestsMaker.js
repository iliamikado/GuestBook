const url = 'http://localhost:3001/';

function get(path) {
    fetch(url + path).then(data => {
        return data.json();
    }).then(data => {
        console.log(data);
    });
}
function post(path, body) {
    fetch(url + path, {method: 'POST', body: JSON.stringify(body), headers: {'Content-Type': 'application/json'}}).then(data => {
        console.log(data);
        return data.json();
    }).then(data => {
        console.log(data);
    });
}

post('posts', {text: "Hello second world!"});