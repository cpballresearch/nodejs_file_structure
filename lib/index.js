"use strict";

const fs = require("fs");
const path = require("path");

const folders = [
  "src",
  "src/controllers",
  "src/middleware",
  "src/models",
  "src/models/tables",
  "src/repositories",
  "src/security",
  "src/routes",
  "src/services",
  "src/utils",
  "src/utils/responseHandler"
];

function copyFile(src, dest) {
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      // Console.log(`Copied ${src} to ${dest}`);
    } else {
      console.error(`Source file ${src} does not exist.`);
    }
  } catch (error) {
    console.error(`Failed to copy ${src} to ${dest}: ${error.message}`);
  }
}

function generateStructure() {
  folders.forEach(folder => {
    fs.mkdirSync(path.join(process.cwd(), folder), { recursive: true });
  });

  // Copy predefined code files from the library's directory
  const libRoot = path.join(__dirname, "code"); // Adjusted to use __dirname
  const codeFiles = [
    { src: path.join(libRoot, "app.js"), dest: "app.js" },
    { src: path.join(libRoot, "package.json"), dest: "package.json" },
    { src: path.join(libRoot, "README.md"), dest: "README.md" },
    { src: path.join(libRoot, ".env"), dest: ".env" },
    {
      src: path.join(libRoot, "src/controllers/user.controller.js"),
      dest: "src/controllers/user.controller.js"
    },
    {
      src: path.join(libRoot, "src/middleware/authHashPassword.js"),
      dest: "src/middleware/authHashPassword.js"
    },
    {
      src: path.join(libRoot, "src/middleware/authMiddleware.js"),
      dest: "src/middleware/authMiddleware.js"
    },
    {
      src: path.join(libRoot, "src/middleware/errorHandelerMiddleware.js"),
      dest: "src/middleware/errorHandelerMiddleware.js"
    },
    {
      src: path.join(libRoot, "src/middleware/fileuploader.middleware.js"),
      dest: "src/middleware/fileuploader.middleware.js"
    },
    {
      src: path.join(libRoot, "src/models/tables/user.model.js"),
      dest: "src/models/tables/user.model.js"
    },
    {
      src: path.join(libRoot, "src/models/index.js"),
      dest: "src/models/index.js"
    },
    {
      src: path.join(libRoot, "src/models/initModels.js"),
      dest: "src/models/initModels.js"
    },
    {
      src: path.join(libRoot, "src/repositories/user.repository.js"),
      dest: "src/repositories/user.repository.js"
    },
    {
      src: path.join(libRoot, "src/routes/apiroutes.js"),
      dest: "src/routes/apiroutes.js"
    },
    {
      src: path.join(libRoot, "src/security/limiter.js"),
      dest: "src/security/limiter.js"
    },
    {
      src: path.join(
        libRoot,
        "src/security/requestInterceptorDataValidation.js"
      ),
      dest: "src/security/requestInterceptorDataValidation.js"
    },
    {
      src: path.join(libRoot, "src/security/session.js"),
      dest: "src/security/session.js"
    },
    {
      src: path.join(libRoot, "src/services/user.service.js"),
      dest: "src/services/user.service.js"
    },
    {
      src: path.join(libRoot, "src/utils/responseHandler/index.js"),
      dest: "src/utils/responseHandler/index.js"
    },
    {
      src: path.join(libRoot, "src/utils/responseHandler/ResponseEntity.js"),
      dest: "src/utils/responseHandler/ResponseEntity.js"
    },
    {
      src: path.join(libRoot, "src/utils/ApiError.js"),
      dest: "src/utils/ApiError.js"
    },
    {
      src: path.join(libRoot, "src/utils/config.js"),
      dest: "src/utils/config.js"
    },
    {
      src: path.join(libRoot, "src/utils/constant.js"),
      dest: "src/utils/constant.js"
    },
    {
      src: path.join(libRoot, "src/utils/logger.js"),
      dest: "src/utils/logger.js"
    },
    {
      src: path.join(libRoot, "src/utils/pagination.js"),
      dest: "src/utils/pagination.js"
    }
  ];

  codeFiles.forEach(file => {
    copyFile(file.src, path.join(process.cwd(), file.dest));
  });

  console.log("Folder structure and predefined code generated successfully!");
}

module.exports = {
  generateStructure
};
