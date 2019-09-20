class Auth {
  constructor (obj) {
    console.log(1111,obj);
    this.app = getApp();
  }

  /**
   * 是否有权限
   */
  hasAuth () {
    return this.app.globalData.auth;
  }

}

export default Auth;