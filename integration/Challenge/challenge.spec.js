//Go to [https://www.microsoft.com/en-us/]

//Validate all menu items are present (Office - Windows - Surface - Xbox - Deals - Support)
describe('Challange automation', () => {

            Cypress.on('uncaught:exception', (err, runable) => {
                return false
            })

            it('Find Office, Windows, Surface, Xbox, Deals, Support', () => {
                cy.visit('/')

                const locator = ['#shellmenu_1', '#shellmenu_2','#shellmenu_3','#shellmenu_4',
                    '#shellmenu_5','#l1_support']
                const tag = ['Office','Windows','Surface','Xbox','Deals','Support']

                cy.get('#shellmenu_1').should('contain', 'Office')
                cy.get('#shellmenu_2').should('contain', 'Windows')
                cy.get('#shellmenu_3').should('contain', 'Surface')
                cy.get('#shellmenu_4').should('contain', 'Xbox')
                cy.get('#shellmenu_5').should('contain', 'Deals')
                cy.get('#l1_support').should('contain', 'Support')
            })

            //Go to Windows
            //Once in Windows page, click on Windows 10 Menu
            //Print all Elements in the dropdown

            it('Go to Windows', () => {
                cy.get('#shellmenu_2').click()
                cy.get('.msw_b_8-close-icon').click()
                cy.url().should('contain', '/en-us/windows/')
                //cy.get(':nth-child(4) > .c-uhf-menu > ul').invoke('text').then(cy.log)      
                cy.get(':nth-child(4) > .c-uhf-menu > ul').screenshot()
                    .then(($T) => {
                        cy.log('My Elements on dropdown are:' + $T.text())
                    })
            })

            //Go to Search next to the shopping cart
            //Search for Visual Studio
            //Print the price for the 3 first elements listed in Software result list

            it('Search feature', () => {
                cy.get('#search').click()
                cy.get('#cli_shellHeaderSearchInput').type('Visual Studio').trigger('enter')

                const suggest = [1, 2, 3]
                suggest.forEach(suggest => {
                    cy.get('#universal-header-search-auto-suggest-ul>li').eq(suggest)
                    .invoke('text').then(cy.log).screenshot()
                })
            })

            //Store the price of the first one
            //Click on the first one to go to the details page
            //Once in the details page, validate both prices are the same
            //Click Add To Cart
            //Verify all 3 price amounts are the same

            it('Prices feature', () => {
                cy.get('#universal-header-search-auto-suggest-ul>li').eq(0).should('be.visible').click().screenshot()

                //Change language
                cy.get('body').then((body) => {
                    if (body.find('[data-target="geo-selector-localized-copy"]').lenght != 0) {
                        cy.get('.preferred-redirect-cancel')
                            .click({force: true}).screenshot()
                    } else {
                        return null
                    }

                })
                //Sign up form
                cy.get('body').then((body2) => {
                    if (body2.find('[data-dismiss="modal"]').lenght != 0) {
                        cy.get('#emailSup-modal > .modal-dialog > .modal-content > .modal-header > .close')
                            .click({force: true}).screenshot()
                    } 

                    cy.get('.h3 > .font-weight-semibold').screenshot().then(($price) => {
                        let priceVS = $price.text()
                    expect(priceVS).to.eql('$1,199.00 ')    
                    })
                })
            })
        })



            //On the # of items dropdown select 20 and validate the Total amount is Unit Price * 20