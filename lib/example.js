'use strict';

const fs = require('fs');
const path = require('path');

const folders = [
  'src',
  'src/config',
  'src/controllers',
  'src/middleware',
  'src/models',
  'src/models/tables',
  'src/repositories',
  'src/security',
  'src/routes',
  'src/services',
  'src/utils',
  'src/utils/responseHandler',
];

function copyFile(src, dest) {
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
     // console.log(`Copied ${src} to ${dest}`);
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

  // Copy predefined code files
  const codeFiles = [
    { src: 'code/app.js', dest: 'app.js' },
    { src: 'code/.gitignore', dest: '.gitignore' },
    { src: 'code/package.json', dest: 'package.json' },
    { src: 'code/README.md', dest: 'README.md' },
    { src: 'code/.env', dest: 'README.md' },
    { src: 'code/src/controllers/user.controller.js', dest: 'src/controllers/user.controller.js' },
    { src: 'code/src/middleware/authHashPassword.js', dest: 'src/middleware/authHashPassword.js' },
    { src: 'code/src/middleware/authMiddleware.js', dest: 'src/middleware/authMiddleware.js' },
    { src: 'code/src/middleware/errorHandelerMiddleware.js', dest: 'src/middleware/errorHandelerMiddleware.js' },
    { src: 'code/src/middleware/fileuploader.middleware.js', dest: 'src/middleware/fileuploader.middleware.js' },
    { src: 'code/src/models/tables/user.model.js', dest: 'src/models/tables/user.model.js' },
    { src: 'code/src/models/index.js', dest: 'src/models/index.js' },
    { src: 'code/src/models/initModels.js', dest: 'src/models/initModels.js' },
    { src: 'code/src/repositories/user.repository.js', dest: 'src/repositories/user.repository.js' },
    { src: 'code/src/routes/apiroutes.js', dest: 'src/routes/apiroutes.js' },
    { src: 'code/src/security/limiter.js', dest: 'src/security/limiter.js' },
    { src: 'code/src/security/requestInterceptorDataValidation.js', dest: 'src/security/requestInterceptorDataValidation.js' },
    { src: 'code/src/security/session.js', dest: 'src/security/session.js' },
    { src: 'code/src/services/user.service.js', dest: 'src/services/user.service.js' },
    { src: 'code/src/utils/responseHandler/index.js', dest: 'src/utils/responseHandler/index.js' },
    { src: 'code/src/utils/responseHandler/ResponseEntity.js', dest: 'src/utils/responseHandler/ResponseEntity.js' },
    { src: 'code/src/utils/ApiError.js', dest: 'src/utils/ApiError.js' },
    { src: 'code/src/utils/config.js', dest: 'src/utils/config.js' },
    { src: 'code/src/utils/constant.js', dest: 'src/utils/constant.js' },
    { src: 'code/src/utils/logger.js', dest: 'src/utils/logger.js' },
    { src: 'code/src/utils/pagination.js', dest: 'src/utils/pagination.js' },
  ];

  codeFiles.forEach(file => {
    copyFile(path.join(process.cwd(), file.src), path.join(process.cwd(), file.dest));
  });


  console.log('Folder structure and predefined code generated successfully!');
}

generateStructure();
