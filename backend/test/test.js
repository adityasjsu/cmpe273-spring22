let chai = require('chai')
let chaiHttp = require('chai-http');
let server = require('../index');
const Shop = require('../src/models/shop.model');


// Assertion style
chai.should();

chai.use(chaiHttp);

describe('Etsy API', () => {

    /**
     * Test GET shop route
     */

    describe('GET /api/v1/shops', () =>{
        it("It should get all shops" , (done) => {
            chai.request(server)
                .get("/api/v1/shops")
                .end((err,response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(5);
                done();
                })
        })
    })


    /**
     * Test GET by Userneme route
     */
    describe('GET /api/v1/shops/usershop/:username', () =>{
        it("It should get Admin's shop" , (done) => {
            chai.request(server)
                .get("/api/v1/shops/usershop/admin")
                .end((err,response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(1);
                done();
                })
        })
    })


    /**
     * Test POST Item route
     */
    describe('POST /api/v1/items/', () =>{
        it("It should POST Create an item" , (done) => {
            const item = {
                item_ID:9999,
                shop:400,
                name:"MOCHA chai",
                category:"test",
                description:"test Category",
                price:1000,
                quantity:10,
                fav:0,
                image:null,
                shopname:"BobsShop"
            }
            chai.request(server)
                .post("/api/v1/items/")
                .send(item)
                .end((err,response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('object');
                done();
                })
        })
    })


    /**
     * Test GET item by NAME (Search function) route
     */
     describe('GET /api/v1/items/searchItem/:name', () =>{
        it("It should get a search result for 'mocha' " , (done) => {
            chai.request(server)
                .get("/api/v1/items/searchItem/mocha")
                .end((err,response) => {
                    response.should.have.status(200)
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(1);
                done();
                })
        })
    })


    /**
     * Test DELETE an item by item_ID route
     */
    describe('DELETE /api/v1/items/:item_ID', () =>{
        it("Should delete Mocha Item' " , (done) => {
            chai.request(server)
                .delete("/api/v1/items/9999")
                .end((err,response) => {
                    response.should.have.status(200)
                done();
                })
        })
    })



})