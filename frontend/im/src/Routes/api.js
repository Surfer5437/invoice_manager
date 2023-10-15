import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class ImApi {
  // the token for interactive with the API will be stored here.
  static token;
  
  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${ImApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers, withCredentials:true })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return (res.company);

  }


   static async getCompanies() {
    try{
      let res = await this.request(`companies/`);
    return (res);
    } catch (err){
      return null;
    }
  }

  static async getUsers() {
    try{
      let res = await this.request(`users/`);
    return (res);
    } catch (err){
      return null;
    }
  }

  static async getJobs() {
    let res = await this.request(`jobs/`);
    return (res);

  }

  static async postUser(info) {
    let res = await this.request(`auth/register/`, info, 'post' );
    return (res);
  }
  
  static async loginUser(info) {
    let res = await this.request(`auth/token/`, info, 'post' );
    return (res);
  }

  static async logoutUser() {
    let res = await this.request(`auth/logout/`);
    return (res);
  }

  static async getCurrentUser(info) {
    let res = await this.request(`users/${info}`);
    return (res);
  }

  static async applyToJob(user, jobId){
    // /users/:username/jobs/:id
    let res = await this.request(`users/${user}/jobs/${jobId}`,{}, 'post');
    return (res);
  }



}


    export default ImApi;