/**
 * @file Tree sitter grammar for textual's tcss
 * @author Murli Tawari <kraanzu@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "tcss",

  rules: {
    // TODO: add the actual grammar rules
    source_file: $ => "hello"
  }
});
