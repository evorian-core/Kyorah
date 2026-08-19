import OpenAI from "openai";

console.log("Groq carregada?", !!process.env.GROQ_API_KEY);

const groq = new OpenAI({
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY,
});

const KYORAH_SYSTEM_PROMPT = `
Você é a Kyorah, uma Inteligência Artificial desenvolvida pela EVORIAN, pertencente à divisão OMNIA.

Sua identidade é própria e você deve sempre se apresentar como Kyorah quando perguntarem quem você é.

Não descreva uma lista de capacidades ou diga "eu posso fazer..." a menos que o usuário pergunte especificamente.

Responda de forma natural, inteligente, amigável e profissional.

Seu objetivo é ajudar o usuário com respostas claras, corretas e úteis, explicando conceitos de maneira simples quando necessário.

Organize suas respostas usando Markdown, utilizando títulos, listas e negrito apenas quando melhorarem a leitura.

Evite respostas genéricas, textos excessivamente longos e frases típicas de assistentes virtuais.

Antes de responder, analise a pergunta e entregue a melhor resposta possível para o contexto.

Caso alguém pergunte qual é o seu modelo, responda que você é do modelo Kyorah 2.4 Omnia.

Se alguém perguntar sobre a EVORIAN, explique que a EVORIAN é uma empresa de tecnologia, inovação e criatividade focada no desenvolvimento de Inteligência Artificial, aplicativos e plataformas digitais que unem software, novas tecnologias e propósito para criar soluções inteligentes, simplificar tarefas, ampliar possibilidades e construir experiências que conectam pessoas e tecnologia.

E se alguém perguntar quem criou/fundou a EVORIAN, ou quem é o CEO da EVORIAN, diga que foi Williandro Moisés Schmidt.
`;


// RESPOSTA NORMAL
export async function generateResponse(conversation) {
  try {
    console.log("Mensagem recebida:", conversation);
    console.log("API carregada:", !!process.env.GROQ_API_KEY);

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",

      messages: [
  {
    role: "system",
    content: KYORAH_SYSTEM_PROMPT,
  },

  ...(identityMessage
    ? [
        {
          role: "system",
          content: identityMessage,
        },
      ]
    : []),

  ...conversation,
],
    });


    
    console.log("Resposta da Groq:", response);

    return response.choices[0].message.content;

  } catch (error) {
    console.error("Erro ao chamar a API da Groq:", error);
    throw error;
  }
}


// STREAMING
export async function generateResponseStream(conversation, betaUser) {
  try {

    const identityMessage = betaUser
      ? `
IDENTIDADE DO USUÁRIO:
Nome: ${betaUser.name}
Identificação Beta: ${betaUser.betaId}

Use o nome do usuário naturalmente quando fizer sentido.
Não mencione a identificação Beta-00X a menos que o usuário pergunte sobre ela.
Não diga que recebeu essas informações de um sistema ou de um contexto interno.
`
      : "";

    const stream = await groq.chat.completions.create({
      model: "openai/gpt-oss-20b",

      messages: [
        {
          role: "system",
          content: KYORAH_SYSTEM_PROMPT,
        },

        ...(identityMessage
          ? [
              {
                role: "system",
                content: identityMessage,
              },
            ]
          : []),

        ...conversation,
      ],

      stream: true,
    });

    return stream;

  } catch (error) {
    console.error("Erro no streaming da Groq:", error);
    throw error;
  }
}