"use strict";

const fs = require("fs");
const path = require("path");

const folders = [
  'src',
  'src/controllers',
  'src/middleware',
  'src/models',
  'src/models/tables',
  'src/repositories',
  'src/security',
  'src/routes',
  'src/routes/modules',
  'src/services',
  'src/utils',
  'src/utils/responsehandler',
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
  const libRoot = path.join(__dirname, "codeNodeSql"); // Adjusted to use __dirname
  const codeFiles = [
    { src: path.join(libRoot, 'app.js'), dest: 'app.js' },
    { src: path.join(libRoot, 'package.json'), dest: 'package.json' },
    { src: path.join(libRoot, 'README.md'), dest: 'README.md' },
    { src: path.join(libRoot, '.env'), dest: '.env' },
    { src: path.join(libRoot, 'src/controllers/user.controller.js'), dest: 'src/controllers/user.controller.js' },
    { src: path.join(libRoot, 'src/middleware/authhashpassword.middleware.js'), dest: 'src/middleware/authhashpassword.middleware.js' },
    { src: path.join(libRoot, 'src/middleware/auth.middleware.js'), dest: 'src/middleware/auth.middleware.js' },
    { src: path.join(libRoot, 'src/middleware/errorhandler.middleware.js'), dest: 'src/middleware/errorhandler.middleware.js' },
    { src: path.join(libRoot, 'src/middleware/fileuploader.middleware.js'), dest: 'src/middleware/fileuploader.middleware.js' },
    { src: path.join(libRoot, 'src/models/tables/user.model.js'), dest: 'src/models/tables/user.model.js' },
    { src: path.join(libRoot, 'src/models/index.model.js.js'), dest: 'src/models/index.model.js.js' },
    { src: path.join(libRoot, 'src/models/initmodels.model.js'), dest: 'src/models/initmodels.model.js' },
    { src: path.join(libRoot, 'src/repositories/user.repository.js'), dest: 'src/repositories/user.repository.js' },
    { src: path.join(libRoot, 'src/routes/modules/userapis.routes.js'), dest: 'src/models/tables/userapis.routes.js' },
    { src: path.join(libRoot, 'src/routes/index.routes.js'), dest: 'src/routes/index.routes.js' },
    { src: path.join(libRoot, 'src/security/limiter.security.js'), dest: 'src/security/limiter.security.js' },
    { src: path.join(libRoot, 'src/security/requestinterceptordatavalidation.security.js'), dest: 'src/security/requestinterceptordatavalidation.security.js' },
    { src: path.join(libRoot, 'src/security/session.security.js'), dest: 'src/security/session.security.js' },
    { src: path.join(libRoot, 'src/services/user.service.js'), dest: 'src/services/user.service.js' },
    { src: path.join(libRoot, 'src/utils/responsehandler/index.utils.js'), dest: 'src/utils/responsehandler/index.utils.js' },
    { src: path.join(libRoot, 'src/utils/responsehandler/responseentity.utils.js'), dest: 'src/utils/responsehandler/responseentity.utils.js' },
    { src: path.join(libRoot, 'src/utils/apierror.utils.js'), dest: 'src/utils/apierror.utils.js' },
    { src: path.join(libRoot, 'src/utils/config.utils.js'), dest: 'src/utils/config.utils.js' },
    { src: path.join(libRoot, 'src/utils/constant.utils.js'), dest: 'src/utils/constant.utils.js' },
    { src: path.join(libRoot, 'src/utils/filedelete.utils.js'), dest: 'src/utils/filedelete.utils.js' },
    { src: path.join(libRoot, 'src/utils/logger.utils.js'), dest: 'src/utils/logger.utils.js' },
    { src: path.join(libRoot, 'src/utils/pagination.utils.js'), dest: 'src/utils/pagination.utils.js' },
    { src: path.join(libRoot, 'src/utils/sha512.utils.js'), dest: 'src/utils/sha512.utils.js' },
  ];

  codeFiles.forEach(file => {
    copyFile(file.src, file.dest);
  });
  
  console.log("Folder structure and predefined code generated successfully!");
}

module.exports = {
  generateStructure
};
