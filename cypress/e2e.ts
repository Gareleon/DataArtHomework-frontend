describe("Joke Display", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display a joke with question and answer", () => {
    cy.get('[data-testid="joke-question"]')
      .should("be.visible")
      .and("not.be.empty");
    cy.get('[data-testid="joke-answer"]')
      .should("be.visible")
      .and("not.be.empty");
  });

  it("should show emoji reactions with vote counts", () => {
    cy.get('[data-testid="emoji-reaction"]').should(
      "have.length.greaterThan",
      0
    );
    cy.get('[data-testid="emoji-vote-count"]').each(($el) => {
      cy.wrap($el).should("contain.text", /\d+/);
    });
  });

  it("should navigate to the next joke on button click", () => {
    cy.get('[data-testid="joke-question"]')
      .invoke("text")
      .then((firstJoke) => {
        cy.get('[data-testid="next-joke"]').click();
        cy.get('[data-testid="joke-question"]').should(
          "not.have.text",
          firstJoke
        );
      });
  });
});

describe("Voting System", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should allow voting using emoji reactions", () => {
    cy.get('[data-testid="emoji-reaction"]').first().click();
    cy.get('[data-testid="emoji-vote-count"]')
      .first()
      .invoke("text")
      .then((initialVote) => {
        cy.get('[data-testid="emoji-reaction"]').first().click();
        cy.get('[data-testid="emoji-vote-count"]')
          .first()
          .should(($count) => {
            expect(parseInt($count.text())).to.eq(parseInt(initialVote) + 1);
          });
      });
  });

  it("should update vote counts instantly via API", () => {
    cy.intercept("POST", "/api/vote").as("postVote");
    cy.get('[data-testid="emoji-reaction"]').first().click();
    cy.wait("@postVote").its("response.statusCode").should("eq", 200);
  });

  it("should maintain vote history for each joke", () => {
    cy.get('[data-testid="emoji-reaction"]').first().click();
    cy.get('[data-testid="next-joke"]').click();
    cy.get('[data-testid="next-joke"]').click(); // Going back to the first joke (assuming circular navigation)
    cy.get('[data-testid="emoji-vote-count"]')
      .first()
      .should("not.have.text", "0");
  });
});
