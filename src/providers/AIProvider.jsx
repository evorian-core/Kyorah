import { createContext, useContext, useState, useEffect } from "react";

const AIContext = createContext();


export function AIProvider({ children }) {


  const [aiConfig, setAiConfig] = useState(() => {

    const saved = localStorage.getItem(
      "kyorah_ai_config"
    );


    if (saved) {
      return JSON.parse(saved);
    }


    return {

      // Modelo atual
      model: "kyorah",

      // Recursos disponíveis
      webSearch: true,
      memory: true,
      imageGeneration: true,

      // Estilo de resposta
      creativity: 0.7,

      appearance: {

  theme: "dark",

  accent:"blue",

  halo: true,

  blur: true,

  streaming: true,

},

    };

  });



  useEffect(() => {

    localStorage.setItem(
      "kyorah_ai_config",
      JSON.stringify(aiConfig)
    );

  }, [aiConfig]);

 useEffect(() => {

  if (!aiConfig.appearance) return;

  document.documentElement.setAttribute(
    "data-theme",
    aiConfig.appearance.theme
  );

  document.documentElement.setAttribute(
    "data-accent",
    aiConfig.appearance.accent
  );

}, [aiConfig.appearance]);



  function updateAIConfig(config) {

    setAiConfig((prev) => ({

      ...prev,

      ...config,

    }));

  }



  return (

    <AIContext.Provider

      value={{

        aiConfig,

        updateAIConfig,

      }}

    >

      {children}

    </AIContext.Provider>

  );

}



export function useAI() {

  return useContext(AIContext);

}
