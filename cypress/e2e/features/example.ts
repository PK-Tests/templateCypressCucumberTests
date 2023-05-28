/// <reference types='cypress' />
import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';

Given('user navigates to testing site', () => {
    cy.visit('/')
});

Given('chooses "type" section', () => {
    cy.get('li>a').contains('type').click();
});

When('user fills out credentaials', () => {
    cy.get('#email1').type('example.email@nonexistinggmail.com');
    cy.get('#password1').type('XRSIJH76553*/"/(:');
});

When('confirms form', () => {
    cy.get('button').contains('Submit').click();
});

Then('form is submitted', () => {
    cy.get('button').contains('Submit').parents('.well').find('p').then(($confirmation) => {
        expect($confirmation).to.have.text('Your form has been submitted!');
        expect($confirmation).to.have.attr('style', 'color: rgb(32, 181, 32);');
    })
});
