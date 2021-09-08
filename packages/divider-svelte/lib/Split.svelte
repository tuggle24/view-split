<script>
	import { writable } from "svelte/store";
	import { handleMouseDown } from 'divider-html'

	export const areas = writable([50, 50]);

	export let dividerSize = 10
	function paintScreen (updatedAreas) {
		areas.update(a => updatedAreas)
	}

	function curryMouseDown (event) {
		const currentSizes = $areas
		handleMouseDown(event, currentSizes, paintScreen)
	}

	let panes = []

	$: {
		panes.forEach((pane, position) => {
			const siz = $areas[position]
			const roomForDividers = (dividerSize * 1) / 2
			pane.style.width = `calc(${siz}% - ${roomForDividers}px`
		})
	}

	function splitView (node) {

		parent = node
		const amountOfChildren = node.children.length

		for (let i = 0; i < amountOfChildren; ++i) {
			const child = node.children[i]
			const area = $areas[i]
			const roomForDividers = (dividerSize * 1) / 2
			child.style.width = `calc(${area}% - ${roomForDividers}px`

	panes.push(child)

			if (i % 2 !== 0) {
				const divider = document.createElement("div")
				divider.style.width = `${dividerSize}px`
				divider.style.backgroundColor = 'black'
				node.insertBefore(divider, child);
				divider.addEventListener('mousedown', curryMouseDown)
			}
		}
	}
</script>

<div style='display: flex' use:splitView >
	<slot />
</div>
