class Hotels {
    elements = {
        locations: () => cy.get(".d4924c9e74 span[data-testid='address']"),
        checkBoxes: () => cy.get("[data-filters-item='class:class=4']>input"),
        resultPages: () => cy.get("ol.a8b500abde li"),
        nextPageBtn: () => cy.get("[data-testid='pagination'] [aria-label='Next page']"),
        starsContainer: () => cy.get(".f919b8b3d5 .fbb11b26f5"),
        //noProp: () => cy.get("div.db29ecfbe2 > .f9afbb0024"),
        //tip: () => cy.get("div.db29ecfbe2 > .db29ecfbe2"),
    }

    gotoNextPage() {
        this.elements.nextPageBtn().click();
    }

    select4StarCheckBox() {
        this.elements.checkBoxes().should("not.be.checked");
        this.elements.checkBoxes().first().check();
        cy.wait(2000);
        this.elements.checkBoxes().should("be.checked");
    }
}

module.exports = new Hotels();
