describe("Joke Display and Voting System", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // Joke Display Tests
  it("should display a joke with question and answer", () => {
    cy.get("p.font-bold.text-lg.md\\:text-xl.lg\\:text-2xl.text-gray-800")
      .should("be.visible")
      .and("not.be.empty"); // Question
    cy.get("p.text-gray-600.break-words.md\\:text-lg.lg\\:text-xl.text-center")
      .should("be.visible")
      .and("not.be.empty"); // Answer
  });

  // it("should display emoji reactions with vote counts", () => {
  //   cy.get("button")
  //     .should("have.length.greaterThan", 0)
  //     .each(($el) => {
  //       cy.wrap($el)
  //         .find("span.text-md.md\\:text-lg.font-bold")
  //         .should("be.visible");
  //       cy.wrap($el).find("span").last().should("be.visible");
  //     });
  // });

  it("should navigate to the next joke on button click", () => {
    cy.get("button").contains("Next Joke").click();
    cy.get(
      "p.font-bold.text-lg.md\\:text-xl.lg\\:text-2xl.text-gray-800"
    ).should("not.be.empty"); // New question should be displayed
  });

  // Voting System Tests
  it("should update vote count when an emoji is clicked", () => {
    cy.intercept("POST", "**/api/joke/**/vote").as("vote");

    cy.get("button")
      .first()
      .then(($el) => {
        const initialVoteCount = parseInt(
          $el.find("span.text-md.md\\:text-lg.font-bold").text()
        );

        cy.wrap($el).click();
        cy.wait("@vote");

        cy.wrap($el)
          .find("span.text-md.md\\:text-lg.font-bold")
          .should(($newCount) => {
            const updatedVoteCount = parseInt($newCount.text());
            expect(updatedVoteCount).to.eq(initialVoteCount + 1);
          });
      });
  });
});
