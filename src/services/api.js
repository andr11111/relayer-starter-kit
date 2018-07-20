class Api {
    constructor(apiUrl) {
        this.apiUrl = apiUrl || "http://localhost:8000";
    }

    /**
     * Makes a GET request to the API server, and returns a promise
     * with the resulting JSON response.
     *
     * @example
     * get("loanRequests");
     * => <Promise>
     *
     * // Specifying only orders with REP as then collateral.
     * get("loanRequests?collateralTokenSymbol=REP");
     * => <Promise>
     *
     * @param resource
     * @returns {Promise<any>}
     */
    get(resource = "loanRequests") {
        const sort = "createdAt";
        const order = "desc";

        return new Promise((resolve, reject) => {
            fetch(`${this.apiUrl}/${resource}?_sort=${sort}&_order=${order}`)
                .then((response) => resolve(response.json()))
                .catch((reason) => reject(reason));
        });
    }

    /**
     * Creates a new resource by posting the given data to the API.
     *
     * @param resource
     * @param data
     * @returns {Promise<any>}
     */
    create(resource = "loanRequests", data) {
        return new Promise((resolve, reject) => {
            fetch(`${this.apiUrl}/${resource}`, {
                method: "POST",
                cache: "no-cache",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })
                .then(() => resolve())
                .catch((reason) => reject(reason));
        });
    }
}

export default Api;
