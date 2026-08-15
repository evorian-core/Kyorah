import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(
  process.env.HF_TOKEN
);

export async function generateImage(prompt) {

  const image = await client.textToImage({
    provider: "nscale",
    model: "black-forest-labs/FLUX.1-schnell",
    inputs: prompt,
    parameters: {
      num_inference_steps: 5,
    },
  });

  const buffer = Buffer.from(
    await image.arrayBuffer()
  );

  return `data:image/png;base64,${buffer.toString("base64")}`;
}