import Parser from '../support/support/parser';

import apiCrawler from '../support/support/api_crawler';

import data from '../fixtures/api_data.json';


const resourcesToCrawl = 15;


describe('API Crawler', function () {
    const parser = new Parser();
    let trees_id = [];
    let output = {};

    before(function () {
        cy.request({
            url: data.urlTrees,
            qs: data.paramsTrees
        }).then($response => $response.body.forEach($tree => trees_id.push($tree.rootId)));
    });

    afterEach(function () {
        cy.writeFile(`output/${Date.now()}_API.json`, output, 'utf8');
    });

    data.trees.forEach((name, index) => {
        it(`Crawl tree ${index}: ${name}`, function () {
            data.paramsResources.node = trees_id[index];
            apiCrawler(parser, resourcesToCrawl, output);
        });
    });
});