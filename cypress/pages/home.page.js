const helper = require("../support/helper");

class Homepage {
    elements = {
        searchInfoFieldsContainer: () => cy.get("[data-view='accommodation']"),
        destination: () => cy.get("#ss"),
        dataContainer: () => cy.get(".xp__dates"),
        guestsContainer: () => cy.get(".xp__guests__count"),
        adultsCountField: () => cy.get(".sb-group__field-adults>div span[class='bui-stepper__display']"),
        adultsQntIncreaseBtn: () => cy.get("button[aria-label='Increase number of Adults']"),
        searchBtn: () => cy.get(".js-sb-submit-text "),
        //today: () => cy.get(".bui-calendar__date--today span span"),
        checkOut: () => cy.get("td[data-date='2022-08-01']"),
        notEmptyCheckInDaysArr: () => cy.get(".bui-calendar__content>div:nth-child(1) tbody td[role='gridcell'] span span"),
        notEmptyCheckOutDaysArr: () => cy.get(".bui-calendar__content>div:nth-child(2) tbody td[role='gridcell'] span span")
    }


    selectRandomCheckOutData() {
        this.elements.notEmptyCheckOutDaysArr().then(days => {
            let randomDay = helper.generateCheckOutRandomeDay(days);
            cy.wrap(randomDay).click();
        })
    }

    selectRandomCheckInData() {
        this.elements.notEmptyCheckInDaysArr().then(days => {
            let randomDay = helper.generateCheckInRandomeDay(days);
            cy.wrap(randomDay).click();
        })
    };

    typeDestinationName(name) {
        this.elements.destination().type(name)
    }

    openGuestsContainer() {
        this.elements.guestsContainer().click();
    }

    doClickOnAdultsCountIncreaseBtn(num) {
        while (num > 0) {
            this.elements.adultsQntIncreaseBtn().click();
            num--;
        }
    }

    addAdultsAmount(num) {
        this.openGuestsContainer();
        let numberOfClicks = num;
        this.elements.adultsCountField().then(el => {
            let countBeforeAdding = +(el.text());

            this.doClickOnAdultsCountIncreaseBtn(num);

            this.openGuestsContainer();
            this.elements.adultsCountField().then(el => {
                let countAfterAdding = +(el.text());
                expect(countAfterAdding).to.be.equal(countBeforeAdding + numberOfClicks);
            })
        })
    }

    clickOnSearchBtn() {
        this.elements.searchBtn().click();
    }

    setData(name, num) {
        this.typeDestinationName(name);
        this.openDataContainer();
        this.selectRandomCheckInData();
        this.selectRandomCheckOutData();
        //this.clickOnCheckout();
        this.addAdultsAmount(num);
        this.clickOnSearchBtn();
    }

    open() {
        cy.visit("/");
    }

    openDataContainer() {
        this.elements.dataContainer().click();
    }
}

module.exports = new Homepage()
