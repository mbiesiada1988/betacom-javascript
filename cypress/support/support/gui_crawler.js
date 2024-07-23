export default function guiCrawler(tree, details, resourcesToCrawl, output) {
    tree.getResources().as('resources');
    for (let resourceIndex = 0; resourceIndex < resourcesToCrawl; resourceIndex++) {
        let outputEntry = {};
        let path = [];
        let metadata = {};
        let keywords = [];
        cy.get('@resources').eq(resourceIndex).click();
        details.getTitle()
            .should('be.visible')
            .then($title => outputEntry.title = $title[0].innerText);
        details.getRate()
            .should('be.visible')
            .then($rate => outputEntry.rate = $rate[0].innerText.substring(1));
        details.getThumbnail()
            .should('be.visible')
            .then($thumbnail => outputEntry.thumbnail = $thumbnail[0].currentSrc);
        details.getDescription()
            .then($desc => {
                if ($desc.find('p.resource-description__description-wrapper') > 0) {
                    $desc.find('p.resource-description__description-wrapper').then(() => {
                        outputEntry.description = $desc[0].innerText;
                    });
                } else {
                    outputEntry.description = "";
                }
            });
        details.getPathTab().click();
        details.getPath()
            .should('be.visible')
            .each($node => path.push($node[0].innerText))
            .then(() => outputEntry.path = path.join(' > '));
        details.getMetadataTab().click();
        details.getMetadata()
            .should('be.visible');
        details.getMetadataTitles().each($title => {
            cy.wrap($title).siblings().then($value => {
                metadata[$title[0].innerText] = $value[0].innerText;
            });
        }).then(() => outputEntry.metadata = metadata);
        details.getKeywordsTab().click();
        details.getKeywords()
            .should('be.visible')
            .each($node => keywords.push($node[0].innerText))
            .then(() => outputEntry.keywords = keywords);
        details.getBackButton().click();
        cy.get('@resources').its('length').then($length => {
            if ($length > resourceIndex) {output[resourceIndex] = outputEntry}
        });
    }
}