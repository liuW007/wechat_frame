import md5 from './md5.js';
import Auth from './auth.js';

module.exports = {
  md5,
  auth: (obj) => {
    return new Auth(obj)
  }
}