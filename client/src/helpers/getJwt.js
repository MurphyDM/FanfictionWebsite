export const getJwt = () => {
    return 'jwt ' + localStorage.getItem('jwt');
  };