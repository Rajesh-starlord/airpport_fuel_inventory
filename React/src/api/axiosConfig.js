import axios from 'axios';

const KEY = 'AIzaSyCI3ygUp8N9SWZtF3AebYOAlXh1eVocPWM';
const Token = localStorage.getItem('Token');
 export default axios.create({
  //baseURL:'http://456-node-12.code2rock.mindfire-solutions.in/',
  baseURL:'http://localhost:8080/',
  headers:{
    "x-access-token":Token,
  }
})