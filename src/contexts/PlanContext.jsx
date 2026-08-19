import { createContext, useContext, useEffect, useState } from "react";
import { PLANS } from "../plans/plans";

const PlanContext = createContext();

export function PlanProvider({ children }) {

  const [planData, setPlanData] = useState(() => {

    const saved = localStorage.getItem("kyorah_plan");

    if (saved) {
      return JSON.parse(saved);
    }

    return {
      plan: "free",

      expiresAt: null,

      usage: {
        messages: 0,
        images: 0,
      },

      lastReset: new Date().toDateString(),
    };

  });

  // Salva no navegador
  useEffect(() => {

    localStorage.setItem(
      "kyorah_plan",
      JSON.stringify(planData)
    );

  }, [planData]);

  // Reset diário
  useEffect(() => {

    const today = new Date().toDateString();

    if (planData.lastReset !== today) {

      setPlanData(prev => ({
        ...prev,

        usage: {
          messages: 0,
          images: 0,
        },

        lastReset: today,

      }));

    }

  }, []);

  function setPlan(plan) {

    const expires = new Date();

    expires.setDate(expires.getDate() + 30);

    setPlanData(prev => ({
      ...prev,

      plan,

      expiresAt: expires.toISOString(),

    }));

  }

  function addMessageUsage() {

    setPlanData(prev => ({

      ...prev,

      usage: {

        ...prev.usage,

        messages: prev.usage.messages + 1,

      }

    }));

  }

  function addImageUsage() {

    setPlanData(prev => ({

      ...prev,

      usage: {

        ...prev.usage,

        images: prev.usage.images + 1,

      }

    }));

  }

  const currentPlan = PLANS[planData.plan];

  function canSendMessage() {

    return (
      planData.usage.messages <
      currentPlan.messagesPerDay
    );

  }

  function canGenerateImage() {

    return (
      planData.usage.images <
      currentPlan.imagesPerDay
    );

  }

  return (

    <PlanContext.Provider
      value={{

        planData,

        currentPlan,

        setPlan,

        addMessageUsage,

        addImageUsage,

        canSendMessage,

        canGenerateImage,

      }}
    >

      {children}

    </PlanContext.Provider>

  );

}

export function usePlan() {

  return useContext(PlanContext);

}
