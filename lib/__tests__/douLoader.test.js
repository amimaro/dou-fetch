const assert = require('assert');
const douFetch = require('../index.js');

describe('douLoader', () => {
  it('has a test', () => {
    douFetch()
      .then(res => {
        assert(res.length === 10, 'douFetch success');
      })
      .catch(e => {
        console.error(e);
        assert(false, 'douFetch error');
      });
  });
});
