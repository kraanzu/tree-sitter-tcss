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
(property_name) @keyword
(declaration ":") @punctuation.delimiter
(important) @keyword

;; Values
(value_number) @number
(value_string) @variable
(value_list) @string

;; Variables
(variable) @variable
(variable_reference) @variable
(variable_declaration) @constant

;; Functions and function arguments
(function_call) @function
(function_call "(") @punctuation.bracket
(function_call ")") @punctuation.bracket

;; Rule blocks
(rule_set "{" @punctuation.bracket)
(rule_set "}" @punctuation.bracket)

;; Variable declaration
":" @punctuation.delimiter
";" @punctuation.delimiter

;; Commas and separators
"," @punctuation.delimiter

;; Braces and combinators
(combinator) @operator
";" @punctuation.delimiter
