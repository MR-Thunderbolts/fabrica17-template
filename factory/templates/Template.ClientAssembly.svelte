<script>
	// Plantilla de Ensamblaje Agnóstico
	import { NavbarStandard, HeroSplit, HeroCentered, NavbarCentered } from 'agnostic-component-library';

	const navLinks = [
		{ label: 'Link 1', href: '#' },
		{ label: 'Link 2', href: '#' },
		{ label: 'Link 3', href: '#' },
		{ label: 'Link 4', href: '#' },
		{ label: 'Link 5', href: '#' }
	];

	const leftLinks = [
		{ label: 'Link 1', href: '#' },
		{ label: 'Link 2', href: '#' },
		{ label: 'Link 3', href: '#' }
	];

	const rightLinks = [
		{ label: 'Link 1', href: '#' },
		{ label: 'Link 2', href: '#' }
	];

	const splitStats = [
		{ value: '00', label: 'Metric one' },
		{ value: '00', label: 'metric two' }
	];
</script>

<!-- Componente Organismo: Navbar -->
<NavbarStandard 
	brand="[BRAND_NAME]" 
	links={navLinks} 
	ctaLabel="Action" 
/>

<!-- Componente Organismo: Hero Split -->
<HeroSplit
	eyebrow="[BRAND_NAME]"
	headline="Main Headline"
	headlineAccent="Accent"
	headlineEnd="Sub-headline."
	subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
	primaryCta="Primary Action"
	secondaryCta="Secondary Action"
	stats={splitStats}
	captionTitle="Focus Area"
	captionText="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
/>

<!-- Componente Organismo: Hero Centered -->
<HeroCentered
	eyebrow="[BRAND_NAME]"
	headline={"Centered Headline\nfor the Template"}
	subheading="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
	primaryCta="Primary Action"
	secondaryCta="Secondary Action"
/>

<!-- Componente Organismo: Navbar Centered -->
<NavbarCentered
	brand="[BRAND_NAME]"
	{leftLinks}
	{rightLinks}
	ctaLabel="Action"
/>
