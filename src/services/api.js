class Api {
    constructor(apiUrl) {
        this.apiUrl = apiUrl || "http://localhost:8000";
    }

    /**
     * Makes a GET request to the API server, and returns a promise
     * with the resulting JSON response.
     *
     * @example
     * get("orders");
     * => <Promise>
     *
     * @param path
     * @returns {Promise<any>}
     */
    get(path = "loanRequests") {
        return new Promise((resolve, reject) => {
            fetch(`${this.apiUrl}/${path}`).then((response) => {
                resolve(response.json());
            }).catch((reason) => {
                reject(reason);
            });
        });
    }
}

export default Api;