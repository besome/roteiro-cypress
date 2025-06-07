describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Cria e edita uma tarefa', () =>{
    cy.visit('');

     cy.get('[data-cy=todo-input]')
      .type('Garfield{enter}')

      cy.get ('[data-cy=todos-list] li')
      .first()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Garfield');

      cy.get('[data-cy=todos-list] li')
      .first()
      .dblclick()
      .get('.edit')
      .clear()
      .type('Marmore{enter}');

      cy.get('[data-cy=todos-list] li')
      .first()
      .should('have.text', 'Marmore')
      .and('not.have.class', 'editing');

  });

  it('verifica se está vazio', () =>{
    cy.visit('');

    cy.get('[data-cy=todos-list]')
    .children()
    .should('have.length',0); 
  });

  it('deve marcar e desmarcar uma tarefa corretamente', () => {
  cy.visit('');

  cy.get('[data-cy=todo-input]')
  .type('Garfield{enter}');

  cy.get('[data-cy=todos-list] li')
    .first()
    .find('[data-cy=toggle-todo-checkbox]')
    .click()
    .should('be.checked');

  cy.get('[data-cy=filter-active-link]')
  .click();
  cy.get('[data-cy=todos-list] li')
  .should('not.exist');

  cy.get('[data-cy=filter-completed-link]')
  .click();
  cy.get('[data-cy=todos-list] li')
    .should('have.length', 1)
    .and('contain.text', 'Garfield');

  cy.get('[data-cy=todos-list] li')
    .first()
    .find('[data-cy=toggle-todo-checkbox]')
    .click();

  cy.get('[data-cy=filter-active-link]')
  .click();
  cy.get('[data-cy=todos-list] li')
    .should('have.length', 1)
    .and('contain.text', 'Garfield');
});
});