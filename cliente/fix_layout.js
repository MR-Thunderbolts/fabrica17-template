import fs from 'fs';
import path from 'path';

const projectPath = '/Users/amarolatoja/Proyectos/Ciclo17/fabrica17/cliente';

const edits = [
	{
		file: 'LandingQuoteForm.svelte',
		changes: [
			{
				search: 'font-size: 15px;\n\t\tfont-weight: 600;',
				replace: 'font-size: var(--text-base);\n\t\tfont-weight: 600;'
			},
			{
				search: 'font-size: 14px;\n\t\tfont-weight: 500;',
				replace: 'font-size: var(--text-base);\n\t\tfont-weight: 500;'
			},
			{
				search: 'width: 36px;\n\t\theight: 36px;',
				replace: 'width: 44px;\n\t\theight: 44px;'
			}
		]
	},
	{
		file: 'LandingPainPoints.svelte',
		changes: [
			{
				search: 'display: flex;\n\t\tflex-direction: column;\n\t\tgap: 32px;\n\t\twidth: 100%;',
				replace: 'display: flex;\n\t\tflex-direction: column;\n\t\tgap: 32px;\n\t\twidth: 100%;\n\t\tmax-width: var(--content-max);\n\t\tmargin: 0 auto;'
			},
			{
				// Recover the subtitle which was overwritten in mobile!
				search: 'font-size: var(--text-base);\n\t\t}\n\n\t\t.painpoints-heading {',
				replace: 'font-size: var(--text-2xl);\n\t\t\tline-height: 1.15;\n\t\t}\n\n\t\t.painpoints-subtitle {\n\t\t\ttext-align: left;\n\t\t\tfont-size: var(--text-base);\n\t\t}\n\n\t\t.painpoints-heading {'
			}
		]
	},
	{
		file: 'LandingMetodologia.svelte',
		changes: [
			{
				search: 'height: 100%;\n\t}',
				replace: 'height: clamp(400px, 60vh, 500px);\n\t}'
			},
			{
				search: 'padding: 64px;',
				replace: 'padding: 48px;'
			}
		]
	},
	{
		file: 'LandingNav.svelte',
		changes: [
			{
				search: 'width: min(1152px, calc(100% - 64px));',
				replace: 'width: calc(100% - (var(--gutter) * 2));\n\t\tmax-width: var(--content-max);'
			}
		]
	},
	{
		file: 'LandingHero.svelte',
		changes: [
			{
				search: 'overflow: hidden;\n\t\twidth: 100%;',
				replace: 'width: 100%;' // Remove overflow hidden to avoid clipping gradients
			}
		]
	},
	{
		file: 'LandingOferta.svelte',
		changes: [
			{
				search: 'overflow: hidden;\n\t\tdisplay: flex;',
				replace: 'display: flex;' // Remove overflow hidden if it clips gradients
			}
		]
	},
	{
		file: 'LandingSeguridad.svelte',
		changes: [
			{
				search: 'overflow: hidden;\n\t\tdisplay: flex;',
				replace: 'display: flex;' // Remove overflow hidden if it clips gradients
			}
		]
	},
	{
		file: 'HeroSection.svelte',
		changes: [
			{
				search: 'align-items: flex-start;\n\t\twidth: 100%;',
				replace: 'align-items: flex-start;\n\t\twidth: 100%;\n\t\tmargin-top: 24px;' // Push down the hero so it doesn't overlap with absolute nav
			},
			{
				search: 'import IconArrowLeft from "~icons/factory/arrow-left";',
				replace: 'import IconArrowLeft from "~icons/lucide/arrow-left";'
			}
		]
	}
];

for (const edit of edits) {
	const filePath = path.join(projectPath, edit.file);
	if (!fs.existsSync(filePath)) {
		console.warn(`File not found: ${filePath}`);
		continue;
	}
	
	let content = fs.readFileSync(filePath, 'utf8');
	let changed = false;
	
	for (const change of edit.changes) {
		if (content.includes(change.search)) {
			content = content.replace(change.search, change.replace);
			changed = true;
		} else {
			console.warn(`Could not find target in ${edit.file}: ${change.search}`);
		}
	}
	
	if (changed) {
		fs.writeFileSync(filePath, content);
		console.log(`Updated ${edit.file}`);
	}
}
