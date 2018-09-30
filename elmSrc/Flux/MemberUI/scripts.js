// NOTE: This file is not used it production
// It's just here to allow elm-live to work (`yarn memberui`)
import { notifyAuthStatus } from "../auth";
export { notifyAuthStatus } from '../auth';
var app = Elm.Flux.MemberUI.Main.fullscreen();
notifyAuthStatus(app);
//# sourceMappingURL=scripts.js.map