/**
 * @module _shared/types
 * @description Core type system for the Fábrica17 Atomic Design System.
 */
import type { Snippet } from 'svelte';

/** Base props every compound sub-component inherits */
export type FabricaBaseProps = {
	class?: string;
	id?: string;
};

/**
 * Renderless pattern (A8)
 */
export type WithChild<P = {}> = P &
	FabricaBaseProps & {
		children?: Snippet;
		child?: Snippet<[{ props: Record<string, unknown> }]>;
	};

// ── ATOMS ──

export interface ButtonProps {
	variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'blank';
	type?: 'button' | 'submit' | 'reset';
	disabled?: boolean;
	onclick?: (e: MouseEvent) => void;
	ariaLabel?: string;
}

export interface HeadingProps {
	variant?: 'default' | 'blank';
	level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
	badge?: string;
	subheading?: string;
}

export interface IconProps {
	icon: any;
	size?: string | number;
}

export interface MediaProps {
	src?: string;
	alt?: string;
	aspect?: 'auto' | '1/1' | '16/9' | '4/3' | '3/2';
	fit?: 'cover' | 'contain' | 'fill';
}

export interface InputProps {
	type?: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
	placeholder?: string;
	value?: string;
	disabled?: boolean;
	error?: string;
}

export interface BadgeProps {
	variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'outline';
}

export interface AvatarProps {
	src?: string;
	alt?: string;
	size?: 'sm' | 'md' | 'lg' | 'xl';
	fallback?: string;
}

export interface DividerProps {
	orientation?: 'horizontal' | 'vertical';
}

export interface LinkProps {
	href?: string;
	active?: boolean;
	underline?: boolean;
	external?: boolean;
}

// ── MOLECULES ──

export interface NavbarRootProps {
	sticky?: boolean;
}

export interface NavbarBrandProps {
	brandName?: string;
	href?: string;
}

export interface NavbarLinksProps {
	links: Array<{ label: string; href: string }>;
	currentPath?: string;
}

export interface CardRootProps {
	variant?: 'elevated' | 'outlined' | 'filled' | 'ghost' | 'blank';
	interactive?: boolean;
	onclick?: (e: MouseEvent) => void;
}

export interface CarouselRootProps {}

export interface CarouselTrackProps {
	scrollContainer?: HTMLDivElement;
}

export interface DialogProps {
	open?: boolean;
}

export interface BentoGridProps {
	columns?: number;
}

export interface SectionProps {
	padding?: 'small' | 'medium' | 'large' | 'none';
	background?: 'default' | 'warm' | 'primary' | 'muted';
	fullWidth?: boolean;
	content?: import('svelte').Snippet;
	sidebar?: import('svelte').Snippet;
}
