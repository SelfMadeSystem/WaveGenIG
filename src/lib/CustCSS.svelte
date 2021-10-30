<script>
	export var style;
	$: cssVarStyles = Object.entries(style)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');
</script>

<span style={cssVarStyles}>
	<slot/>
</span>