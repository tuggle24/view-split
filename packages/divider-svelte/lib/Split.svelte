<script>
	import { writable } from "svelte/store";
	import { handleMouseDown, buildSystem } from 'divider-html'

	export let options = {}

	export const store = writable({});

	function paintScreen (position, newSizes) {
		store.update(a => {
			for (let i = 0; i < a.sizes.length; i++) {
				if (i == position - 1) {
					a.sizes[i] = newSizes[0];
        		}
        		if (i == position) {
					a.sizes[i] = newSizes[1];
        		}
			}
			return a
		})
	}

	function capturePosition (position) {
		return function (event) {
			const currentSizes = $store
			handleMouseDown(position, event, currentSizes, paintScreen)
		}
	}

	let panes = []

	$: {
		panes.forEach((pane, position) => {
			const siz = $store.sizes[position]
			const roomForDividers = ($store.dividerSize * 1) / 2
			pane.style.width = `calc(${siz}% - ${roomForDividers}px)`
		})
	}

	function splitView (node) {
		parent = node
		const amountOfChildren = node.children.length
		store.set(buildSystem(options, amountOfChildren))

		for (let position = amountOfChildren - 1; position >= 0; --position) {
			const child = node.children[position]
			const area = $store.sizes[position]
			const roomForDividers = ($store.dividerSize * 1) / 2
			child.style.width = `calc(${area}% - ${roomForDividers}px)`
			panes.unshift(child)

			if (position != 0) {
				const divider = document.createElement("div")
				divider.style.width = `${$store.dividerSize}px`
				divider.style.backgroundColor = 'black'
				parent.insertBefore(divider, child)
				const captureEvent = capturePosition(position)
				divider.addEventListener('mousedown', captureEvent)
			}
		}
	}
</script>

<div style='display: flex' use:splitView class='SplitView'>
	<slot />
</div>
