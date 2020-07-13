function RestConstructor() {    
    this.getContent = (path) => {
        return sendPost(JSON.stringify({path : path}), 'open');
    };

    this.removeFile = (path) => {
        return sendPost(JSON.stringify({obj : path}), 'remove');
    };

    this.moveFile = (obj, pathTo) => {
        return sendPost(JSON.stringify({obj : obj, pathTo: pathTo}), 'move');
    };

    this.copyFile = (obj, pathTo) => {
        return sendPost(JSON.stringify({obj : obj, pathTo: pathTo}), 'copy');
    };

    async function sendPost(req, type) {
        let response = await fetch(`http://localhost:3000/${type}`, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: req 
        });
        let result = await response.json();
        return result;
    };
};

export let rest = new RestConstructor();