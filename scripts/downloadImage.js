'use strict'

const Fs = require('fs')
const Path = require('path')
const Axios = require('axios')

async function downloadImage () {

  const url = 'http://bibliotecadigital.mpf.mp.br/bdmpf/bitstream/handle/11549/147801/DOU2_20180509.pdf?sequence=1&isAllowed=y'
  const path = Path.resolve(__dirname, 'code.pdf')

  // axios image download with response type "stream"
  const response = await Axios({
    method: 'GET',
    url: url,
    responseType: 'stream'
  })

  // pipe the result stream into a file on disc
  response.data.pipe(Fs.createWriteStream(path))

  // return a promise and resolve when download finishes
  return new Promise((resolve, reject) => {
    response.data.on('end', () => {
      resolve()
    })

    response.data.on('error', () => {
      reject()
    })
  })

}

downloadImage()
