export function shouldUseDate(message) {

    const text = message.toLowerCase();

    const keywords = [
        "que dia é hoje",
        "qual a data",
        "data de hoje",
        "que horas são",
        "hora atual",
        "horas",
        "que mês estamos",
        "qual o mês",
        "que ano estamos",
        "qual o ano",
        "dia de hoje"
    ];

    return keywords.some(keyword => text.includes(keyword));

}

export function getCurrentDate(message) {

    const text = message.toLowerCase();

    const now = new Date();

    if (
        text.includes("hora")
    ) {

        return `Agora são ${now.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit"
        })}.`;

    }

    if (
        text.includes("mês")
    ) {

        return `Estamos em ${now.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric"
        })}.`;

    }

    if (
        text.includes("ano")
    ) {

        return `Estamos em ${now.getFullYear()}.`;

    }

    return `Hoje é ${now.toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    })}.`;

}