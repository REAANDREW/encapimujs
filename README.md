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
        var p1 = new Person();
        p1.promote();
        var assertWriter = {
            write : function(obj){
                obj.should.eql(1);
                done();
            }
        };  
        p1.reportRank(assertWriter);
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

###Test Result

    A person
        ✓ can be modelled 
        ✓ can be promoted 
        ✓ can be demoted 


    3 passing (8ms)
