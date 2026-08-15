export const PLANS = {

  free: {
    id: "free",
    name: "Free",

    messagesPerDay: 20,
    imagesPerDay: 6,

    color: "#8A99AD",

    price: 0,

    features: [
      "20 mensagens por dia",
      "6 imagens por dia",
      "Pesquisa na Web",
      "Memória",
      "Geração de imagens"
    ]
  },

  basic: {
    id: "basic",
    name: "Basic",

    messagesPerDay: 35,
    imagesPerDay: 12,

    color: "#2D5BFF",

    price: 14.90,

    features: [
      "35 mensagens por dia",
      "12 imagens por dia",
      "Tudo do Free"
    ]
  },

  pro: {
    id: "pro",
    name: "Pro",

    messagesPerDay: 100,
    imagesPerDay: 50,

    color: "#F59E0B",

    price: 29.90,

    features: [
      "100 mensagens por dia",
      "50 imagens por dia",
      "Tudo do Basic",
      "Acesso antecipado às novidades",
      "Prioridade futura"
    ]
  }

};