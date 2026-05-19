import fs from 'fs';
import path from 'path';

const CRITICAL_FILES = [
	'utils/tokens.css',
	'utils/app.css',
	'utils/client-brand.css',
	'factory/src/lib/components/index.ts',
	'factory/src/lib/components/_shared/types.ts',
	'src/app.css'
];

console.log('🛡️ Fábrica17 Integrity Check...');

let missingFiles = 0;

CRITICAL_FILES.forEach(file => {
	const absolutePath = path.resolve(process.cwd(), file);
	if (!fs.existsSync(absolutePath)) {
		console.error(`❌ MISSING CRITICAL FILE: ${file}`);
		missingFiles++;
	} else {
		console.log(`✅ ${file} is present.`);
	}
});

if (missingFiles > 0) {
	console.error(`\n🚨 Integrity Check FAILED: ${missingFiles} critical files are missing!`);
	process.exit(1);
} else {
	console.log('\n🌟 Integrity Check PASSED: Factory is in Pure State.');
	process.exit(0);
}
