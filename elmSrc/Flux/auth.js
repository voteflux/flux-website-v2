export var notifyAuthStatus = function (app) {
    var authToken = localStorage.getItem('s');
    if (authToken !== undefined) {
        app.ports.isAuthenticated.send(authToken);
    }
    console.log('Auth Status:', authToken);
};
//# sourceMappingURL=auth.js.map