import "./Plans.css";

import { useState } from "react";

import PaymentModal from "../../components/PaymentModal";
import { PLANS } from "../../plans/plans";
import PlanCard from "./components/PlanCard";
import { usePlan } from "../../contexts/PlanContext";

export default function Plans({ onBack }) {

    const [selectedPlan, setSelectedPlan] = useState(null);

    const { currentPlan } = usePlan();


    function buy(plan) {

        if (plan.id === "free") return;

        setSelectedPlan(plan);

    }


    return (

        <div className="plans-page">

            {/* =========================
                VOLTAR
            ========================= */}

            <button
                className="plans-back"
                onClick={onBack}
            >
                ← Voltar
            </button>


            {/* =========================
                HERO
            ========================= */}

            <div className="plans-hero">

                <div className="plans-icon">
                    👑
                </div>

                <h1>
                    Kyorah+
                </h1>

                <p>
                    Desbloqueie todo o potencial da Kyorah com
                    mais mensagens, geração de imagens e acesso
                    antecipado às novidades.
                </p>

                <div className="plans-stars">

                    ★★★★★

                    <span>
                        O plano ideal para quem usa IA todos os dias.
                    </span>

                </div>

            </div>


            {/* =========================
                PLANOS
            ========================= */}

            <div className="plans-grid">

                {Object.values(PLANS).map(plan => (

                    <PlanCard
                        key={plan.id}
                        plan={plan}
                        current={
                            currentPlan.id === plan.id
                        }
                        onSelect={buy}
                    />

                ))}

            </div>


            {/* =========================
                PAGAMENTO
            ========================= */}

            <PaymentModal
                open={selectedPlan !== null}
                plan={selectedPlan}
                onClose={() =>
                    setSelectedPlan(null)
                }
            />

        </div>

    );

}
