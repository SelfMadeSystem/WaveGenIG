<script lang="ts">
  import { generateUUID } from "../utils/UUIDUtils";
  const uuid = generateUUID();
  export var from: string;
  export var to: string;
  export var animated: boolean = true;
  export var height: string;
  export var amount = 4;
  export var seperation = 0.1;
  export var ratio = 5;
  export var speed = 4;
  export var speedVariation = 3;
  export var opacity = 0.5;
  export var divElement: HTMLDivElement;
  var h = 1;
  $: w = h * ratio * 2;
  var paths: { start: string; end: string }[] = [];
  $: {
    amount;
    seperation;
    ratio;
    refresh();
  }
  export const getPaths = () => paths;
  export const refresh = () => {
    paths = [];
    const halfW = w / 2;
    const wOver4 = w / 4;
    const waveHeight = h - seperation * (amount - 1);
    for (let i = 0; i < amount; i++) {
      const st = h - (amount - i - 1) * seperation;
      const waveHoriStart = -w * Math.random();
      const e = `${`
      c ${wOver4},0 ${wOver4},${-waveHeight} ${halfW},${-waveHeight}
      c ${wOver4},0 ${wOver4}, ${waveHeight} ${halfW}, ${waveHeight}
      `.repeat(3)}
      L ${w * 2},${h}
      L 0,${h}
      z`;
      paths.push({
        start: `
      M${waveHoriStart},${st}
      ${e}`.replaceAll("\n", ""),
        end: `
      M${waveHoriStart - w},${st}
      ${e}`.replaceAll("\n", ""),
      });
    }
  };
</script>

<div
  style="height: {height}; width: 100%; display: block; overflow: hidden"
  bind:this={divElement}
>
  <svg
    viewBox="0 0 1 1"
    xmlns="http://www.w3.org/2000/svg"
    overflow="visible"
    height="100%"
  >
    <pattern
      id={uuid}
      viewBox="0 0 {w} {h}"
      width={w}
      height={h}
      patternUnits="userSpaceOnUse"
    >
      <rect x="0" y="0" width={w} height={h} fill={from} />
      {#each paths as p, i}
        <path style="opacity: {i == amount - 1 ? 1 : opacity};" fill={to} d={p.start}>
          {#if animated}
            <animate
              attributeName="d"
              values="{p.start};{p.end}"
              dur="{(speed +
                Math.random() * speedVariation -
                speedVariation / 2) *
                ratio}s"
              keyTimes="0;1"
              repeatCount="indefinite"
            />
          {/if}
        </path>
      {/each}
    </pattern>
    <rect fill="url(#{uuid})" x="0" y="0" width="400" height={h} />
  </svg>
</div>
