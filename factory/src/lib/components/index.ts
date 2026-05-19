/**
 * @module Fábrica17 — Barrel Index
 * @description Master export for all Atoms and Molecules.
 * Organisms are now composed inline by agents.
 */

// ── Atoms (Primitives) ──
export { default as Avatar } from './avatar/AvatarRoot.svelte';
export { default as Badge } from './badge/BadgeRoot.svelte';
export { Button, Root as ButtonRoot } from './button';
export { default as Divider } from './divider/DividerRoot.svelte';
export { default as Heading } from './heading/HeadingRoot.svelte';
export { default as Icon } from './icon/IconRoot.svelte';
export { default as Input } from './input/InputRoot.svelte';
export { default as Link } from './link/LinkRoot.svelte';
export { default as Media } from './media/MediaRoot.svelte';
export { default as DottedBackground } from './Dotted.Background.svelte';

// ── Molecules (Compounds) ──
export { Bento, Grid as BentoGrid, Item as BentoItem, Root as BentoRoot } from './bento';
export { Card, Root as CardRoot } from './card';
export { default as Carousel } from './carousel/CarouselRoot.svelte';
export { default as Dialog } from './dialog/DialogRoot.svelte';
export * as Navbar from './navbar';
export * as Section from './section';
export { default as Table } from './table/TableRoot.svelte';
