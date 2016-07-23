/**
 * @fileoverview Rule to control spacing within function calls
 * @author Matt DuVall <http://www.mattduvall.com>
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "require or disallow spacing between `function` identifiers and their invocations",
            category: "Stylistic Issues",
            recommended: false
        },

        fixable: "whitespace",
        schema: [
            {
                enum: ["always", "never"]
            }
        ]
    },

    create: function(context) {

        var never = context.options[0] !== "always",
            sourceCode = context.getSourceCode();

        /**
         * Check if open space is present in a function name
         * @param {ASTNode} node node to evaluate
         * @returns {void}
         * @private
         */
        function checkSpacing(node) {
            var lastCalleeToken = sourceCode.getLastToken(node.callee),
                prevToken = lastCalleeToken,
                parenToken = sourceCode.getTokenAfter(lastCalleeToken),
                hasWhitespace;

            // advances to an open parenthesis.
            while (
                parenToken &&
                parenToken.range[1] < node.range[1] &&
                parenToken.value !== "("
            ) {
                prevToken = parenToken;
                parenToken = sourceCode.getTokenAfter(parenToken);
            }

            // Parens in NewExpression are optional
            if (!(parenToken && parenToken.range[1] < node.range[1])) {
                return;
            }

            hasWhitespace = sourceCode.isSpaceBetweenTokens(prevToken, parenToken);

            if (never && hasWhitespace) {
                context.report({
                    node: node,
                    loc: lastCalleeToken.loc.start,
                    message: "Unexpected space between function name and paren.",
                    fix: function(fixer) {
                        return fixer.removeRange([prevToken.range[1], parenToken.range[0]]);
                    }
                });
            } else if (!never && !hasWhitespace) {
                context.report({
                    node: node,
                    loc: lastCalleeToken.loc.start,
                    message: "Missing space between function name and paren.",
                    fix: function(fixer) {
                        return fixer.insertTextBefore(parenToken, " ");
                    }
                });
            }
        }

        return {
            CallExpression: checkSpacing,
            NewExpression: checkSpacing
        };

    }
};
