package tree_sitter_tcss_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_tcss "github.com/kraanzu/tree-sitter-tcss/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_tcss.Language())
	if language == nil {
		t.Errorf("Error loading Tcss grammar")
	}
}
