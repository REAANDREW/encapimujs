/*
 * encapimu
 * https://github.com/area/encapimujs
 *
 * Copyright (c) 2014 Andrew Rea
 * Licensed under the MIT license.
 */

'use strict';

var person = function(a,b,c,d,e,f,g,h) {

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
    };

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
};

module.exports = {
    Person: person,
    PersonWithMedals: personWithMedals
};
