const Elm = require('./Main.elm');
const mountNode = document.getElementById('donationLogElm');
const app = Elm.DonationLog.Main.embed(mountNode);
