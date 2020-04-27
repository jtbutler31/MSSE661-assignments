(() => {
  if (!authService.isAuth() || authService.isTokenExpired()) {
    alert('Log in to view your bdo meals.');
    authService.logout();
  }
})();
