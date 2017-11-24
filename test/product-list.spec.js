const Nightmare = require('nightmare');
const logger = require('./logger');
const { expect } = require('chai');

const nightmare = new Nightmare({
  show: true,
  typeInterval: 20,
  pollInterval: 50,
});

describe('Product list', () => {
  before(function* before() {
    yield nightmare;
  });

  after(function* after() {
    yield nightmare.end();
  });

  it('allows search by term and finds the correct category', () => {
    const start = new Date();
    return nightmare
      .on('did-finish-load', () => logger.performanceLogging(start))
      .goto('http://m.topshop.com/')
      .click('.Header-searchButton')
      .type('.SearchBar-queryInput', 'suit')
      .click('.SearchBar-button')
      .wait('.Product')
      .evaluate(() => Promise.all([
        document.querySelectorAll('.Product').length,
        document.querySelector('.RefinementSummary-value').innerText,
        document.querySelector('.PlpHeader-totalValue').innerText,
      ]))
      .end()
      .then(([productSize, refinementSummaryText, totalSizeText]) => {
        expect(productSize).least(10);
        expect(refinementSummaryText).to.equal('Workwear & Suits');
        expect(totalSizeText).to.equal('153');
      });
  });
});
