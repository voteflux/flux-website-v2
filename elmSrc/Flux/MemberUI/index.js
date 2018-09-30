var Elm = require('./Main.elm');
// const mountNode = document.getElementById('memberUiElm');
// const app = Elm.Flux.MemberUI.Main.embed(mountNode);
var app = Elm.Flux.MemberUI.Main.fullscreen();
var auth = require('../auth');
auth.notifyAuthStatus(app);
//# sourceMappingURL=index.js.map