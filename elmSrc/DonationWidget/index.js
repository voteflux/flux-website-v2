const Elm = require('./Main.elm');
const mountNode = document.getElementById('donationWidgetElm');
const app = Elm.DonationWidget.Main.embed(mountNode);
