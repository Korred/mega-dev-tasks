import { mount } from 'svelte';
const pages = import.meta.glob('./routes/kb/**/+page.svx', { eager: true });
const route = new URL(location.href).searchParams.get('page') ?? location.pathname.replace(/\/$/, '');
const key = `./routes${route}/+page.svx`;
const page = pages[key] ?? pages['./routes/kb/incidents/4471/+page.svx'];
mount(page.default, { target: document.getElementById('app') });
