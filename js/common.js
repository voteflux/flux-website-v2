// http://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
function getParam(val) {
  var result = undefined,
    tmp = [];
  location.search
  //.replace ( "?", "" )
  // this is better, there might be a question mark inside
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

// modified above
function hashParam(val) {
  var result = undefined,
    tmp = [];
  location.hash
  //.replace ( "#", "" )
  // this is better, there might be a hash inside
    .substr(1)
    .split("&")
    .forEach(function (item) {
      tmp = item.split("=");
      if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    });
  return result;
}

function getAuthToken() {
  var getParamS = getParam('s');
  var lsS = localStorage.getItem('s');
  var hashS = hashParam('s');
  if (getParamS) {
    return getParamS;
  } else if (hashS) {
    return hashS;
  }
  return lsS;
}

if (getParam('s') !== undefined) {
  localStorage.setItem('s', getParam('s'));
}

if (hashParam('s') !== undefined) {
  localStorage.setItem('s', hashParam('s'));
}


function flux_api(path) {
  if (path[0] === "/") {
    path = path.slice(1)  // remove slash at front
  }
  if (path.slice(0, 3) !== 'api') {
    path = 'api/v0/' + path;
  }
  if (__DEV__ && __DEV_HOSTNAME__) {
    return [__DEV_HOSTNAME__, path].join(__DEV_HOSTNAME__[__DEV_HOSTNAME__.length - 1] === "/" ? "" : "/");
  }
  if ((window.location.hostname === "flux-api-dev.herokuapp.com" && !getParam('prod')) || getParam('useDev') || location.port.length >= 4) {
    return "https://dev.v1.api.flux.party/" + path;
  }
  if (!getParam('prod') && (getParam('debug') || window.location.hostname === 'localhost' /* || window.location.hostname === '127.0.0.1' */)) {
    return "http://localhost:5000/" + path;
  }
  return "https://prod.v1.api.flux.party/" + path;
};


function handle_output_model_decorator(host_obj, field_name) {
  var r = function (data) {
    host_obj[field_name] = JSON.stringify(data);
    console.log('Got some data!', data);
  }
  return r;
}

function jsonDumps(obj) {
  return JSON.stringify(obj);
}


function tsToDate(ts) {
  return new Date(1000 * ts);
}
