/**
 * @fileoverview Config to enable all rules.
 * @author Robert Fletcher
 */

"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const fs = require("fs"),
    path = require("path");

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

const ruleFiles = fs.readdirSync(path.resolve(__dirname, "../lib/rules"));
const enabledRules = ruleFiles.reduce(function(result, filename) {
    if (path.extname(filename) === ".js") {
        result[path.basename(filename, ".js")] = "error";
    }
    return result;
}, {});

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = { rules: enabledRules };
