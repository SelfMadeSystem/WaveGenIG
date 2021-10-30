<script>
	import CustCSS from './CustCSS.svelte'
	
	export var bg;
	export var fg;
	export var minH;
</script>

<CustCSS style="{{bg, fg, minH}}">
	<div>
		<slot>
		</slot>
	</div>
</CustCSS>

<style>
	div {
		background: var(--bg);
		color: var(--fg);
		min-height: var(--minH);
	}
</style>