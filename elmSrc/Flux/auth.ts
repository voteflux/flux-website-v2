export const notifyAuthStatus = (app) => {
  const authToken = localStorage.getItem('s');
  if (authToken !== undefined) {
    app.ports.isAuthenticated.send(authToken);
  }
  console.log('Auth Status:', authToken);
}
