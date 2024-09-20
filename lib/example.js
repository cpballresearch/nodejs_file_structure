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
  'src/routes/modules',
  'src/services',
  'src/utils',
  'src/utils/responsehandler',
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
    { src: 'code/src/middleware/authhashpassword.middleware.js', dest: 'src/middleware/authhashpassword.middleware.js' },
    { src: 'code/src/middleware/auth.middleware.js', dest: 'src/middleware/auth.middleware.js' },
    { src: 'code/src/middleware/errorhandler.middleware.js', dest: 'src/middleware/errorhandler.middleware.js' },
    { src: 'code/src/middleware/fileuploader.middleware.js', dest: 'src/middleware/fileuploader.middleware.js' },
    { src: 'code/src/models/tables/user.model.js', dest: 'src/models/tables/user.model.js' },
    { src: 'code/src/models/index.model.js', dest: 'src/models/index.model.js' },
    { src: 'code/src/models/initmodels.model.js', dest: 'src/models/initmodels.model.js' },
    { src: 'code/src/repositories/user.repository.js', dest: 'src/repositories/user.repository.js' },
    { src: 'code/src/routes/modules/userapis.routes.js', dest: 'src/models/tables/userapis.routes.js' },
    { src: 'code/src/routes/index.routes.js', dest: 'src/routes/index.routes.js' },
    { src: 'code/src/security/limiter.security.js', dest: 'src/security/limiter.security.js' },
    { src: 'code/src/security/requestinterceptordatavalidation.security.js', dest: 'src/security/requestinterceptordatavalidation.security.js' },
    { src: 'code/src/security/session.security.js', dest: 'src/security/session.security.js' },
    { src: 'code/src/services/user.service.js', dest: 'src/services/user.service.js' },
    { src: 'code/src/utils/responsehandler/index.utils.js', dest: 'src/utils/responsehandler/index.utils.js' },
    { src: 'code/src/utils/responsehandler/responseentity.utils.js', dest: 'src/utils/responsehandler/responseentity.utils.js' },
    { src: 'code/src/utils/apierror.utils.js', dest: 'src/utils/apierror.utils.js' },
    { src: 'code/src/utils/config.utils.js', dest: 'src/utils/config.utils.js' },
    { src: 'code/src/utils/constant.utils.js', dest: 'src/utils/constant.utils.js' },
    { src: 'code/src/utils/filedelete.utils.js', dest: 'src/utils/filedelete.utils.js' },
    { src: 'code/src/utils/logger.utils.js', dest: 'src/utils/logger.utils.js' },
    { src: 'code/src/utils/pagination.utils.js', dest: 'src/utils/pagination.utils.js' },
    { src: 'code/src/utils/sha512.utils.js', dest: 'src/utils/sha512.utils.js' },
  ];

  codeFiles.forEach(file => {
    copyFile(path.join(process.cwd(), file.src), path.join(process.cwd(), file.dest));
  });


  console.log('Folder structure and predefined code generated successfully!');
}

generateStructure();
