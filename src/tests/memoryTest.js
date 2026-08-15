import { detectMemory } from "../services/memoryDetector.js";
import { saveMemory, getMemory } from "../storage/memoryStorage.js";


export async function testMemory() {

  const message = "Meu nome é Williandro";


  const memory = detectMemory(message);


  console.log("🧠 Memória detectada:");
  console.log(memory);


  if (memory) {

    await saveMemory(memory);

    console.log(
      "✅ Memória salva no dispositivo"
    );

  }


  const memories = await getMemory();


  console.log(
    "📚 Memórias atuais:"
  );

  console.log(memories);

}