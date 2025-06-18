/**
 * Tree-sitter grammar for TCSS, with proper !important support
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

    combinator: () => ">",

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

    type_selector: () => /[A-Z_][a-zA-Z0-9_-]*/,
    class_selector: () => seq(".", /[a-zA-Z_][a-zA-Z0-9_-]*/),
    id_selector: () => seq("#", /[a-zA-Z_][a-zA-Z0-9_-]*/),
    pseudo_class_selector: () => seq(":", /[a-z_][a-z_-]*/),
    wildcard_selector: () => "*",
    parent_reference: () => "&",

    property_name: () => token(/[a-z][a-z0-9_-]*/),

    value_list: ($) =>
      seq(
        repeat1(choice($.value, $.variable_reference, $.function_call)),
        optional($.important),
      ),

    important: () => "!important",

    value: () => token(/[a-zA-Z0-9_%#\.-]+/),

    function_call: ($) =>
      seq(
        choice("rgb", "rgba", "hsl", "hsla"),
        "(",
        repeat1(choice($.value, ",")),
        ")",
      ),

    variable: () => seq("$", /[a-zA-Z_][a-zA-Z0-9_-]*/),
    variable_reference: ($) => $.variable,
  },
});
