(() => {
  if (!authService.isAuth() || authService.isTokenExpired()) {
    alert('Log in to view your bdo meal calculator.');
    authService.logout();
  }
})();