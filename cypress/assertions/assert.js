const homepage = require("../pages/home.page");
const hotelspage = require("../pages/hotels.page");
const constants = require("../support/constants");

class Assertions {

    assertUrl() {
        cy.url().should('include', constants.url);
    }

    assertHotelsPageTitle() {
        cy.title().should('include', constants.hotelspageTitle);
    }

    assertPageLocations() {
        let text;
        hotelspage.elements.locations().each(($el) => {
            text = $el.text();
            expect(text).to.be.equal(constants.destinationName);
        })
    }

    assertLocationsInAllPages() {
        //Get number of result pages
        hotelspage.elements.resultPages().then((list) => {
            let pCount = list.length;

            //assert first page locations
            this.assertPageLocations();

            //assert the rest of pages locations
            while (pCount > 1) {
                hotelspage.gotoNextPage();
                this.assertPageLocations();
                pCount--;
            }
        })
    }

    assertStarsCountIsFour() {
        hotelspage.elements.starsContainer().each(($el) => {
            let stars_arr = $el.find("span");
            expect(stars_arr.length).to.be.equal(constants.numberOfStars);
        })
    }

    assertStarsContainerIsVisible() {
        hotelspage.elements.starsContainer().should('be.visible');
    }

    assertSearchInfoFieldsContainerIsVisible() {
        homepage.elements.searchInfoFieldsContainer().should('be.visible');
    }
}

module.exports = new Assertions();
