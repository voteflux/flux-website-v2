

const Elm = require('./Main.elm');
// const mountNode = document.getElementById('memberUiElm');
// const app = Elm.Flux.MemberUI.Main.embed(mountNode);
const app = Elm.Flux.MemberUI.Main.fullscreen();

const auth = require('../auth');
auth.notifyAuthStatus(app);
