//import { before } from "node:test";

describe("Navigation", () => {
  beforeEach(() => {
    cy.writeFile("public/tasks.json", {});
  });

  function addTask(taskName: string, taskStatus: string) {

    cy.get("#add-task-btn").click();
    cy.get("#new-task-name").type(taskName);
    cy.get("#task-status-select").click();
    cy.get(`#new-task-${taskStatus}`).click();
    cy.get("#submit-task").click();

  }

  it("should create a new task", () => {
    cy.visit("/");

    addTask("Test Task", "Incomplete");

    cy.contains("Test Task").should("be.visible");
    cy.get('[role="combobox"]').should("contain.text", "Incomplete");
  });

  it("should change the status of the newly created task", () => {
    cy.visit("/");

    addTask("Test Task", "Incomplete");

    cy.get('[role="combobox"]').click().get("#Completed").click();
    
    cy.contains("Test Task").should("be.visible");
    cy.get('[role="combobox"]').should("contain.text", "Completed");
  });
});
