// note_app.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username:"user1", password:"user1pass"
      }).then(response => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
    })

    it('front page can be opened', function() {
      cy.contains('Witch Hunting in the 16th century was pointless')
      cy.contains('1')
    })

    it('open login form', function() {
      cy.contains('login').click()
      cy.get('#Username').type('user1')
      cy.get('#Password').type('user1pass')
      cy.get("#login-button").click()
    })

    it('create new blog pose', function(){
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('test.com')
      cy.get('#submit-btn').click()
    })


  })