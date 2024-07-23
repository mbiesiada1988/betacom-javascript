export default class PageObject {
    getTab(index) {
        return cy.get('div.mat-tab-label-content').eq(index);
    };

    getResources() {
       return cy.get('div.resources-card-beta');
    };
};