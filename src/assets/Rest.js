class RestConstructor {
    getContent(path) {
        return this.sendPost({ path: path }, 'open');
    };

    removeFile(path) {
        return this.sendPost({ obj: path }, 'remove');
    };

    moveFile(obj, pathTo) {
        return this.sendPost({ obj: obj, pathTo: pathTo }, 'move');
    };

    copyFile(obj, pathTo) {
        return this.sendPost({ obj: obj, pathTo: pathTo }, 'copy');
    };

    async sendPost(req, type) {
        const response = await fetch(`http://localhost:3000/${type}`, {
                method: 'POST',
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(req)
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message)
        }
        return result;
    };
}
;

export const rest = new RestConstructor();