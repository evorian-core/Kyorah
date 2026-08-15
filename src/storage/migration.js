import { getChats, saveChats } from "./chatStorage.js";


export async function migrateLocalStorage() {

  const oldData = localStorage.getItem(
    "kyorah_chats"
  );


  if (!oldData) {
    return;
  }


  try {

    const oldChats = JSON.parse(oldData);


    const currentChats = await getChats();


    // Só migra se o IndexedDB estiver vazio
    if (currentChats.length === 0) {

      await saveChats(oldChats);

      console.log(
        "✅ Conversas antigas migradas para IndexedDB"
      );

    }


    // Remove o armazenamento antigo
    localStorage.removeItem(
      "kyorah_chats"
    );


  } catch (error) {

    console.error(
      "Erro na migração:",
      error
    );

  }

}