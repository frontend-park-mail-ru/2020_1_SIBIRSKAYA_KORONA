import ApiService from "../../src/apiService.js";

export default class JoinModel {
    constructor() {
        this.api = new ApiService('http://localhost:8080/');
    }

    join(userInfo) {
        return this.api.join(userInfo);
    }
}