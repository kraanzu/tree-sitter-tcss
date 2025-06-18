/**
 * @file Tree sitter grammar for textual's tcss
 * @author Murli Tawari <kraanzu@gmail.com>
 * @license MIT
 */
module.exports = grammar({
  name: "tcss",
  extras: ($) => [/\s|\\\r?\n/, $.comment],
  rules: {
    source_file: ($) => repeat(choice($.rule_set, $.variable_declaration)),
    comment: ($) =>
      choice(seq("# ", /[^\n]*/), seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
    variable_declaration: ($) => seq($.variable, ":", $.value_list, ";"),
    rule_set: ($) =>
      seq(
        $.selector_group,
        "{",
        repeat(choice($.rule_set, $.declaration, $.comment)),
        "}",
      ),
    declaration: ($) => seq($.property_name, ":", $.value_list, ";"),
    selector_group: ($) => seq($.selector, repeat(seq(",", $.selector))),
    selector: ($) =>
      seq($.simple_selector, repeat(seq($.combinator, $.simple_selector))),
    combinator: (_) => ">",
    simple_selector: ($) =>
      seq(
        choice(
          $.type_selector,
          $.id_selector,
          $.wildcard_selector,
          $.parent_reference,
        ),
        repeat(choice($.class_selector, $.pseudo_class_selector)),
      ),
    type_selector: ($) => /[A-Z_][a-zA-Z0-9_-]*/,
    class_selector: ($) => seq(".", /[a-zA-Z_][a-zA-Z0-9_-]*/),
    id_selector: ($) => seq("#", /[a-zA-Z_][a-zA-Z0-9_-]*/),
    pseudo_class_selector: ($) => seq(":", /[a-z_][a-z_-]*/),
    wildcard_selector: ($) => "*",
    parent_reference: ($) => "&",
    property_name: (_) => token(/[a-z][a-z0-9_-]*/),
    value_list: ($) =>
      seq(
        repeat1(
          choice(
            $.value_number,
            $.value_string,
            $.variable_reference,
            $.function_call,
          ),
        ),
        optional($.important),
      ),
    important: (_) => token(seq("!", "important")),

    value_number: ($) =>
      token(
        seq(
          optional(/[+-]/),
          choice(
            // Integer
            /\d+/,
            // Float
            /\d*\.\d+/,
          ),
          optional("%"), // Support for percentage values
        ),
      ),

    value_string: ($) => token(/[a-zA-Z_-][a-zA-Z_-]*/),

    function_call: ($) =>
      seq(
        choice("rgb", "rgba", "hsl", "hsla"),
        "(",
        repeat1(choice($.value_number, ",")),
        ")",
      ),
    variable: ($) => seq("$", /[a-zA-Z_][a-zA-Z0-9_-]*/),
    variable_reference: ($) => $.variable,
  },
});
