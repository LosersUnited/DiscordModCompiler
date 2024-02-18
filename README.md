# DiscordModCompiler
Allows people to compile javascript into any mod, replugged, vencord (maybe) BetterDiscord etc...
## TODO
- [x] Resolve placeholders to actual client mod equivalent functions
- [x] Tests
- [x] Automated tests
- [ ] Basic plugin development API
- [ ] Full BetterDiscord support
-    - [ ] Webpack
-    - [ ] Data
-    - [ ] Patcher
- [ ] Full Replugged support
-    - [ ] Webpack
-    - [ ] Data
-    - [ ] Patcher
- [ ] Compilation to UserScript with util methods embedding
## How to use?
1. (Re)Write your plugin using our generic plugin format, you can use ts, js, whatever
2. Run your transpiler if you use something different than JavaScript
3. Run this tool
4. Run your bundler if needed
## What?
### Just take a look at `test/sample`
