import { openDatabase } from "./database.js";


// Salvar uma memória
export async function saveMemory(memory) {

  const db = await openDatabase();


  const transaction = db.transaction(
    "memory",
    "readwrite"
  );


  const store = transaction.objectStore(
    "memory"
  );


  store.put({
    id: memory.id || crypto.randomUUID(),
    ...memory,
    createdAt: Date.now(),
  });

}



// Buscar todas as memórias
export async function getMemory() {

  const db = await openDatabase();


  return new Promise((resolve, reject) => {

    const transaction = db.transaction(
      "memory",
      "readonly"
    );


    const store = transaction.objectStore(
      "memory"
    );


    const request = store.getAll();


    request.onsuccess = () => {
      resolve(request.result);
    };


    request.onerror = () => {
      reject(request.error);
    };

  });

}



// Apagar uma memória específica
export async function deleteMemory(id) {

  const db = await openDatabase();


  const transaction = db.transaction(
    "memory",
    "readwrite"
  );


  const store = transaction.objectStore(
    "memory"
  );


  store.delete(id);

}



// Limpar todas as memórias
export async function clearMemory() {

  const db = await openDatabase();


  const transaction = db.transaction(
    "memory",
    "readwrite"
  );


  const store = transaction.objectStore(
    "memory"
  );


  store.clear();

}