
<script>
    import { getContext, onMount } from 'svelte';
import { SPLIT } from './Split.svelte'

const { registerPane, sizes } = getContext(SPLIT)

    export let id = 1890

const pane = {
    type: 'pane',
    size: 0,
    id
}
registerPane(pane)

let size = 0

$: {
    const detail = $sizes.find(el => el === pane)
    size = detail.size
}



</script>
<div style="color: green; width: calc({size}% - {40/3}px)">
<slot />
</div>