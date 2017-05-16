(function main () {
  /* ----------------------------- CONFIG ----------------------------- */
  const dollarApiUrl = 'https://crossorigin.me/https://www.cronista.com/MercadosOnline/json/MercadosGet.html?tipo=monedas&id=All'
  const updateFrequencyInMs = 1000 * 60 * 20  // dollar rate updated every 20m
  /* ------------------------------------------------------------------ */

  var dollarRate = {
    valueBuy: 0,
    valueSell: 0
  }

  getDollarValues()
  document.body.classList.add('spinner')
  var overlayAlreadyRemoved = false

  setInterval(function () {
    getDollarValues()
  }, updateFrequencyInMs)

  function getDollarValues () {
    fetch(dollarApiUrl)
    .then(function (response) {
      return response.json()
    }).then(function (json) {
      dollarRate.valueBuy = json.monedas[0].Compra.toFixed(2)
      dollarRate.valueSell = json.monedas[0].Venta.toFixed(2)
      displayRates(dollarRate.valueBuy, dollarRate.valueSell)
    }).catch(function (error) {
      console.log(error)
    })
  }

  function displayRates (buyRate, sellRate) {
    document.querySelector('.buy-rate').innerHTML = buyRate
    document.querySelector('.sell-rate').innerHTML = sellRate
    removeOverlay()
    overlayAlreadyRemoved = true
  }

  function removeOverlay () {
    if (!overlayAlreadyRemoved) {
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
