describe('Visitng the page creates a GET request for resources and user sign in list', () => {
    it('Visits the mainpage loads resources', () => {
      cy.intercept('https://fone-study-resources.herokuapp.com/resources').as("fetchResource");
      cy.visit('https://fone-study-resources.netlify.app')
      cy.wait("@fetchResource");
    })

    it('checks for user get request', () => {
      cy.intercept('https://fone-study-resources.herokuapp.com/users').as("fetchUsers");
      cy.visit('https://fone-study-resources.netlify.app')
      cy.wait("@fetchUsers");
      })
  });

describe('Clicking on a resource button opens the resource in a new tab', () => {
  //works 50% of the time an monitors window opening action before it actually opens
    it('opens a new window', () => {
      const stub = cy.stub().as('open')
      cy.on('window:before:load', (win) => {
        cy.stub(win, 'open').callsFake(stub)
      })
    
      cy.intercept('https://fone-study-resources.herokuapp.com/resources').as("fetchResource");
      cy.visit('https://fone-study-resources.netlify.app')
      cy.wait("@fetchResource");
      cy.get("button").contains("Go To Youtube Video").click()
      cy.get('@open').should('have.been.calledOnce')

    });
});

describe("suite of test to search for a resource", () => {
  it("should find one resource when searching algebra", () =>{
    cy.intercept('https://fone-study-resources.herokuapp.com/resources').as("fetchResource");
    cy.visit('https://fone-study-resources.netlify.app')
    cy.wait("@fetchResource");
    cy.contains("algebra")
    cy.contains("sandbox")
    cy.contains("TKinter")
    cy.get("input").type("algebra")
    cy.wait(1000)
    cy.contains("algebra")
    cy.contains("sandbox").should("not.exist")
    cy.contains("TKinter").should("not.exist")
  })
  it("clears search input", ()=> {
    cy.get("button").contains("Clear Search").click()
    cy.contains("algebra")
    cy.contains("sandbox")
    cy.contains("TKinter")
  })
})


describe("suite of tests to log user in", ()=> {
  it("should log a user in", () => {
    cy.intercept('https://fone-study-resources.herokuapp.com/users').as("fetchUsers");
    cy.visit('https://fone-study-resources.netlify.app')
    cy.wait("@fetchUsers");
    cy.contains("Create Resource").should("not.exist")
    cy.contains("Choose user")
    cy.get("select").select("James")
    cy.wait(1000)
    cy.contains("Create Resource")
    cy.contains("Sign-out from James")
  });
  it("should log user out", () =>{
    cy.get("a").contains("Sign-out from James").click()
    cy.wait(1000)
    cy.contains("Create Resource").should("not.exist")
  })
})