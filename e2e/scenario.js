describe('Location Search', function() {

  it('Has 15 Widgets', function() {
    browser.ignoreSynchronization = true;
    browser.driver.get('http://beyer.mralexandernickel.com/').then(function() {
      var widgetsContainer = element(by.id('widgets'));
      var childrenLength = browser.executeScript('return arguments[0].childElementCount', widgetsContainer);
      expect(childrenLength).toBe(15);
    });
  });

});