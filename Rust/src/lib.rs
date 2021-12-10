use wasm_bindgen::prelude::*;
use web_sys::CanvasRenderingContext2d;

#[wasm_bindgen]
pub fn render(ctx: CanvasRenderingContext2d, text: String) {
   let width = ctx.canvas().unwrap().width();
   let height = ctx.canvas().unwrap().width();

   ctx.clear_rect(0.0, 0.0, width as f64, height as f64);

   ctx.fill_text(&text, 10.0, 10.0).unwrap();
}