// https://docs.cypress.io/api/introduction/api.html

describe('TodoList', () => {
  it('Visits the todolist page', () => {
    cy.visit('/');
    cy.get('h1').contains('Todo list');
  });

  it('Cannot see the remove done button on start', () => {
    cy.get('.todoList__removeDone').should('not.exist');
  });

  it('Adds a todo', () => {
    cy.get('.todoNew__input').type('eat');
    cy.get('.todoNew__addButton').click();
    cy.get('.todoItem').should('have.length', 1);
    cy.get('.todoItem').contains('eat');
  });

  it('Edits the todo name', () => {
    cy.get('.todoItem__name').click();
    cy.get('.todoItem__edit input').clear();
    cy.get('.todoItem__edit input').type('drink');
    cy.get('.todoItem__edit button').click();
    cy.get('.todoItem__name').contains('drink');
  });

  it('Can see the disabled remove done button', () => {
    cy.get('.todoList__removeDone:disabled').should('exist');
  });

  it('Checks a todo', () => {
    cy.get('.todoItem__checkbox').click();
    cy.get('input:checked').should('have.length', 1);
  });

  it('Adds another todo', () => {
    cy.get('.todoNew__input').type('sleep');
    cy.get('.todoNew__addButton').click();
    cy.get('.todoItem').should('have.length', 2);
  });

  it('Remove the done todos', () => {
    cy.get('.todoList__removeDone').click();
    cy.get('.todoItem').should('have.length', 1);
    cy.get('.todoItem').contains('sleep');
  });
});
