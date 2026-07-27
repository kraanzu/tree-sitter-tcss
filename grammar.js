module.exports = grammar({
  name: "tcss",

  extras: ($) => [/\s/, $.comment_block, $.comment_line],

  rules: {
    stylesheet: ($) => repeat(choice($.rule_set, $.variable_definition)),

    comment_block: ($) => token(seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),
    comment_line: ($) => token(seq("# ", /.*/)),

    selectors: ($) => seq($.selector, repeat(seq(",", $.selector))),

    selector: ($) =>
      prec.left(
        seq(
          $._selector_unit,
          repeat(choice(seq($.combinator, $._selector_unit), $._selector_unit)),
        ),
      ),

    _selector_unit: ($) =>
      choice(
        $.wildcard_selector,
        $.nesting_selector,
        $.class_selector,
        $.id_selector,
        $.pseudo_class_selector,
        $.widget_selector,
      ),

    wildcard_selector: ($) => "*",
    nesting_selector: ($) => "&",
    class_selector: ($) => seq(".", $.class_name),
    id_selector: ($) => seq("#", $.id_name),
    class_name: ($) => /[-a-zA-Z_][-a-zA-Z0-9_]*/,
    id_name: ($) => /[-a-zA-Z0-9_]+/,

    pseudo_class_selector: ($) => seq(":", $.pseudo_class_name),
    pseudo_class_name: ($) => /[a-z][a-z0-9-]*/,

    widget_selector: ($) => /[A-Z][a-zA-Z0-9_-]*/,

    combinator: ($) => ">",

    rule_set: ($) => seq($.selectors, $.block),

    block: ($) => seq("{", repeat(choice($.declaration, $.rule_set)), "}"),

    declaration: ($) =>
      seq($.property_name, ":", repeat1($._value), optional($.important), ";"),

    property_name: ($) => /[a-z][a-z0-9_-]*/,

    important: ($) => /!\s*important/,

    _value: ($) =>
      choice(
        $.numeric_value,
        $.color_value,
        $.function_call,
        $.variable,
        $.keyword,
      ),

    numeric_value: ($) =>
      token(
        seq(
          optional(/[-+]/),
          choice(seq(/[0-9]+/, optional(seq(".", /[0-9]+/))), seq(".", /[0-9]+/)),
          optional(choice("%", "fr", "h", "vh", "vw", "w")),
        ),
      ),

    color_value: ($) => /#[0-9a-fA-F]{3,8}/,

    // function_call = a keyword immediately followed by "(" (no space).
    // Using token.immediate on "(" avoids clashing with a bare keyword value.
    function_call: ($) =>
      seq(
        field("name", $.keyword),
        token.immediate("("),
        repeat(seq($._value, optional(","))),
        ")",
      ),

    variable: ($) => /\$[a-zA-Z_-][a-zA-Z0-9_-]*/,

    // Any bareword value: keywords (`top`, `solid`) and color names (`red`).
    keyword: ($) => /[a-zA-Z][a-zA-Z0-9_-]*/,

    variable_definition: ($) =>
      seq($.variable, ":", repeat1($._value), ";"),
  },
});
