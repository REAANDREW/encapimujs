'use strict';
var encapimu = require('../lib/encapimu');
var should = require('should');

var Person = encapimu.Person;

describe('A person', function() {
    it('can be modelled', function() {
        var bob = new Person();
        should(bob).not.eql(null);
    });
    it('can be promoted', function(done) {
        var p1 = new Person();
        p1.promote();
        var assertWriter = {
            write: function(obj) {
                obj.should.eql(1);
                done();
            }
        };
        p1.reportRank(assertWriter);
    });
    it('can be demoted', function(done) {
        var p1 = new Person();
        p1.promote().promote().demote();
        var assertWriter = {
            write: function(obj) {
                obj.should.eql(1);
                done();
            }
        };
        p1.reportRank(assertWriter);
    });
});
