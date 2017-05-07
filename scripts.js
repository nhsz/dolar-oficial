(function main () {
  /* ----------------------------- CONFIG ----------------------------- */
  // dollar rate updated every 5m
  const updateFrequencyInMs = 500000

  // dollar api url
  const dollarApiUrl = 'https://crossorigin.me/https://www.cronista.com/MercadosOnline/json/MercadosGet.html?tipo=monedas&id=All'
  /* ------------------------------------------------------------------ */

  document.body.classList.add('spinner')

  var dollarRate = {
    valueBuy: 0,
    valueSell: 0
  }

  getValues()

  setInterval(function () {
    getValues()
  }, updateFrequencyInMs)

  function displayRates (buyRate, sellRate) {
    document.querySelector('.buy-rate').innerHTML = buyRate
    document.querySelector('.sell-rate').innerHTML = sellRate
  }

  function getValues () {
    $.ajax({
      type: 'GET',
      url: dollarApiUrl,
      dataType: 'json',
      success: function (data) {
        callback(data)
      }
    })

    function callback (data) {
      dollarRate.valueBuy = data.monedas[0].Compra
      dollarRate.valueSell = data.monedas[0].Venta
      removeOverlay()
      displayRates(dollarRate.valueBuy, dollarRate.valueSell)
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
