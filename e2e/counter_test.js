Feature('counter');

Scenario('counts, shows the parity, and resets', ({ I }) => {
  I.amOnPage('/');
  I.see('0', '[data-testid="count"]');
  I.seeElement('button:disabled');
  I.click('Increment');
  I.click('Increment');
  I.click('Increment');
  I.see('3', '[data-testid="count"]');
  I.see('odd', '[data-testid="parity"]');
  I.click('Reset');
  I.see('0', '[data-testid="count"]');
  I.see('even', '[data-testid="parity"]');
});

Scenario('has a page title', ({ I }) => {
  I.amOnPage('/');
  I.seeInTitle('BrigadeExampleAngular');
});
