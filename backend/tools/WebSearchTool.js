import { tavily } from "@tavily/core";


const client = tavily({
  apiKey: process.env.TAVILY_API_KEY,
});



export function shouldUseWebSearch(message) {

  const lower = message.toLowerCase();


  const keywords = [
    "hoje",
    "agora",
    "atual",
    "último",
    "última",
    "notícia",
    "notícias",
    "previsão",
    "tempo",
    "clima",
    "cotação",
    "quem ganhou",
    "quanto está",
    "2026",
    "2030",
  ];


  return keywords.some((word) =>
    lower.includes(word)
  );

}



export async function searchWeb(query) {

  try {

    console.log(
      "🌐 Pesquisando na web:",
      query
    );


    const response = await client.search(
      query,
      {
        searchDepth: "advanced",
        maxResults: 5,
      }
    );


    const results = response.results
      .map((item) => {

        return `
Título: ${item.title}

Conteúdo:
${item.content}

Fonte:
${item.url}
`;

      })
      .join("\n\n");


    return results;


  } catch (error) {

    console.error(
      "Erro na pesquisa:",
      error
    );


    return "";
  }

}