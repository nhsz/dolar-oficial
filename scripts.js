(function main () {
  /* ----------------------------- CONFIG ------------------- */
  // dollar rate updated every 2s
  var updateFrequencyInMs = 1000

  // dollar api url
  var dollarApiUrl = 'https://api.bluelytics.com.ar/v2/latest'
  /* -------------------------------------------------------- */

  document.body.classList.add('spinner')

  var dollarRate = {
    valueBuy: getValueBuy(),
    valueSell: getValueSell()
  }

  setInterval(function () {
    displayRates(dollarRate.valueBuy, dollarRate.valueSell)
  }, updateFrequencyInMs)

  function displayRates (buyRate, sellRate) {
    removeOverlay()
    document.querySelector('.buy-rate').innerHTML = buyRate
    document.querySelector('.sell-rate').innerHTML = sellRate
  }

  function getValueBuy () {
    $.ajax({
      type: 'GET',
      url: dollarApiUrl,
      dataType: 'jsonp',
      success: function (data) {
        callback(data)
      }
    })

    function callback (data) {
      dollarRate.valueBuy = data.oficial.value_buy
    }
  }

  function getValueSell () {
    $.ajax({
      type: 'GET',
      url: dollarApiUrl,
      dataType: 'jsonp',
      success: function (data) {
        callback(data)
      }
    })

    function callback (data) {
      dollarRate.valueSell = data.oficial.value_sell
    }
  }

  function removeOverlay () {
    if ($('#overlay').length !== 0) {
      document.querySelector('#overlay').remove()
      document.body.classList.remove('spinner')
    }
  }

  // register service worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('service-worker.js')
      .then(function () {
        console.log('Service Worker Registered')
      })
  }
})()
