;; Comments
(comment_block) @comment.block
(comment_line) @comment.line

;; Selectors
(widget_selector) @type
(class_selector) @class
(class_name) @class
(id_selector) @constant
(id_name) @constant
(pseudo_class_selector) @attribute
(wildcard_selector) @type
(nesting_selector) @keyword

;; Combinators
(combinator) @operator

;; Properties
(property_name) @property

;; Values
(property_keyword) @constant.builtin
(color_keyword) @constant.builtin.color
(numeric_value) @number
(color_value) @constant.builtin.color
(plain_value) @string

;; Functions
(function_call) @function.call
"rgb" @function.builtin
"rgba" @function.builtin
"hsl" @function.builtin
"hsla" @function.builtin

;; Variables
(variable) @variable
(variable_definition (variable) @variable.definition)

;; Important
(important) @keyword

;; Punctuation
":" @punctuation.delimiter
";" @punctuation.delimiter
"," @punctuation.separator
"{" @punctuation.bracket
"}" @punctuation.bracket
"(" @punctuation.bracket
")" @punctuation.bracket
"." @punctuation.delimiter
"#" @punctuation.delimiter
