import { openDatabase } from "./database";


export async function saveChats(chats) {

  const db = await openDatabase();


  const transaction = db.transaction(
    "chats",
    "readwrite"
  );


  const store = transaction.objectStore(
    "chats"
  );


  for (const chat of chats) {
    store.put(chat);
  }

}



export async function getChats() {

  const db = await openDatabase();


  return new Promise((resolve, reject) => {

    const transaction = db.transaction(
      "chats",
      "readonly"
    );


    const store = transaction.objectStore(
      "chats"
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