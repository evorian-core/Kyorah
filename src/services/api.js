const API_URL = import.meta.env.VITE_API_URL;

export async function sendMessageToAI(message) {
  const response = await fetch(`${API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Erro ao conversar com a Kyorah.");
  }

  return data.response;
}