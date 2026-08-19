import { FiCheckCircle } from "react-icons/fi";

export default function PlanCard({

    plan,

    current,

    onSelect,

}) {

    return (

        <div
    className={`plan-card ${
        current ? "current" : ""
    } ${plan.id}`}

            
        >

            {plan.id==="pro" && (

<div className="popular-badge">

👑 MAIS POPULAR

</div>

)}

            <div className="plan-header">

                <h2>{plan.name}</h2>

                {plan.price === 0 ? (

    <div className="price-free">

        Grátis

    </div>

) : (

    <div className="price-box">

        <span className="currency">
            R$
        </span>

        <h1>
            {plan.price.toFixed(2)}
        </h1>

        <small>
            /25 dias
        </small>

    </div>

)}

            </div>

            <ul>

                {plan.features.map(feature => (

                    <li key={feature}>

    <FiCheckCircle />

    <span>{feature}</span>

</li>

                ))}

            </ul>

            <button
                onClick={() => onSelect(plan)}
            >

                {current
                    ? "Plano Atual"
                    : "Assinar Agora"}

            </button>

        </div>

    );

}
