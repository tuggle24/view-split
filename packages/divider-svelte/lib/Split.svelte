<script context="module">
	export const SPLIT = {};
</script>

<script>
	import { setContext, } from 'svelte';
	import { sizes } from './stores.js'
	
	export let dividerSize = 10

	setContext(SPLIT, {
		registerPane: pane => {
			sizes.update(c => {
					const newSizes = [...c, pane]
					const amountOfPanes = newSizes.filter(p => p.type === 'pane').length
				const updatedSystem = newSizes.map(p => {
					if (p.type === 'pane') {
						p.size = 100 / amountOfPanes
					}
					return p
				})
				return updatedSystem
			})
		},
		registerDivider: divider => {
			sizes.update(c => {
				const newSizes = [...c, divider]
				const updatedSystem = newSizes.map(p => {
					if (p.type === 'divider') {
						p.size = dividerSize
					}
					return p
				})
				return updatedSystem
			})
		},
		sizes
	})
</script>

<div style='display: flex'>
	<slot />
</div>
