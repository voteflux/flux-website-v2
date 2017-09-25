import 'babel-polyfill';

const startOfFYGen = () => {
  const now = new Date();
  const month = now.getMonth();
  if (month >= 6) {  // js months [0,11]; 6 => July; days are [1,31] // facepalm
    return new Date(now.getFullYear(), 6, 1);
  }
  return new Date(now.getFullYear() - 1, 6, 1);
}

const startOfFY = startOfFYGen();
console.log('Start of FY', startOfFY);


const isThisFY = x => x >= startOfFY;


const pushCoords = (d, data, filter = () => true) => {
  if (filter(d.ts, d.amount)) {
    data.x.push(d.ts);
    data.y.push(d.amount);
  }
};


const pushCoordsCumulative = (d, data, filter = () => true) => {
  const last = R.last(data.y) || 0.0;
  pushCoords({...d, amount: last + d.amount}, data, filter);
}


const processDonationGraphs = function (data) {
  const donationLog = R.pipe(
    R.reverse,
    R.map((obj) => ({...obj, ts: tsToDate(obj.ts), amount: parseFloat(obj.amount)}))
  )(data.data.donations);

  console.log('Donation Log: ', donationLog);


  const donationDataTotal = {
    x: [], y: [], type: 'scatter',
    mode: 'markers', marker: {size: 10}
  };
  const donationDataCumulative = {x: [], y: [], type: 'scatter'};
  const donationDataByJuriObj = {};
  const donationDataCumulativeStateObj = {};


  R.map(d => {
    pushCoords(d, donationDataTotal, isThisFY);
    if (donationDataByJuriObj[d.branch] === undefined) {
      donationDataByJuriObj[d.branch] = R.clone({
        x: [], y: [], type: 'scatter',
        mode: 'markers', marker: {size: 10}
      });
    }
    if (donationDataCumulativeStateObj[d.branch] === undefined) {
      donationDataCumulativeStateObj[d.branch] = R.clone({x: [], y: [], type: 'scatter'});
    }
    pushCoords(d, donationDataByJuriObj[d.branch], isThisFY);
    pushCoordsCumulative(d, donationDataCumulativeStateObj[d.branch])
  }, donationLog);


  let lastY = 0;
  R.map(([x, y]) => {
    let next = lastY + y;
    donationDataCumulative.x.push(x);
    donationDataCumulative.y.push(next);
    lastY = next;
  }, R.zip(donationDataTotal.x, donationDataTotal.y));


  const donationDataCumulativeState = [];
  const donationDataByJuri = [];
  const prepJuriData = (dataObj, dataList) => R.mapObjIndexed((v, k, obj) => dataList.push({...v, name: k}), dataObj);
  prepJuriData(donationDataCumulativeStateObj, donationDataCumulativeState);
  prepJuriData(donationDataByJuriObj, donationDataByJuri);


  console.log('DATA -> Donations sigma by state', donationDataCumulativeState);
  console.log('DATA -> Donations Cumulative:', donationDataCumulative);
  console.log('DATA -> Donations By Juri:', donationDataByJuri);
  console.log('DATA -> Donations Total:', donationDataTotal);


  Plotly.newPlot('donationGraphCumulativeDiv', [donationDataCumulative], {
    title: "Cumulative Donations",
    yaxis: {'rangemode': 'tozero', title: '$ AUD'},
    xaxis: {title: 'Date'}
  });

  Plotly.newPlot('donationGraphCumulativeStateDiv', donationDataCumulativeState, {
    title: "Cumulative Donations by Branch",
    yaxis: {'rangemode': 'tozero', title: '$ AUD'},
    xaxis: {title: 'Date'}
  });

  Plotly.newPlot('donationGraphTotalDiv', [donationDataTotal], {
    title: "Donations this FY Total",
    yaxis: {'rangemode': 'tozero', 'title': '$ AUD'},
    xaxis: {title: 'Date'}
  })

  Plotly.newPlot('donationGraphByJuriDiv', donationDataByJuri, {
    title: "Donations this FY by Branch",
    yaxis: {'rangemode': 'tozero', 'title': '$ AUD'},
    xaxis: {title: 'Date'}
  })

  return donationLog;
}
