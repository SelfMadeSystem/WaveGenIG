<script lang="ts">
	import { onMount, afterUpdate } from "svelte";
	import { standardizeColor } from "./lib/utils/ColorUtils";
	import Page from "./lib/Page.svelte";
	import WSep from "./lib/separators/Wave.svelte";
	import type { TransitionConfig } from "svelte/transition";
	var animated = true;
	var seperator: WSep;
	var from = "#ffffff";
	var to = "#000000";
	var height = "5rem";
	var amount = 4;
	var seperation = 0.05;
	var ratio = 5;
	var speed = 4;
	var speedVariation = 3;
	var opacity = 0.4;
	$: fg1 = standardizeColor(from).getLuminance() > 0.5 ? "black" : "white";
	$: fg2 = standardizeColor(to).getLuminance() > 0.5 ? "black" : "white";
	var divElement: HTMLDivElement;
	var divText = "";

	onMount(() => getEleString());
	afterUpdate(() => getEleString());

	function refresh() {
		seperator.refresh();
	}

	function getEleString() {
		return (divText =
			divElement && divElement.outerHTML.replace(/\s+/g, " ").trim());
	}

	function copy() {
		var ele = document.createElement("textarea");
		ele.value = getEleString();
		document.body.appendChild(ele);
		ele.select();
		document.execCommand("copy");
		document.body.removeChild(ele);
	}

	function owoTransition(node: Element, { duration }): TransitionConfig {
		return {
			duration,
			css: (t: number) => {
				return `
					max-height: ${t * 2}em;
					opacity: ${t};
					overflow: hidden;
				`;
			},
		};
	}
</script>

<Page bg={from} fg={fg1} minH="40vh">
	<p>
		<label
			>From:
			<input type="color" bind:value={from} />
		</label>
		<label
			>To:
			<input type="color" bind:value={to} />
		</label>
		<label
			>Opacity:
			<input
				type="number"
				bind:value={opacity}
				min={0}
				max={1}
				step={0.05}
			/>
		</label>
		<label
			>Animated:
			<input type="checkbox" bind:checked={animated} />
		</label>
	</p>
	<p>
		<label
			>Height:
			<input type="string" bind:value={height} />
		</label>
		<label
			>Amount:
			<input type="number" bind:value={amount} min={1} step={1} />
		</label>
		<label
			>Seperation:
			<input
				type="number"
				bind:value={seperation}
				min={0}
				max={Math.min(1, 1 / (amount - 1))}
				step={1 / 32 / (amount - 1)}
			/>
		</label>
		<label
			>Ratio:
			<input type="number" bind:value={ratio} min={0.25} step={0.25} />
		</label>
	</p>
	{#if animated}
		<p transition:owoTransition={{ duration: 200 }}>
			<label
				>Speed:
				<input type="number" bind:value={speed} min={0} step={0.05} />
			</label>
			<label
				>Speed Variation:
				<input
					type="number"
					bind:value={speedVariation}
					min={0}
					step={0.05}
				/>
			</label>
		</p>
	{/if}
	<button on:click={refresh}>Refresh</button>
</Page>

<WSep
	bind:this={seperator}
	{from}
	{to}
	{animated}
	{height}
	{amount}
	{seperation}
	{ratio}
	{speed}
	{speedVariation}
	{opacity}
	bind:divElement
/>

<Page bg={to} fg={fg2} minH="60vh">
	<p>
		<button on:click={copy}>Copy</button>
	</p>
	<p>
		<textarea bind:value={divText} />
	</p>
</Page>

<style lang="scss">
	input[type="color"] {
		background-color: var(--bg);
		width: 5rem;
	}

	input[type="number"],
	input[type="string"] {
		width: 5rem;
		background-color: #eee;
		color: black;
		border: 2px solid black;
		border-radius: 12px;
		height: 24px;
		padding-left: 4px;
		transition: all 0.2s ease-in-out;

		&:hover {
			outline: none;
			border-radius: 10px;
		}

		&:focus {
			outline: none;
			border-radius: 4px;
		}
	}

	textarea {
		width: 80ch;
		height: 40ch;
		color: black;
		resize: both;
	}

	button {
		background-color: #eee;
		color: black;
		border: 2px solid black;
		border-radius: 15px;
		padding: 2px 8px;
		transition: all 0.2s ease-in-out;
		outline: 0px solid #5550;

		&:hover {
			background-color: #ddd;
		}

		&:focus {
			outline: none;
		}

		&:focus-visible {
			outline: 4px solid #555;
		}

		&:active {
			background-color: #ccc;
		}
	}
</style>
