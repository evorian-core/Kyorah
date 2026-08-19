import { useAI } from "../../../providers/AIProvider";


export default function AIModelCard() {

  const {
    aiConfig,
    updateAIConfig
  } = useAI();


  function changeModel(model) {

    updateAIConfig({
      model
    });

  }


  return (

    <div className="settings-card">


      <h2>
        🧠 Inteligência
      </h2>


      <p>
        Escolha como a Kyorah deve responder.
      </p>



      <div className="model-options">


        <button
          className={
            aiConfig.model === "kyorah"
            ? "active"
            : ""
          }

          onClick={() =>
            changeModel("kyorah")
          }
        >

          🧠 Kyorah Smart

        </button>



        <button
          className={
            aiConfig.model === "fast"
            ? "active"
            : ""
          }

          onClick={() =>
            changeModel("fast")
          }
        >

          ⚡ Kyorah Fast

        </button>



        <button
          className={
            aiConfig.model === "creative"
            ? "active"
            : ""
          }

          onClick={() =>
            changeModel("creative")
          }
        >

          🎨 Kyorah Creative

        </button>


      </div>


    </div>

  );

}
