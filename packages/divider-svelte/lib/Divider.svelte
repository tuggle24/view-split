<script>
	import { getContext } from 'svelte';
	import { dividing } from './stores.js'
	
	const { registerDivider } = getContext(SPLIT)
	const divider = {
		type: 'divider',
		isStatic: false,
		size: 0
	}
	
	registerDivider(divider)
</script>


<div 
		 use:dividing={divider}
		 style="color: green; width: calc(20px)"
>
	D
</div>