// Test script to verify admin panel APIs
// Run with: node scripts/test-admin-apis.js

const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Admin Panel Setup...\n');

// Check if data directory exists
const dataDir = path.join(process.cwd(), 'data');
console.log('1. Checking data directory...');
if (fs.existsSync(dataDir)) {
    console.log('   ✓ Data directory exists');
} else {
    console.log('   ℹ Data directory will be created on first submission');
}

// Check API routes exist
console.log('\n2. Checking API routes...');
const apiRoutes = [
    'app/api/contact/route.ts',
    'app/api/auth/login/route.ts',
    'app/api/auth/register/route.ts',
    'app/api/users/route.ts'
];

apiRoutes.forEach(route => {
    if (fs.existsSync(route)) {
        console.log(`   ✓ ${route}`);
    } else {
        console.log(`   ✗ ${route} - MISSING!`);
    }
});

// Check pages exist
console.log('\n3. Checking pages...');
const pages = [
    'app/contact/page.tsx',
    'app/login/page.tsx',
    'app/register/page.tsx',
    'app/admin/page.tsx'
];

pages.forEach(page => {
    if (fs.existsSync(page)) {
        console.log(`   ✓ ${page}`);
    } else {
        console.log(`   ✗ ${page} - MISSING!`);
    }
});

// Check if data files exist
console.log('\n4. Checking data files...');
const contactsFile = path.join(dataDir, 'contacts.json');
const usersFile = path.join(dataDir, 'users.json');

if (fs.existsSync(contactsFile)) {
    const contacts = JSON.parse(fs.readFileSync(contactsFile, 'utf-8'));
    console.log(`   ✓ contacts.json exists (${contacts.length} submissions)`);
} else {
    console.log('   ℹ contacts.json will be created on first contact submission');
}

if (fs.existsSync(usersFile)) {
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
    console.log(`   ✓ users.json exists (${users.length} users)`);
} else {
    console.log('   ℹ users.json will be created on first registration');
}

console.log('\n✅ Setup verification complete!\n');
console.log('📝 To test:');
console.log('   1. Run: npm run dev');
console.log('   2. Visit: http://localhost:3000/contact');
console.log('   3. Submit a test contact form');
console.log('   4. Visit: http://localhost:3000/register');
console.log('   5. Create a test account');
console.log('   6. Visit: http://localhost:3000/login');
console.log('   7. Login with: admin@glazedgloss.com / admin123');
console.log('   8. Check admin panel at: http://localhost:3000/admin\n');
