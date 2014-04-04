#Encapsulation and Immutability with JavaScript while preserving the ability to instantiate instances of objects without the use of the 'this' keyword

All of the example make use of the **Revealing Module Pattern** and the '''Object.freeze''' method in JavaScript.  All of the examples are using **mocha** and **should** libraries to implement the tests and the assertions.

##Instantiation of an object
If you omit the surrounding brackets of the classic Revealing Module Pattern implementation you can instantiate your objects just as you could if you were using the '''prototype''' style.

###Implementation
    var Person = function() {
        
    }

###Test Code

    it('can be modelled', function() {
        var bob = new Person();
        should(bob).not.eql(null);
    });

###Test Result
    A person
        ✓ can be modelled 

    2 passing (4ms)

##Support instance methods
This is just the same as with the classic Revealing Module Pattern only here we are using the Object.freeze method on the object being returned.  This means that to extend this object with further behaviour you would have to use composition, but this is not a bad thing.  For this example the Person object will get two methods, promote and demote.  Another method is also added called '''reportRank''' so we can use a **Tell Don't Ask** approach to asserting on the Person object (this is also very closely related to the **Visitor Pattern**)

###Implementation

    var Person = function() {

        var rank = 0;

        function promote() {
            rank++;
        }

        function demote() {
            rank--;
        }

        function reportRank(writer) {
            writer.write(rank);
        }

        return Object.freeze({
            promote: promote,
            demote: demote,
            reportRank: reportRank
        });
    }

###Test Code
    it('can be promoted', function(done) {
        var bob = new Person();
        bob.promote();
        var assertWriter = {
            write : function(obj){
                obj.should.eql(1);
                done();
            }
        };  
        bob.reportRank(assertWriter);
    });

###Test Result

    A person
        ✓ can be modelled 
        ✓ can be promoted 


    2 passing (7ms)

##Support method chaining with an instance
One of the handy implementatioasn when instantiating objects is when you return the '''this''' keyword in the instance methods.  This allows you to then call another method on the instance one after the other.  To achieve this, the methods which are returned by the main function should also be returned by the instance methods.  This then allows the implementations to do the method chaining.

###Implementation
    var Person = function() {

        var rank = 0;

        function promote() {
            rank++;
            return funcs;
        }

        function demote() {
            rank--;
            return funcs;
        }

        function reportRank(writer) {
            writer.write(rank);
        }

        var funcs = Object.freeze({
            promote: promote,
            demote: demote,
            reportRank: reportRank
        });

        return funcs;
    };

###Test Code
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

###Test Result

    A person
        ✓ can be modelled 
        ✓ can be promoted 
        ✓ can be demoted 


    3 passing (8ms)

##Composition
The following example shows composition of objects where the Person object is now wrapped with an object which reports a different medal depending on the rank.  The important thing here is to ensure that any methods exposed by the object being wrapped, need to be exposed by the object doing the wrapping.  Some helper extension could easily be made to reduce the required coding here and enable only methods which need to be changed to be re-declared.


###Implementation
    var personWithMedals = function(person) {

        var medals = {
            0: 'none',
            3: 'bronze',
            4: 'silver',
            5: 'gold'
        };
        var medal = medals[0];

        var rankWriter = {
            write : assignMedal
        }

        function reportMedals(writer) {
            writer.write(medal);
        }

        function assignMedal(rank) {
            if (medals[rank] === undefined) {
                medal = medals[3];
            } else {
                medal = medals[rank];
            }
        }

        function promote() {
            person.promote();
            person.reportRank(rankWriter);
            return funcs;
        }

        function demote() {
            person.demote();
            person.reportRank(rankWriter);
            return funcs;
        }

        var funcs = {
            reportMedals: reportMedals,
            promote: promote,
            demote: demote,
            reportRank: person.reportRank
        };

        return funcs;
    }

###Test Code
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

###Test Result

    A person
        ✓ can be modelled 
        ✓ can be promoted 
        ✓ can be demoted 

    A person
        ✓ gets no medals when they have no promotions 
        ✓ gets a bronze medal with three promotions 
        ✓ gets a silver medal with four promotions 
        ✓ gets a gold medal with five promotions 


    7 passing (9ms)

##Exporting your objects in node.js

The above objects were exported in the example project with the following code.  The definitions were made in camelCase and exported in pascal case.

###Implementation

    module.exports = {
        Person: person,
        PersonWithMedals: personWithMedals
    };

##Compatible with super strict jshint profile

Please see the .jshintrc to see the profile of JSHint.
