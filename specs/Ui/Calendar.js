define([
  'intern!bdd',
  'intern/chai!assert',
  'specs/helpers'
], function(bdd, assert, helpers) {
  bdd.describe('Ui.Calendar', function() {

    bdd.describe('Enabled', function() {
      var calendar;

      bdd.beforeEach(function() {
        calendar = helpers
          .getElement(this.remote, 'td:first-child ui-calendar')
      })

      bdd.it("should have 42 cells", function(){
        return calendar
          .findAllByCssSelector('ui-calendar-cell')
          .then(function(elements){
            assert.lengthOf(elements, 42)
          })
      })

      bdd.it("should show the year and month", function(){
        return calendar
          .findByCssSelector('ui-container div')
          .getVisibleText()
          .then(function(text){
            assert.equal(text, '2015 - May');
          })
      })

      bdd.it("should change month when clicking on the chevron-right icon", function(){
        return calendar
          .findByCssSelector('.ion-chevron-right')
          .click()
          .findByXpath('//*[contains(.,"2015 - June")]')
      })

      bdd.it("should change month when clicking on the chevron-left icon", function(){
        return calendar
          .findByCssSelector('.ion-chevron-left')
          .click()
          .findByXpath('//*[contains(.,"2015 - April")]')
      })

      bdd.it("should have selected date", function(){
        return calendar
          .findByCssSelector('ui-calendar-cell.selected')
      })

      bdd.it("should select date after clickink on it", function(){
        return calendar
          .findByCssSelector('ui-calendar-cell:nth-child(6)')
          .click()
          .end()
          .findByCssSelector('ui-calendar-cell:nth-child(6).selected')
      })

      bdd.it("should not select date after clickink on inactive cell", function(){
        return calendar
          .findByCssSelector('ui-calendar-cell:nth-child(1)')
          .click()
          .sleep(250)
          .end()
          .findByCssSelector('ui-calendar-cell:nth-child(1):not(.selected)')
      })
    })
  })
})
