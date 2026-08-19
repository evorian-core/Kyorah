import "./PlanCard.css";

export default function PlanCard({

    plan,

    current,

    onSelect,

}) {

    return (

        <div
            className={`plan-card ${
                current ? "current" : ""
            }`}
        >

            <div className="plan-header">

                <h2>{plan.name}</h2>

                <span>

                    {plan.price === 0
                        ? "Grátis"
                        : `R$ ${plan.price.toFixed(2)}/30 dias`}

                </span>

            </div>

            <ul>

                {plan.features.map((feature) => (

                    <li key={feature}>

                        ✓ {feature}

                    </li>

                ))}

            </ul>

            <button
                onClick={() => onSelect(plan)}
            >

                {current
                    ? "Plano Atual"
                    : "Comprar"}

            </button>

        </div>

    );

}
