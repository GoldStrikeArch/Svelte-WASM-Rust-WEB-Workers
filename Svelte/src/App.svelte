<script>
  let worker;
  let canvasTransferred = false;
  let text = `Oh boy do I love multithreading!`;
  import { onMount } from "svelte";

  onMount(async () => {
    worker = new Worker("build/worker.js");
    await loaded(worker);
    canvasTransferred = true;
    transferCanvas();
  });

  $: if (canvasTransferred) {
    render(text);
  }

  export const loaded = (worker) =>
    new Promise((resolve) =>
      worker.addEventListener("message", resolve, { once: true })
    );

  export const transferCanvas = () => {
    let htmlCanvas = document.getElementById("my-canvas");
    let offscreen = htmlCanvas.transferControlToOffscreen();
    worker.postMessage({ message: "transferCanvas", canvas: offscreen }, [
      offscreen,
    ]);
  };

  export const render = (text) => {
    worker.postMessage({ message: "render", text }, []);
  };
</script>

<main>
  <div style="display: flex;">
    <textarea style="width: 400px;" bind:value={text} />
    <canvas id="my-canvas" width="400" height="400" />
  </div>
</main>
