import Request from '../request';
import Normalize from './Normalize';

const AuthRequest = {
  /**
   *
   * @param {email, password1, password2, timestampm, username} data
   */
  register(data) {
    return Request().post('/join/', data)
      .then(res => Normalize.register.then(res))
      .catch(err => Normalize.register.catch(err));
  },
};

export default AuthRequest;