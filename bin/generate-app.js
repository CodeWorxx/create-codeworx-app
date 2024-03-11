#! /usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);
if (args.length < 1) {
	console.error(
		`Please provide the app name\n\nExample: create-codeworx-app app-name\n`
	);
	process.exit(1); //an error occurred
}

const projectName = args[0];
const currentPath = process.cwd();
const git_repo = `https://github.com/CodeWorxx/create-codeworx-app`;

try {
	if (projectName !== ".") {
		console.log("Creating app with name: ", projectName);
		const isFolderExists = fs.existsSync(projectName);
		if (isFolderExists) {
			console.error(
				`The file ${projectName} already exist in the current directory, please give it another name.`
			);
			process.exit(1);
		}
	} else {
		console.log("Creating app with name: ", path.basename(currentPath));
	}
} catch (err) {
	console.log(error);
	process.exit(1);
}

async function main() {
	try {
		console.log("Downloading files...");
		// Git clone with depth 1 to only get the latest commit and add time out to prevent the process from running indefinitely
		execSync(
			`git clone --depth 1 --branch main-boilerplate ${git_repo} ${projectName}`,
			{
				encoding: "utf-8",
				timeout: 10000,
			}
		);

		process.chdir(projectName);

		// console.log("Installing dependencies...");
		// execSync("npm install");

		// execSync("rm -rf .git");
		// execSync("git init");
		// execSync("git add .");
		// execSync('git commit -m "Initial commit"');

		console.log("The app has been created successfully!");
		console.log("\nTo get started, run the following commands:\n");
		if (process.cwd() !== currentPath) {
			console.log(`cd ${projectName}`);
		}
		console.log("npm install");
		console.log("npm run dev");
	} catch (error) {
		console.log(error);
	}
}
main();

process.exit(0); //no errors occurred
