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

// Define custom gradients for better visual appeal
const sunsetGradient = gradient(["#FF512F", "#F09819", "#FF8C00"]);
const purpleGradient = gradient(["#8E2DE2", "#4A00E0"]);
const goldGradient = gradient(["#FFD700", "#FFA500", "#FF8C00", "#DAA520"]);
const cyberGradient = gradient(["#00FFFF", "#0000FF", "#8A2BE2", "#FF00FF"]);

// Display app header with enhanced visuals
function displayHeader() {
  console.clear();
  console.log("\n");

  // Create a more visually appealing title with a better font
  const title = figlet.textSync("NFS", {
    font: "ANSI Shadow",
    horizontalLayout: "fitted",
    verticalLayout: "default",
    width: 100
  });

  // Add a subtitle with a different font for contrast
  const subtitle = figlet.textSync("Node File Structure", {
    font: "Small",
    horizontalLayout: "fitted",
    verticalLayout: "default"
  });

  // Center the gradient title in the console with enhanced colors
  const terminalWidth = process.stdout.columns || 80;
  const titleLines = title.split("\n");
  const titleWidth = Math.max(...titleLines.map(line => line.length));
  const paddingSize = Math.max(0, Math.floor((terminalWidth - titleWidth) / 2));
  const padding = " ".repeat(paddingSize);

  // Add decorative borders around the title
  const border = "═".repeat(Math.min(terminalWidth - 10, titleWidth + 10));
  const sideBorder = "║";

  console.log("\n" + chalk.cyan(padding + border));

  // Display the main title with a cyber gradient
  const centeredTitle = titleLines
    .map(line => padding + sideBorder + " " + line + " " + sideBorder)
    .join("\n");
  console.log(cyberGradient(centeredTitle));

  // Display the subtitle with a gold gradient
  const subtitleLines = subtitle.split("\n");
  const subtitleWidth = Math.max(...subtitleLines.map(line => line.length));
  const subtitlePadding = Math.max(
    0,
    Math.floor((terminalWidth - subtitleWidth) / 2)
  );
  const subtitlePaddingStr = " ".repeat(subtitlePadding);

  const centeredSubtitle = subtitleLines
    .map(line => subtitlePaddingStr + line)
    .join("\n");
  console.log(goldGradient(centeredSubtitle));

  console.log(chalk.cyan(padding + border));

  // A more eye-catching tagline in a centered box with custom colors
  console.log(
    boxen(
      chalk.whiteBright.bold(
        "✨ Create modern project structures in seconds ✨"
      ),
      {
        padding: 1,
        margin: {
          top: 1,
          bottom: 1,
          left: Math.max(1, Math.floor((terminalWidth - 50) / 2)),
          right: 1
        },
        borderStyle: "round",
        borderColor: "#00FFFF",
        backgroundColor: "#0A2463",
        textAlignment: "center"
      }
    )
  );

  // Additional ASCII decoration
  console.log("\n" + chalk.dim("━".repeat(terminalWidth)) + "\n");
}

async function main() {
  displayHeader();

  // Enhanced prompt styling with emojis and better formatting
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
            "🚀 " +
            chalk.greenBright.bold("Express") +
            chalk.gray(" - Node.js web framework")
        },
        {
          value: "React",
          name:
            "⚛️ " +
            chalk.blueBright.bold("React") +
            chalk.gray(" - UI library for web apps")
        },
        {
          value: "ReactNative",
          name:
            "📱 " +
            chalk.magentaBright.bold("React Native") +
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

  // Enhance Express ORM selection with better visuals
  if (framework === "Express") {
    console.log(
      boxen(
        chalk.yellowBright(
          "\n📊 Express projects require an ORM for database access"
        ),
        {
          padding: 0.5,
          margin: { top: 1, bottom: 1 },
          borderStyle: "round",
          borderColor: "yellow",
          backgroundColor: "#332b00"
        }
      )
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
              "🔷 " +
              chalk.greenBright.bold("Prisma") +
              chalk.gray(" - Next-gen ORM with type safety")
          },
          {
            value: "Sequelize",
            name:
              "🔶 " +
              chalk.yellowBright.bold("Sequelize") +
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
      boxen(chalk.redBright.bold("❌ Invalid framework selected."), {
        padding: 1,
        borderStyle: "double",
        borderColor: "red",
        backgroundColor: "#400",
        textAlignment: "center"
      })
    );
    return;
  }

  // Show project creation banner with enhanced visuals
  console.log("\n");
  console.log(
    boxen(
      chalk.cyan(
        `🚀 Creating ${chalk.bold(framework)} project: ${chalk.bold(
          projectName
        )}`
      ),
      {
        padding: 1,
        borderStyle: "classic",
        borderColor: "#2193b0",
        backgroundColor: "#0a2540",
        textAlignment: "center"
      }
    )
  );

  try {
    const targetDir = path.resolve(process.cwd(), projectName);

    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // More visually appealing spinner
    const spinner = ora({
      text: chalk.blueBright.bold(`Cloning template repository...`),
      color: "cyan",
      spinner: "moon",
      prefixText: chalk.dim("⏳")
    }).start();

    const gitCommand = `git clone https://github.com/cpballresearch/${repoName}.git ${targetDir}`;

    try {
      execSync(gitCommand, { stdio: "pipe" });
      spinner.succeed(
        chalk.greenBright.bold("✓ Template repository cloned successfully")
      );
    } catch (cloneError) {
      spinner.fail(chalk.redBright.bold("✗ Failed to clone repository"));
      throw cloneError;
    }

    // Enhanced spinner for project customization
    const removeSpinner = ora({
      text: chalk.blueBright.bold(`Customizing project...`),
      color: "magenta",
      spinner: "dots",
      prefixText: chalk.dim("🔧")
    }).start();

    try {
      const gitFolder = path.join(targetDir, ".git");
      if (fs.existsSync(gitFolder)) {
        fs.rmSync(gitFolder, { recursive: true, force: true });
      }

      removeSpinner.succeed(
        chalk.greenBright.bold("✓ Project customized successfully")
      );
    } catch (removeError) {
      removeSpinner.fail(chalk.redBright.bold("✗ Failed to customize project"));
      throw removeError;
    }

    // Success message with enhanced gradient and visual appeal
    console.log("\n");

    // Celebratory ASCII art
    const celebration = figlet.textSync("SUCCESS!", {
      font: "Small",
      horizontalLayout: "default",
      verticalLayout: "default"
    });

    const successBox = boxen(
      purpleGradient(celebration) +
        "\n\n" +
        chalk.whiteBright.bold("🎉 Project setup complete! 🎉") +
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
        borderStyle: "round",
        borderColor: "#4A00E0",
        backgroundColor: "#190a40",
        textAlignment: "center"
      }
    );
    console.log(successBox);

    // Add more visually appealing tips box
    console.log(
      boxen(
        sunsetGradient("💡 PRO TIPS") +
          "\n\n" +
          chalk.whiteBright("• ") +
          chalk.yellowBright("Customize your project structure as needed") +
          "\n" +
          chalk.whiteBright("• ") +
          chalk.yellowBright("Update dependencies to their latest versions") +
          "\n" +
          chalk.whiteBright("• ") +
          chalk.yellowBright("Check the README for more instructions"),
        {
          padding: 1,
          margin: { top: 1, bottom: 1, left: 0, right: 0 },
          borderStyle: "round",
          borderColor: "#FF8C00",
          backgroundColor: "#332000",
          textAlignment: "center"
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
          backgroundColor: "#400",
          textAlignment: "center"
        }
      )
    );
  }

  // Add a final horizontal line for a clean end to the output
  console.log("\n" + chalk.dim("━".repeat(process.stdout.columns || 80)));
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
        backgroundColor: "#400",
        textAlignment: "center"
      }
    )
  );
  process.exit(1);
});
