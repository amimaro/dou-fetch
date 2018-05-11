'use strict'

const fs = require('fs')
const path = require('path')
const axios = require('axios')
const cheerio = require('cheerio')
const URL = 'http://bibliotecadigital.mpf.mp.br'
const MAIN_PAGE = '/bdmpf/handle/11549/5396'
const PATH = path.resolve(__dirname)

async function loadPages() {
  const res = await axios.get(URL + MAIN_PAGE)
  const $ = cheerio.load(res.data)
  const links = $('a')
  let list = []
  $(links).each((i, link) => {
    if ($(link).text().indexOf('DOU - DIÁRIO OFICIAL DA UNIÃO') >= 0)
      list.push({
        text: $(link).text(),
        docPage: $(link).attr('href')
      })
  })
  return list
}

async function loadDocument(document) {
  const res = await axios.get(URL + document.docPage)
  const $ = cheerio.load(res.data)
  const links = $('a')
  let documentURL = ''
  $(links).each(function(i, link) {
    if ($(link).text() === 'Visualizar/Abrir') {
      documentURL = $(link).attr('href')
    }
  })
  return documentURL
}

loadPages().then((pages) => {
  for (let page of pages) {
    loadDocument(page).then((res) => {
      axios.get(URL + res).then((res) => {
        var blob = new Blob([res.data], {
          type: 'application/pdf'
        })
        console.log(blob)
      })
    })
  }
})
