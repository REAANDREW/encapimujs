/*
 * encapimu
 * https://github.com/area/encapimujs
 *
 * Copyright (c) 2014 Andrew Rea
 * Licensed under the MIT license.
 */

'use strict';

var person = function() {

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

module.exports = {
    Person : person
};
