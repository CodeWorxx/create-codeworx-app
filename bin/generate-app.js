#! /usr/bin/env node

const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const args = process.argv.slice(2);
if (args.length < 1) {
	console.error(
		`Please provide the app name\n\nExample: create-codeworx-app app-name\n`
	);
	process.exit(1); //an error occurred
}

console.log("Creating app with name:", args[0], " ...");

const projectName = args[0];
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const git_repo = `https://github.com/CodeWorxx/create-codeworx-app`;

try {
	fs.mkdirSync(projectPath);
} catch (err) {
	if (err.code === "EEXIST") {
		console.log(
			`The file ${projectName} already exist in the current directory, please give it another name.`
		);
	} else {
		console.log(error);
	}
	process.exit(1);
}

async function main() {
	try {
		console.log("Downloading files...");
		execSync(
			`git clone --depth 1 --branch main-boilerplate ${git_repo} ${projectPath}`
		);

		process.chdir(projectPath);

		console.log("Installing dependencies...");
		execSync("npm install");

		// console.log("Removing useless files");
		// execSync("npx rimraf ./.git");
		// fs.rmdirSync(path.join(projectPath, "bin"), { recursive: true });

		console.log("The installation is done, this is ready to use !");
	} catch (error) {
		console.log(error);
	}
}
main();

process.exit(0); //no errors occurred
