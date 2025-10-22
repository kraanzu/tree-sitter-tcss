module.exports = grammar({
  name: "tcss",

  extras: ($) => [/\s/, $.comment_block, $.comment_line],

  conflicts: ($) => [[$.property_keyword, $.color_keyword]],

  rules: {
    stylesheet: ($) => repeat(choice($.rule_set, $.variable_definition)),

    comment_block: ($) => token(seq("/*", /[^*]*\*+([^/*][^*]*\*+)*/, "/")),

    comment_line: ($) => token(seq("# ", /.*/)),

    // Selectors
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

    pseudo_class_selector: ($) =>
      seq(":", choice("disabled", "enabled", "focus", "focus-within", "hover")),

    widget_selector: ($) => /[a-zA-Z_][a-zA-Z0-9_-]*/,

    combinator: ($) => ">",

    // Rule sets
    rule_set: ($) => seq($.selectors, $.block),

    block: ($) => seq("{", repeat(choice($.declaration, $.rule_set)), "}"),

    declaration: ($) =>
      seq($.property_name, ":", repeat1($._value), optional($.important), ";"),

    property_name: ($) =>
      choice(
        "align",
        "align-horizontal",
        "align-vertical",
        "background",
        "background-tint",
        "border",
        "border-bottom",
        "border-left",
        "border-right",
        "border-subtitle-align",
        "border-subtitle-background",
        "border-subtitle-color",
        "border-subtitle-style",
        "border-title-align",
        "border-title-background",
        "border-title-color",
        "border-title-style",
        "border-top",
        "box-sizing",
        "color",
        "column-span",
        "constrain",
        "content-align",
        "content-align-horizontal",
        "content-align-vertical",
        "display",
        "dock",
        "grid-columns",
        "grid-gutter",
        "grid-rows",
        "grid-size",
        "height",
        "keyline",
        "layer",
        "layers",
        "layout",
        "link-background",
        "link-background-hover",
        "link-color",
        "link-color-hover",
        "link-style",
        "link-style-hover",
        "margin",
        "margin-bottom",
        "margin-left",
        "margin-right",
        "margin-top",
        "max-height",
        "max-width",
        "min-height",
        "min-width",
        "offset",
        "offset-x",
        "offset-y",
        "opacity",
        "outline",
        "outline-bottom",
        "outline-left",
        "outline-right",
        "outline-top",
        "overflow",
        "overflow-x",
        "overflow-y",
        "overlay",
        "padding",
        "padding-bottom",
        "padding-left",
        "padding-right",
        "padding-top",
        "row-span",
        "scrollbar-background",
        "scrollbar-background-active",
        "scrollbar-background-hover",
        "scrollbar-color",
        "scrollbar-color-active",
        "scrollbar-color-hover",
        "scrollbar-corner-color",
        "scrollbar-gutter",
        "scrollbar-size",
        "scrollbar-size-horizontal",
        "scrollbar-size-vertical",
        "text-align",
        "text-opacity",
        "text-style",
        "tint",
        "visibility",
        "width",
      ),

    important: ($) => /!\s*important/,

    _value: ($) =>
      choice(
        $.property_keyword,
        $.color_keyword,
        $.numeric_value,
        $.color_value,
        $.function_call,
        $.variable,
        $.plain_value,
      ),

    property_keyword: ($) =>
      choice(
        "ascii",
        "auto",
        "blank",
        "block",
        "bold",
        "border-box",
        "both",
        "bottom",
        "center",
        "content-box",
        "dashed",
        "double",
        "end",
        "grid",
        "heavy",
        "hidden",
        "hkey",
        "horizontal",
        "inflect",
        "initial",
        "inner",
        "italic",
        "justify",
        "left",
        "middle",
        "none",
        "outer",
        "panel",
        "reverse",
        "right",
        "round",
        "screen",
        "scroll",
        "solid",
        "stable",
        "start",
        "strike",
        "tall",
        "thick",
        "top",
        "underline",
        "vertical",
        "visible",
        "vkey",
        "wide",
        "x",
        "y",
      ),

    color_keyword: ($) =>
      choice(
        // ANSI colors
        "ansi_black",
        "ansi_blue",
        "ansi_bright_black",
        "ansi_bright_blue",
        "ansi_bright_cyan",
        "ansi_bright_green",
        "ansi_bright_magenta",
        "ansi_bright_red",
        "ansi_bright_white",
        "ansi_bright_yellow",
        "ansi_cyan",
        "ansi_green",
        "ansi_magenta",
        "ansi_red",
        "ansi_white",
        "ansi_yellow",
        // CSS basic colors
        "aqua",
        "black",
        "blue",
        "fuchsia",
        "gray",
        "green",
        "lime",
        "maroon",
        "navy",
        "olive",
        "orange",
        "purple",
        "red",
        "silver",
        "teal",
        "white",
        "yellow",
        // Extended colors (abbreviated for brevity)
        "aliceblue",
        "antiquewhite",
        "aquamarine",
        "azure",
        "beige",
        "bisque",
        "transparent",
        "auto",
      ),

    numeric_value: ($) =>
      token(
        seq(
          optional(/[-+]/),
          choice(
            seq(/[0-9]+/, optional(seq(".", /[0-9]+/))),
            seq(".", /[0-9]+/),
          ),
          optional(choice("%", "fr", "h", "vh", "vw", "w")),
        ),
      ),

    color_value: ($) => /#[0-9a-fA-F]{3,8}/,

    function_call: ($) =>
      seq(
        choice("rgb", "rgba", "hsl", "hsla"),
        "(",
        repeat(seq($._value, optional(","))),
        ")",
      ),

    variable: ($) => /\$[a-zA-Z_-][a-zA-Z0-9_-]*/,

    plain_value: ($) => /\w+/,

    variable_definition: ($) => seq($.variable, ":", $._value, ";"),
  },
});
