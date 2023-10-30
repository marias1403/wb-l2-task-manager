class Api {
  constructor() {
    this.token = '';
  }
  makeAuthRequest(userData) {
    const secretKey = 'your_secret_key';
    this.token = this._createToken(userData, secretKey, 60 * 60 * 24 * 30);
    return this.token;
  }

  _createToken(data, secretKey) {
    const header = {
      alg: 'HS256',
      typ: 'JWT',
    };
    const headerBase64 = btoa(JSON.stringify(header));
    const dataBase64 = btoa(JSON.stringify(data));
    const signature = btoa(headerBase64 + '.' + dataBase64 + secretKey);
    return headerBase64 + '.' + dataBase64 + '.' + signature;
  }

  addTask(jwt) {
    if (jwt) {
      return true;
    }
  }

  editTask(jwt) {
    if (jwt) {
      return true;
    }
  }

  deleteTask(jwt) {
    if (jwt) {
      return true;
    }
  }

  checkTask(jwt) {
    if (jwt) {
      return true;
    }
  }
}

const api = new Api();

export default api;
