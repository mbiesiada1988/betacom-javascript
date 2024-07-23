import data from '../../fixtures/api_data.json';


export default function apiCrawler(parser, resourcesToCrawl, output) {
    cy.request({
        url: data.urlResources,
        qs: data.paramsResources,
        headers: data.headers
    }).as('resources')
    for (let resourceIndex = 0; resourceIndex < resourcesToCrawl; resourceIndex++) {
        let outputEntry = {};
        cy.get('@resources').then($resources => {
            cy.request({
                url: data.urlDetails.replace('{resourceId}', $resources.body[resourceIndex].id),
                headers: data.headers
            }).then($resource => {
                outputEntry.title = $resource.body.title;
                outputEntry.thumbnail = $resource.body.thumbnail;
                outputEntry.description = $resource.body.description;
                outputEntry.metadata = parser.parseMetadata($resource.body.tags);
                outputEntry.keywords = $resource.body.keywords;
            });
            cy.request({
                url: data.urlRate.replace('{resourceId}', $resources.body[resourceIndex].id),
                headers: data.headers
            }).then($rate => outputEntry.rate = parser.parseRate($rate.body));
            cy.request({
                url: data.urlPaths.replace('{resourceId}', $resources.body[resourceIndex].id),
                headers: data.headers
            }).then($path => {
                outputEntry.path = parser.parsePath($path.body)
                output[resourceIndex] = outputEntry;
            });
        })

    }
};