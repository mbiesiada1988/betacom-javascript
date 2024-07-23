export default class PageObject {
    getTitle() {
        return cy.get('div.resource-summary__title');
    };

    getRate(){
        return cy.get('div.rating__row')
            .find('span.ng-star-inserted')
            .eq(0);
    };

    getThumbnail() {
        return cy.get('img[alt="Resource cover"]');
    };

    getDescription() {
        return cy.get('app-resource-summary');
    };

    getPathTab() {
        return cy.get('div[role="tab"]').contains('Path');
    };

    getPath() {
        return cy.get('span.library-path__path-tree-name');
    };

    getMetadataTab() {
        return cy.get('div[role="tab"]').contains('Metadata');
    };

    getMetadata() {
        return cy.get('div.metadata-item');
    };

    getMetadataTitles() {
        return this.getMetadata().find('span.metadata-item__title');
    };

    getKeywordsTab() {
        return cy.get('div[role="tab"]').contains('Keywords');
    };

    getKeywords() {
        return cy.get('span.keyword-component__name');
    };

    getBackButton() {
        return cy.get('button[aria-label="Navigate Back"]');
    };
};