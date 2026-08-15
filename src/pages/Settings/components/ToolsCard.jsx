import { useAI } from "../../../providers/AIProvider";


export default function ToolsCard() {

  const {
    aiConfig,
    updateAIConfig
  } = useAI();



  function toggleTool(tool) {

    updateAIConfig({

      [tool]: !aiConfig[tool],

    });

  }



  return (

    <div className="settings-card">


      <h2>
        🛠️ Ferramentas
      </h2>


      <p>
        Controle quais recursos a Kyorah pode utilizar.
      </p>



      <div className="tools-list">


        <div className="tool-item">

          <span>
            🌐 Pesquisa na Web
          </span>


          <input
            type="checkbox"
            checked={aiConfig.webSearch}
            onChange={() =>
              toggleTool("webSearch")
            }
          />

        </div>



        <div className="tool-item">

          <span>
            🧠 Memória
          </span>


          <input
            type="checkbox"
            checked={aiConfig.memory}
            onChange={() =>
              toggleTool("memory")
            }
          />

        </div>



        <div className="tool-item">

          <span>
            🎨 Geração de imagens
          </span>


          <input
            type="checkbox"
            checked={aiConfig.imageGeneration}
            onChange={() =>
              toggleTool("imageGeneration")
            }
          />

        </div>


      </div>


    </div>

  );

}