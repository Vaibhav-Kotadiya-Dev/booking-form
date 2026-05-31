/// <reference types="cypress" />

describe("Booking Page", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
  });

  it("renders the form correctly", () => {
    cy.get("h1").contains("Let's get you on your way!");
    cy.get("button[type='submit']").contains("Continue");
  });

  it("validates empty fields on submit", () => {
    cy.get("button[type='submit']").click();

    cy.contains("Contact number is required").should("be.visible");
    cy.contains("Pickup location is required").should("be.visible");
    cy.contains("Drop location is required").should("be.visible");
    cy.contains("Number of passengers is required").should("be.visible");
  });

  it("shows additional contact fields for new numbers", () => {
    cy.get('[data-testid="contact-number"]').type("1234567890");
    
    cy.get("#first-name").should("exist");
    cy.get("#last-name").should("exist");
    cy.get("#email").should("exist");
    
    cy.contains("We do not have this phone number on file").should("be.visible");
  });

  it("handles returning customer with recognized number", () => {
    const testContact = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      lastUsed: new Date().toISOString()
    };
    
    localStorage.setItem('savedContacts', JSON.stringify({
      "9876543210": testContact
    }));

    cy.reload();

    cy.get('[data-testid="contact-number"]').type("9876543210");

    cy.contains("Welcome back, John!").should("be.visible");
    
    cy.get("#first-name").should("not.exist");
    cy.get("#last-name").should("not.exist");
    cy.get("#email").should("not.exist");
  });

  it("fills form and submits successfully for new customer", () => {
    cy.get('[data-testid="pickup-location"]').click();
    cy.get('[role="listbox"]').should('be.visible');
    cy.get('[data-value="NYC"]').click();

    cy.get('[data-testid="drop-location"]').click();
    cy.get('[role="listbox"]').should('be.visible');
    cy.get('[data-value="LAX"]').click();

    cy.get('[data-testid="contact-number"]').type("9876543210");
    
    cy.get("#first-name").should("be.visible").type("John");
    cy.get("#last-name").should("be.visible").type("Doe");
    cy.get("#email").should("be.visible").type("john@example.com");

    cy.get("#passengers").clear().type("3");

    cy.get("button[type='submit']").click();

    cy.contains("Booking submitted successfully!").should("be.visible");
  });

  it("fills form and submits successfully for returning customer", () => {
    const testContact = {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      lastUsed: new Date().toISOString()
    };
    
    localStorage.setItem('savedContacts', JSON.stringify({
      "5555555555": testContact
    }));

    cy.reload();

    cy.get('[data-testid="pickup-location"]').click();
    cy.get('[role="listbox"]').should('be.visible');
    cy.get('[data-value="CHI"]').click();

    cy.get('[data-testid="drop-location"]').click();
    cy.get('[role="listbox"]').should('be.visible');
    cy.get('[data-value="HOU"]').click();

    cy.get('[data-testid="contact-number"]').type("5555555555");

    cy.contains("Welcome back, Jane!").should("be.visible");

    cy.get("#first-name").should("not.exist");
    cy.get("#last-name").should("not.exist");
    cy.get("#email").should("not.exist");

    cy.get("#passengers").clear().type("2");

    cy.get("button[type='submit']").click();

    cy.contains("Booking confirmed! Thanks for choosing us again, Jane!").should("be.visible");
  });

  it("shows validation errors when fields are invalid", () => {
    cy.get('[data-testid="contact-number"]').type("12345"); // Less than 10 digits
    
    cy.get("button[type='submit']").click();
    
    cy.contains("Enter a valid 10-digit number").should("be.visible");
    
    cy.get('[data-testid="contact-number"]').clear().type("1234567890");
    
    cy.get("button[type='submit']").click();
    
    cy.contains("First name is required").should("be.visible");
    cy.contains("Last name is required").should("be.visible");
    cy.contains("Email is required").should("be.visible");
  });
});