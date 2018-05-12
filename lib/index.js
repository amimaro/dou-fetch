'use strict';

const axios = require('axios');
const cheerio = require('cheerio');
const URL = 'http://bibliotecadigital.mpf.mp.br';
const MAIN_PAGE = '/bdmpf/handle/11549/5396';

const isDocumentLink = function(text) {
  if (text.indexOf('DOU - DIÁRIO OFICIAL DA UNIÃO') >= 0) {
    return true;
  }
  if (text.indexOf('Visualizar/Abrir') >= 0) {
    return true;
  }
  return false;
};

const getDocumentsPageList = async function() {
  const res = await axios.get(URL + MAIN_PAGE);
  const $ = cheerio.load(res.data);
  const links = $('a');
  let list = [];
  $(links).each((i, link) => {
    if (isDocumentLink($(link).text()))
      list.push({
        text: $(link).text(),
        docPage: $(link).attr('href')
      });
  });
  return list;
};

const getDocumentsList = async function(documentsPageList) {
  let documentsList = [];
  for (let documentPage of documentsPageList) {
    const res = await axios.get(URL + documentPage.docPage); // eslint-disable-line
    const $ = cheerio.load(res.data);
    const links = $('a');
    $(links).each(function(i, link) {
      if (isDocumentLink($(link).text())) {
        documentsList.push($(link).attr('href'));
      }
    });
  }
  return documentsList;
};

async function douFetch() {
  try {
    const documentsPageList = await getDocumentsPageList();
    const documentsList = getDocumentsList(documentsPageList);
    return documentsList;
  } catch (e) {
    throw e;
  }
}

module.exports = douFetch;
