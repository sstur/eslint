/**
 * @fileoverview Tests for no-empty-pattern rule.
 * @author Alberto Rodríguez
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

let rule = require("../../../lib/rules/no-empty-pattern"),
    RuleTester = require("../../../lib/testers/rule-tester");

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

let ruleTester = new RuleTester();

ruleTester.run("no-empty-pattern", rule, {

    // Examples of code that should not trigger the rule
    valid: [
        { code: "var {a = {}} = foo;", parserOptions: { ecmaVersion: 6 }},
        { code: "var {a, b = {}} = foo;", parserOptions: { ecmaVersion: 6 }},
        { code: "var {a = []} = foo;", parserOptions: { ecmaVersion: 6 }},
        { code: "function foo({a = {}}) {}", parserOptions: { ecmaVersion: 6 }},
        { code: "function foo({a = []}) {}", parserOptions: { ecmaVersion: 6 }},
        { code: "var [a] = foo", parserOptions: { ecmaVersion: 6 }}
    ],

    // Examples of code that should trigger the rule
    invalid: [
        {
            code: "var {} = foo",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Unexpected empty object pattern.",
                type: "ObjectPattern"
            }]
        },
        {
            code: "var [] = foo",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Unexpected empty array pattern.",
                type: "ArrayPattern"
            }]
        },
        {
            code: "var {a: {}} = foo",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Unexpected empty object pattern.",
                type: "ObjectPattern"
            }]
        },
        {
            code: "var {a, b: {}} = foo",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Unexpected empty object pattern.",
                type: "ObjectPattern"
            }]
        },
        {
            code: "var {a: []} = foo",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Unexpected empty array pattern.",
                type: "ArrayPattern"
            }]
        },
        {
            code: "function foo({}) {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Unexpected empty object pattern.",
                type: "ObjectPattern"
            }]
        },
        {
            code: "function foo([]) {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Unexpected empty array pattern.",
                type: "ArrayPattern"
            }]
        },
        {
            code: "function foo({a: {}}) {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Unexpected empty object pattern.",
                type: "ObjectPattern"
            }]
        },
        {
            code: "function foo({a: []}) {}",
            parserOptions: { ecmaVersion: 6 },
            errors: [{
                message: "Unexpected empty array pattern.",
                type: "ArrayPattern"
            }]
        }
    ]
});
