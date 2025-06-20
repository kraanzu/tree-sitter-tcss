;; Comments
(comment) @comment

;; Selectors
(type_selector) @type
(class_selector) @class
(id_selector) @constant
(pseudo_class_selector) @function
(wildcard_selector) @type
(parent_reference) @keyword

;; Properties and declarations
(property_name) @property
(declaration ":") @punctuation.delimiter
(important) @keyword

;; Values
(value_number) @value_number
(value_string) @variable
(value_list) @string

;; Variables
(variable) @variable
(variable_reference) @variable

;; Functions and function arguments
(function_call) @function
(function_call "(") @punctuation.bracket
(function_call ")") @punctuation.bracket

;; Rule blocks
(rule_set "{" @punctuation.bracket)
(rule_set "}" @punctuation.bracket)

;; Variable declaration
(variable_declaration ":") @punctuation.delimiter
(variable_declaration ";") @punctuation.delimiter

;; Commas and separators
"," @punctuation.delimiter

;; Braces and combinators
(combinator) @operator
";" @punctuation.delimiter
