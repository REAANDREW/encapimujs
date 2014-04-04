'use strict';
var encapimu = require('../lib/encapimu');
var should = require('should');

var Person = encapimu.Person;
var PersonWithMedals = encapimu.PersonWithMedals;

describe('A person', function() {
    it('can be modelled', function() {
        var bob = new Person();
        should(bob).not.eql(null);
    });
    it('can be promoted', function(done) {
        var bob = new Person();
        bob.promote();
        var assertWriter = {
            write: function(obj) {
                obj.should.eql(1);
                done();
            }
        };
        bob.reportRank(assertWriter);
    });
    it('can be demoted', function(done) {
        var bob = new Person();
        bob.promote().promote().demote();
        var assertWriter = {
            write: function(obj) {
                obj.should.eql(1);
                done();
            }
        };
        bob.reportRank(assertWriter);
    });
});

describe('A person', function() {

    it('gets no medals when they have no promotions', function(done) {
        var bob = new Person();
        bob = new PersonWithMedals(bob);
        assertMedal(bob, 'none', done);
    });

    it('gets a bronze medal with three promotions', function(done) {
        var bob = new Person();
        bob = new PersonWithMedals(bob);
        bob.promote().promote().promote();
        assertMedal(bob, 'bronze', done);
    });

    it('gets a silver medal with four promotions', function(done) {
        var bob = new Person();
        bob = new PersonWithMedals(bob);
        bob.promote().promote().promote().promote();
        assertMedal(bob, 'silver', done);
    });

    it('gets a gold medal with five promotions', function(done) {
        var bob = new Person();
        bob = new PersonWithMedals(bob);
        bob.promote().promote().promote().promote().promote();
        assertMedal(bob, 'gold', done);
    });

    function assertMedal(person, medal, callback) {
        var medalWriter = {
            write: function(obj) {
                obj.should.eql(medal);
                callback();
            }
        };
        person.reportMedals(medalWriter);
    }

});
