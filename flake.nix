{
  description = "Development environment for TCSS' tree sitter";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          name = "tcss";

          buildInputs = with pkgs; [
            nodejs
            tree-sitter
          ];

          shellHook = ''
            echo "Node.js $(node --version)"
            echo "tree-sitter $(tree-sitter --version)"
          '';
        };
      }
    );
}
