(function main () {
  /* ----------------------------- CONFIG ----------------------------- */
  const dollarApiUrl = 'https://crossorigin.me/https://www.cronista.com/MercadosOnline/json/MercadosGet.html?tipo=monedas&id=All'
  const updateFrequencyInMs = 1000 * 60 * 30  // dollar rate updated every 30m
  /* ------------------------------------------------------------------ */

  let dollarRate = {
    valueBuy: 0,
    valueSell: 0
  }

  const getDollarValues = () => {
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

  getDollarValues()
  document.body.classList.add('spinner')
  let overlayAlreadyRemoved = false

  setInterval(() => {
    getDollarValues()
  }, updateFrequencyInMs)

  const displayRates = (buyRate, sellRate) => {
    document.querySelector('.buy-rate').innerHTML = buyRate
    document.querySelector('.sell-rate').innerHTML = sellRate
    removeOverlay()
    overlayAlreadyRemoved = true
  }

  const removeOverlay = () => {
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
