#!/usr/bin/env node

import boxen from "boxen";
import chalk from "chalk";
import { execSync } from "child_process";
import figlet from "figlet";
import fs from "fs";
import gradient from "gradient-string";
import inquirer from "inquirer";
import ora from "ora";
import path from "path";

// Update repository references to ensure they exist and are accessible
const templates = {
  express: {
    prisma: "github:cpballresearch/express_prisma_folder_structure",
    sequelize: "github:cpballresearch/express_sequelize_folder_structure"
  },
  react: "github:cpballresearch/react_folder_structure",
  reactnative: "github:cpballresearch/react_native_folder_structure"
};

// Display app header
function displayHeader() {
  console.clear();
  console.log("\n");

  // Create NFS title with more centered layout
  const title = figlet.textSync("NFS", {
    font: "ANSI Shadow",
    horizontalLayout: "full", // Changed from 'fitted' to 'full'
    verticalLayout: "default",
    width: 100
  });

  // Center the gradient title in the console
  const terminalWidth = process.stdout.columns || 80;
  const titleLines = title.split("\n");
  const titleWidth = Math.max(...titleLines.map(line => line.length));
  const paddingSize = Math.max(0, Math.floor((terminalWidth - titleWidth) / 2));
  const padding = " ".repeat(paddingSize);

  const centeredTitle = titleLines.map(line => padding + line).join("\n");
  console.log(gradient.pastel(centeredTitle));

  // Subtitle in a centered box
  console.log(
    boxen(
      chalk.white.bold("✨ Create modern project structures in seconds ✨"),
      {
        padding: 1,
        margin: {
          top: 1,
          bottom: 1,
          left: Math.max(1, Math.floor((terminalWidth - 50) / 2)), // Center the box
          right: 1
        },
        borderStyle: "round",
        borderColor: "cyan",
        backgroundColor: "#003366",
        textAlignment: "center" // Center the text inside the box
      }
    )
  );
  console.log("\n");
}

async function main() {
  displayHeader();

  const { framework, projectName } = await inquirer.prompt([
    {
      type: "list",
      name: "framework",
      message: chalk.cyanBright.bold(
        "📦 Which project template do you want to use?"
      ),
      prefix: "🔍",
      choices: [
        {
          value: "Express",
          name:
            chalk.green.bold("Express") + chalk.gray(" - Node.js web framework")
        },
        {
          value: "React",
          name:
            chalk.blue.bold("React") + chalk.gray(" - UI library for web apps")
        },
        {
          value: "ReactNative",
          name:
            chalk.magenta.bold("React Native") +
            chalk.gray(" - Mobile app framework")
        }
      ]
    },
    {
      type: "input",
      name: "projectName",
      message: chalk.cyanBright.bold("📝 Enter your project name:"),
      prefix: "💼",
      default: "my-awesome-project",
      validate: input => (input.trim() ? true : "Project name is required")
    }
  ]);

  let repoPath;
  let repoName;

  // Handle Express ORM selection
  if (framework === "Express") {
    console.log(
      chalk.yellow("\n📊 Express projects require an ORM for database access")
    );
    const { orm } = await inquirer.prompt([
      {
        type: "list",
        name: "orm",
        message: chalk.cyanBright.bold("Select your preferred ORM:"),
        prefix: "🗃️",
        choices: [
          {
            value: "Prisma",
            name:
              chalk.green.bold("Prisma") +
              chalk.gray(" - Next-gen ORM with type safety")
          },
          {
            value: "Sequelize",
            name:
              chalk.yellow.bold("Sequelize") +
              chalk.gray(" - Traditional ORM for SQL databases")
          }
        ]
      }
    ]);

    repoPath = templates.express[orm.toLowerCase()];
    repoName = `express_${orm.toLowerCase()}_folder_structure`;
  } else {
    // Handle React and React Native
    const key = framework.toLowerCase();
    repoPath = templates[key];
    repoName =
      key === "react"
        ? "react_folder_structure"
        : "react_native_folder_structure";
  }

  if (!repoPath) {
    console.log(
      boxen(chalk.red.bold("❌ Invalid framework selected."), {
        padding: 1,
        borderStyle: "double",
        borderColor: "red",
        backgroundColor: "#400"
      })
    );
    return;
  }

  // Show project creation banner
  console.log("\n");
  console.log(
    boxen(
      chalk.white.bold(
        `🚀 Creating ${chalk.greenBright.bold(
          framework
        )} project: ${chalk.cyanBright.bold(projectName)}`
      ),
      {
        padding: 1,
        borderStyle: "classic",
        borderColor: "green",
        backgroundColor: "#143"
      }
    )
  );

  try {
    // Alternative approach: Use direct git clone instead of download-git-repo
    const targetDir = path.resolve(process.cwd(), projectName);

    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Clone repository using git directly with a loading spinner
    const spinner = ora({
      text: chalk.blue.bold(
        `Cloning template repository... This might take a moment`
      ),
      color: "cyan",
      spinner: "dots"
    }).start();

    const gitCommand = `git clone https://github.com/cpballresearch/${repoName}.git ${targetDir}`;

    try {
      execSync(gitCommand, { stdio: "pipe" });
      spinner.succeed(
        chalk.green.bold("Template repository cloned successfully ✓")
      );
    } catch (cloneError) {
      spinner.fail(chalk.red.bold("Failed to clone repository ✗"));
      throw cloneError;
    }

    // Remove .git directory with spinner
    const removeSpinner = ora({
      text: chalk.blue.bold(`Customizing project...`),
      color: "yellow",
      spinner: "bouncingBar"
    }).start();

    try {
      const gitFolder = path.join(targetDir, ".git");
      if (fs.existsSync(gitFolder)) {
        fs.rmSync(gitFolder, { recursive: true, force: true });
      }

      removeSpinner.succeed(
        chalk.green.bold("Project customized successfully ✓")
      );
    } catch (removeError) {
      removeSpinner.fail(chalk.red.bold("Failed to customize project ✗"));
      throw removeError;
    }

    // Success message with gradient
    console.log("\n");
    const successBox = boxen(
      gradient.cristal.multiline(chalk.bold("🎉 Project setup complete! 🎉")) +
        "\n\n" +
        chalk.cyanBright.bold("To get started:") +
        "\n\n" +
        chalk.greenBright.bold(`  cd ${projectName}`) +
        "\n" +
        chalk.greenBright.bold("  npm install") +
        "\n" +
        chalk.greenBright.bold("  npm start"),
      {
        padding: 1,
        margin: 1,
        borderStyle: "double",
        borderColor: "green",
        backgroundColor: "#143",
        textAlignment: "center"
      }
    );
    console.log(successBox);

    // Add some tips
    console.log(
      boxen(
        chalk.yellowBright.bold("💡 Pro tips:") +
          "\n\n" +
          chalk.white("• Customize your project structure as needed") +
          "\n" +
          chalk.white("• Update dependencies to their latest versions") +
          "\n" +
          chalk.white("• Check the README for more instructions"),
        {
          padding: 1,
          margin: { top: 1, bottom: 1, left: 0, right: 0 },
          borderStyle: "round",
          borderColor: "yellow",
          backgroundColor: "#552"
        }
      )
    );
  } catch (error) {
    console.log("\n");
    console.log(
      boxen(
        chalk.redBright.bold("❌ Error creating project") +
          "\n\n" +
          chalk.yellowBright.bold(error.message) +
          "\n\n" +
          chalk.whiteBright(
            "Tip: Ensure the repository exists and you have internet access."
          ),
        {
          padding: 1,
          margin: 1,
          borderStyle: "double",
          borderColor: "red",
          backgroundColor: "#400"
        }
      )
    );
  }
}

main().catch(error => {
  console.log("\n");
  console.log(
    boxen(
      chalk.redBright.bold("❌ Unexpected Error") +
        "\n\n" +
        chalk.yellowBright.bold(error.stack || error.message),
      {
        padding: 1,
        margin: 1,
        borderStyle: "double",
        borderColor: "red",
        backgroundColor: "#400"
      }
    )
  );
  process.exit(1);
});
