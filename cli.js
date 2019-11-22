#!/usr/bin/env node

const YAML = require("yaml"),
    fs = require("fs"),
    shell = require("shelljs");

const args = process.argv.slice(2);
if (args.length < 3) {
    console.error(
        "\x1b[31m%s\x1b[0m",
        "insufficient arguments.\nexpected call: node parse.js {project name} {command} {path}\n" +
            "ex: node parse.js surycat reset ./gitprojects.yml"
    );
    process.exit(1);
}

const organization = args[0],
    command = args[1],
    filePath = args[2];

// git commands declaration
const cmdFn = {
    clone: (org, repo, path) => {
        console.log("\x1b[36m%s\x1b[0m", `cloning: ${repo}`);
        shell.exec(`git clone git@github.com:${org}/${repo}.git ${path}${repo}`);
    },
    reset: (org, repo, path) => {
        console.log("\x1b[36m%s\x1b[0m", `resetting: ${repo}`);
        shell.exec(`git -C ${path}${repo} checkout -f master`);
        shell.exec(`git -C ${path}${repo} reset --hard origin/master`);
    },
};

// check command input
if (!cmdFn[command]) {
    console.error("\x1b[31m%s\x1b[0m", `unknown command: ${command}\n` + "available commands: " + Object.keys(cmdFn));
    process.exit(1);
}
// read file
let file = null;
try {
    file = fs.readFileSync(filePath, "utf8");
} catch (e) {
    console.error("\x1b[31m%s\x1b[0m", `couldn't read: ${filePath}`);
    console.error(e);
    process.exit(1);
}
// parse input file
let index = null;
try {
    index = YAML.parse(file);
} catch (e) {
    console.error("\x1b[31m%s\x1b[0m", `couldn't parse: ${filePath}`);
    console.error(e);
    process.exit(1);
}

// iterate over sub-projects and repositories
let path, repositories;
index[organization].subprojects.forEach(project => {
    path = index[project].path;
    repositories = index[project].repositories;

    repositories.forEach(repository => {
        cmdFn[command](organization, repository, path);
    });
});
