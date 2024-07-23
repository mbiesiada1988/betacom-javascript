import crawler from '../support/support/gui_crawler';

import Details from '../support/pageObjects/details';
import Tree from '../support/pageObjects/tree';

import data from '../fixtures/gui_data.json';


const RESOURCES_TO_CRAWL = 15;


describe('GUI Crawler', function () {
    const tree = new Tree();
    const details = new Details();
    let output = {};

    beforeEach(function () {
        cy.visit('/resources');
    });

    afterEach(function () {
        cy.writeFile(`output/${Date.now()}_GUI.json`, output, 'utf8');
    });

    data.trees.forEach((name, index) => {
        it(`Crawl tree ${index}: ${name}`, function () {
            tree.getTab(index).click();
            crawler(tree, details, RESOURCES_TO_CRAWL, output);
        });
    });
});