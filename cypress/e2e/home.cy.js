describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('should display calendar with current date, month and year', () => {
    const monthYearDisplay = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    cy.get('.calendar').should('be.visible')
    cy.get('.month-n-year').should('contain.text', monthYearDisplay)
  })

  it('should display event when clicked 1st March', () => {
    cy.get('.date-1').find('.red-dot').should('be.visible')
    cy.wait(1000)
    cy.get('.date-1').click()
    cy.get('.event-list').should('be.visible')
    cy.get('.date-1').should('have.css', 'background-color', 'rgb(251, 63, 74)')
  })

  it('should not display any event when clicked 2nd March', () => {
    cy.wait(1000)
    cy.get('.date-2').click()
    cy.get('.event-list').should('not.exist')
    cy.get('.date-2').should('have.css', 'background-color', 'rgb(251, 63, 74)')
  })

  it('should display next month when clicked right arrow', () => {
    const today = new Date()
    const dateOfNextMonth = new Date(today.setMonth(today.getMonth() + 1))
    const monthYearDisplay = dateOfNextMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    cy.get('.right-arrow').click()
    cy.get('.month-n-year').should('contain.text', monthYearDisplay)
  })

  it('should display previous month when clicked left arrow', () => {
    const today = new Date()
    const dateOfNextMonth = new Date(today.setMonth(today.getMonth() - 1))
    const monthYearDisplay = dateOfNextMonth.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    cy.get('.left-arrow').click()
    cy.get('.month-n-year').should('contain.text', monthYearDisplay)
  })
})
