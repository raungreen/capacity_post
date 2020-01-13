import Axios from 'axios';

const functions = {
  fetchPost: () => {
    Axios.get('http://jsonplaceholder.typicode.com/posts/1')
      .then(res => res.data)
      .catch(err => 'error');
  }
};

module.exports = functions;
