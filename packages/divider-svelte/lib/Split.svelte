<script>
	import { writable } from "svelte/store";
	import { handleMouseDown, buildSystem } from 'divider-html'

	export let dividerSize = 10
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

	function handleDown (position) {
		return function (event) {
			const currentSizes = $store
			handleMouseDown(position, event, currentSizes, paintScreen)
		}
	}

	let panes = []

	$: {
		panes.forEach((pane, position) => {
			const siz = $store.sizes[position]
			const roomForDividers = (dividerSize * 1) / 2
			pane.style.width = `calc(${siz}% - ${roomForDividers}px)`
		})
	}

	function splitView (node) {
		parent = node
		const amountOfChildren = node.children.length

		store.set(buildSystem(options, amountOfChildren))
		console.log($store)

		for (let i = 0; i < amountOfChildren; ++i) {
			const child = node.children[i]
			const area = $store.sizes[i]
			const roomForDividers = (dividerSize * 1) / 2
			child.style.width = `calc(${area}% - ${roomForDividers}px)`

			panes.push(child)

			if (i % 2 !== 0) {
				const t = handleDown(i)

				const divider = document.createElement("div")
				divider.style.width = `${dividerSize}px`
				divider.style.backgroundColor = 'black'
				node.insertBefore(divider, child);
				divider.addEventListener('mousedown', t)
			}
		}
	}
</script>

<div style='display: flex' use:splitView >
	<slot />
</div>
