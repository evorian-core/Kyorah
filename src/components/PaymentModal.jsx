import "./PaymentModal.css";

export default function PaymentModal({

    open,
    onClose,
    plan,

}) {

    if (!open || !plan) return null;

    function handlePayment() {

        const message = `Olá!

Tenho interesse no plano ${plan.name} da Kyorah.

Plano:
${plan.name}

Valor:
R$ ${plan.price.toFixed(2)}

Gostaria de receber as informações para pagamento.`;

        window.open(

            `https://wa.me/55SEUNUMERO?text=${encodeURIComponent(message)}`,

            "_blank"

        );

    }

    return (

        <div className="payment-overlay">

            <div className="payment-modal">

                <button
                    className="close-payment"
                    onClick={onClose}
                >
                    ✕
                </button>

                <div className="payment-top">

                    <h1>

                        {plan.name === "Pro"
                            ? "👑 Kyorah PRO"
                            : "⭐ Kyorah BASIC"}

                    </h1>

                    <h2>

                        R$ {plan.price.toFixed(2)}

                    </h2>

                    <span>

                        a cada 30 dias

                    </span>

                </div>

                <div className="payment-features">

                    {plan.features.map(feature => (

                        <div
                            key={feature}
                            className="payment-feature"
                        >

                            ✓ {feature}

                        </div>

                    ))}

                </div>

                <button
                    className="pay-button"
                    onClick={handlePayment}
                >

                    Pagar Agora

                </button>

                <button
                    className="cancel-button"
                    onClick={onClose}
                >

                    Cancelar

                </button>

                <p className="payment-info">

                    Pagamento seguro.

                    Sua assinatura será ativada após a confirmação.

                </p>

            </div>

        </div>

    );

}
