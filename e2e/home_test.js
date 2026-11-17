Feature('home');

Scenario('shows the title', ({ I }) => {
  I.amOnPage('/');
  I.see('Hello, brigade-example-angular', 'h1');
});
