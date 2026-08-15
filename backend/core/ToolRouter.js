
export function decideTool(message) {

    const lower =
        message
            .toLowerCase()
            .trim();

    if (
        lower.includes("gere uma imagem") ||
        lower.includes("gere a imagem") ||
        lower.includes("crie uma imagem") ||
        lower.includes("crie a imagem") ||
        lower.includes("faça uma imagem") ||
        lower.includes("faça a imagem") ||
        lower.includes("gerar uma imagem") ||
        lower.includes("gerar a imagem") ||
        lower.includes("desenhe") ||
        lower.includes("desenhar")
    ) {

        return "image";

    }

    if (
        lower.includes("tempo") ||
        lower.includes("clima") ||
        lower.includes("previsão")
    ) {

        return "weather";

    }

    return null;

}

console.log(
    "🔥 TOOL ROUTER CARREGADO"
);

console.log(
    "🔥 decideTool:",
    typeof decideTool
);