# DiscordModCompiler

DiscordModCompiler is a tool that allows developers to compile JavaScript into various mod formats, including RePlugged, BetterDiscord, and potentially Vencord.

## Features

- Resolves placeholders to actual client mod equivalent functions
- Includes tests and automated tests
- Aims to provide a basic plugin development API
- Aims to fully support BetterDiscord and RePlugged
- Plans to support compilation to UserScript with util methods embedding

## Progress

- [x] Resolve placeholders to actual client mod equivalent functions
- [x] Tests
- [x] Automated tests
- [ ] Basic plugin development API
- [x] Full BetterDiscord support
    - [x] Webpack
    - [x] Data
    - [x] Patcher
    - [x] UI
- [ ] Full RePlugged support
    - [ ] Webpack
    - [ ] Data
    - [ ] Patcher
    - [ ] UI
    - [ ] Utils
- [ ] Compilation to UserScript with util methods embedding

## Usage

1. Write or rewrite your plugin using our generic plugin format. You can use TypeScript, JavaScript, or any other language that transpiles to JavaScript.
2. If you're using a language other than JavaScript, run your transpiler.
3. Run DiscordModCompiler.
4. If necessary, run your bundler.

## Example

For an example of how to use DiscordModCompiler, take a look at the `test/sample` directory in this repository.
