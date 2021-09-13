<script>
	export let name;
	import { Split } from 'divider-svelte'
</script>

<main>
	<h1>Hello {name}!</h1>
	<p>Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn how to build Svelte apps.</p>
	<p>Not clean</p>
	<p>Is it better?</p>
	<p>But now we know it is not our linked package</p>
	<p>Was it really casing?</p>
	<i>Are you serious?</i>
</main>

<h4>You feeling better?</h4>

<!-- <Split dividerSize={17}>
	<Pane id={1}>a</Pane>
	<Divider />
	<Pane id={2}>b</Pane>
	<Divider />
	<Pane id={3}>c</Pane>
</Split> -->

<Split dividerSize={17}>
	<div>a</div>
	<div>b</div>
</Split>



<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>