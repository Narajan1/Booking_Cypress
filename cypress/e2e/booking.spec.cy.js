/// <reference types="cypress" />

const homepage = require("../pages/home.page");
const hotelspage = require("../pages/hotels.page");
const constants = require("../support/constants");
const assertions = require("../assertions/assert");

describe("Test suit", () => {
    beforeEach(() => {
        homepage.open();
    })

    it("Test case", () => {
        Cypress.on('uncaught:exception', (err, runnable) => {
            return false;
        });

        assertions.assertUrl();
        assertions.assertSearchInfoFieldsContainerIsVisible();

        //fill destination, datas fields(check-in randomly, check out was hardcoded), 
        //increase adults count and click on search
        homepage.setData(constants.destinationName, constants.numberOfAdultsToAdd);
        
        assertions.assertHotelsPageTitle();
        assertions.assertLocationsInAllPages(constants.destinationName);
        hotelspage.select4StarCheckBox();
        assertions.assertStarsContainerIsVisible();
        assertions.assertStarsCountIsFour();

    })
})