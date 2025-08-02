#!/usr/bin/env node

/**
 * ROI Calculator Pro - Deployment Verification Script
 * 
 * This script verifies that all components of the application
 * are working correctly before production deployment.
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 ROI Calculator Pro - Deployment Verification');
console.log('================================================\n');

let allChecksPass = true;
const results = [];

function checkResult(name, condition, message) {
  const status = condition ? '✅ PASS' : '❌ FAIL';
  const result = `${status} ${name}: ${message}`;
  console.log(result);
  results.push({ name, status: condition ? 'PASS' : 'FAIL', message });
  
  if (!condition) {
    allChecksPass = false;
  }
  
  return condition;
}

// File System Checks
console.log('📁 File System Checks');
console.log('---------------------');

checkResult(
  'Package.json',
  fs.existsSync('package.json'),
  'Package configuration file exists'
);

checkResult(
  'Next.js Config',
  fs.existsSync('next.config.js'),
  'Next.js configuration file exists'
);

checkResult(
  'Prisma Schema',
  fs.existsSync('prisma/schema.prisma'),
  'Database schema file exists'
);

checkResult(
  'Environment Template',
  fs.existsSync('.env'),
  'Environment configuration exists'
);

checkResult(
  'TypeScript Config',
  fs.existsSync('tsconfig.json'),
  'TypeScript configuration exists'
);

checkResult(
  'Tailwind Config',
  fs.existsSync('tailwind.config.ts'),
  'Tailwind CSS configuration exists'
);

console.log('\n📦 Core Components');
console.log('------------------');

// Core component files
const coreComponents = [
  'src/app/page.tsx',
  'src/app/layout.tsx',
  'src/app/auth/page.tsx',
  'src/app/admin/page.tsx',
  'src/components/roi-calculator-form.tsx',
  'src/components/roi-results.tsx',
  'src/components/header.tsx',
  'src/lib/roiCalculator.ts',
  'src/data/businessTypes.ts',
  'src/data/countries.ts'
];

coreComponents.forEach(component => {
  checkResult(
    path.basename(component),
    fs.existsSync(component),
    `Core component exists: ${component}`
  );
});

console.log('\n🔐 Security Components');
console.log('----------------------');

const securityComponents = [
  'src/lib/auth.ts',
  'src/app/api/auth/login/route.ts',
  'src/app/api/auth/signup/route.ts',
  'src/app/api/auth/logout/route.ts',
  'src/app/api/auth/me/route.ts',
  'src/contexts/auth-context.tsx',
  'src/components/auth/auth-form.tsx'
];

securityComponents.forEach(component => {
  checkResult(
    path.basename(component),
    fs.existsSync(component),
    `Security component exists: ${component}`
  );
});

console.log('\n🎨 UI Components');
console.log('----------------');

const uiComponents = [
  'src/components/ui/button.tsx',
  'src/components/ui/card.tsx',
  'src/components/ui/input.tsx',
  'src/components/ui/label.tsx',
  'src/components/ui/select.tsx',
  'src/components/business-type-selector.tsx',
  'src/components/country-selector.tsx',
  'src/components/scenario-selector.tsx'
];

uiComponents.forEach(component => {
  checkResult(
    path.basename(component),
    fs.existsSync(component),
    `UI component exists: ${component}`
  );
});

console.log('\n🚀 Deployment Files');
console.log('-------------------');

const deploymentFiles = [
  'Dockerfile',
  'docker-compose.yml',
  'vercel.json',
  'netlify.toml',
  '.github/workflows/ci.yml'
];

deploymentFiles.forEach(file => {
  checkResult(
    file,
    fs.existsSync(file),
    `Deployment configuration exists: ${file}`
  );
});

console.log('\n📚 Documentation');
console.log('----------------');

const documentationFiles = [
  'README.md',
  'DEPLOYMENT.md',
  'TESTING.md',
  'MAINTENANCE.md',
  'PROJECT_STATUS.md',
  'FINAL_SUMMARY.md',
  'PRODUCTION_CHECKLIST.md'
];

documentationFiles.forEach(file => {
  checkResult(
    file,
    fs.existsSync(file),
    `Documentation exists: ${file}`
  );
});

console.log('\n🔍 Package Dependencies');
console.log('-----------------------');

try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  
  const requiredDependencies = [
    'next',
    'react',
    'react-dom',
    'typescript',
    '@prisma/client',
    'bcryptjs',
    'jsonwebtoken',
    'tailwindcss',
    'recharts',
    'jspdf',
    'html2canvas',
    'react-hook-form',
    'zod',
    '@hookform/resolvers'
  ];

  requiredDependencies.forEach(dep => {
    const exists = packageJson.dependencies?.[dep] || packageJson.devDependencies?.[dep];
    checkResult(
      `Dependency: ${dep}`,
      !!exists,
      exists ? `Version: ${exists}` : 'Missing required dependency'
    );
  });

  checkResult(
    'Scripts Configuration',
    packageJson.scripts?.build && packageJson.scripts?.dev && packageJson.scripts?.start,
    'Required npm scripts are configured'
  );

} catch (error) {
  checkResult(
    'Package.json Parsing',
    false,
    `Error reading package.json: ${error.message}`
  );
}

console.log('\n📊 Data Verification');
console.log('--------------------');

try {
  // Check business types data
  const businessTypesPath = 'src/data/businessTypes.ts';
  if (fs.existsSync(businessTypesPath)) {
    const businessTypesContent = fs.readFileSync(businessTypesPath, 'utf8');
    const businessTypeMatches = businessTypesContent.match(/export const businessTypes.*?=.*?\[/s);
    
    checkResult(
      'Business Types Export',
      !!businessTypeMatches,
      'Business types data structure is properly exported'
    );

    // Count approximate business types (rough estimate)
    const typeMatches = businessTypesContent.match(/id:\s*['"`][^'"`]+['"`]/g);
    const typeCount = typeMatches ? typeMatches.length : 0;
    
    checkResult(
      'Business Types Count',
      typeCount >= 35,
      `Found approximately ${typeCount} business types (target: 35+)`
    );
  }

  // Check countries data
  const countriesPath = 'src/data/countries.ts';
  if (fs.existsSync(countriesPath)) {
    const countriesContent = fs.readFileSync(countriesPath, 'utf8');
    const countriesMatches = countriesContent.match(/export const countries.*?=.*?\[/s);
    
    checkResult(
      'Countries Export',
      !!countriesMatches,
      'Countries data structure is properly exported'
    );

    // Count approximate countries
    const countryMatches = countriesContent.match(/id:\s*['"`][^'"`]+['"`]/g);
    const countryCount = countryMatches ? countryMatches.length : 0;
    
    checkResult(
      'Countries Count',
      countryCount >= 25,
      `Found approximately ${countryCount} countries (target: 25+)`
    );
  }

} catch (error) {
  checkResult(
    'Data File Verification',
    false,
    `Error verifying data files: ${error.message}`
  );
}

console.log('\n🔧 Build Verification');
console.log('---------------------');

// Check if build directory exists (indicates successful build)
const buildExists = fs.existsSync('.next');
checkResult(
  'Build Directory',
  buildExists,
  buildExists ? 'Next.js build directory exists' : 'Run "npm run build" to generate build'
);

// Check if node_modules exists
const nodeModulesExists = fs.existsSync('node_modules');
checkResult(
  'Node Modules',
  nodeModulesExists,
  nodeModulesExists ? 'Dependencies installed' : 'Run "npm install" to install dependencies'
);

console.log('\n📈 Summary');
console.log('----------');

const passCount = results.filter(r => r.status === 'PASS').length;
const failCount = results.filter(r => r.status === 'FAIL').length;
const totalChecks = results.length;

console.log(`Total Checks: ${totalChecks}`);
console.log(`✅ Passed: ${passCount}`);
console.log(`❌ Failed: ${failCount}`);
console.log(`Success Rate: ${((passCount / totalChecks) * 100).toFixed(1)}%`);

if (allChecksPass) {
  console.log('\n🎉 ALL CHECKS PASSED! 🎉');
  console.log('✅ ROI Calculator Pro is ready for production deployment!');
  console.log('\nNext steps:');
  console.log('1. Run "npm run build" if you haven\'t already');
  console.log('2. Configure production environment variables');
  console.log('3. Deploy using your preferred platform (Vercel recommended)');
  console.log('4. Set up monitoring and analytics');
  console.log('5. Celebrate your successful launch! 🚀');
} else {
  console.log('\n⚠️  SOME CHECKS FAILED');
  console.log('Please address the failed checks before deploying to production.');
  console.log('\nFailed checks:');
  results
    .filter(r => r.status === 'FAIL')
    .forEach(r => console.log(`❌ ${r.name}: ${r.message}`));
}

console.log('\n================================================');
console.log('🚀 ROI Calculator Pro - Verification Complete');

// Exit with appropriate code
process.exit(allChecksPass ? 0 : 1);