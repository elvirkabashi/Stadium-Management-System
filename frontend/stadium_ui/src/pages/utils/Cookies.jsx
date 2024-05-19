import Cookies from 'js-cookie';

export const getAuthToken = () => {
  const cookieToken = Cookies.get('token');
  if (cookieToken) {
    return cookieToken;
  }
  return null;
};
