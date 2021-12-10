import wasm from "../../rust-renderer/Cargo.toml";

let offscreen = null;

async function initialize() {
  const module = await wasm();
  const { render } = module;

  self.onmessage = (event) => {
    const { message } = event.data;
    switch (message) {
      case "transferCanvas": {
        const { canvas } = event.data;
        if (canvas && !offscreen) {
          offscreen = canvas;
        }
        break;
      }
      case "render": {
        const { text } = event.data;
        let ctx = offscreen.getContext("2d");
        render(ctx, text);
        break;
      }
    }
  };

  // Let the web app know that we loaded
  self.postMessage("loaded");
}

initialize();
