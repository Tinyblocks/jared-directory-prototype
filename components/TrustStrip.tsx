"use client";

import { useLanguage } from "./useLanguage";

export function TrustStrip() {
  const { isEnglish } = useLanguage();
  const items = isEnglish
    ? [
        { stat: "500+", label: "Verified advisors" },
        { stat: "100%", label: "Free to connect" },
        { stat: "2 min", label: "To get in touch" },
      ]
    : [
    {
      stat: "500+",
      label: "Conseillers vérifiés",
    },
    {
      stat: "100%",
      label: "Mise en contact gratuite",
    },
    {
      stat: "2 min",
      label: "Pour prendre contact",
    },
  ];

  return (
    <section className="border-y border-gray-200 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-3 md:divide-x md:divide-y-0">
          {items.map(({ stat, label }) => (
            <div key={label} className="px-6 py-5 text-center">
              <p className="text-4xl font-bold text-gray-900">{stat}</p>
              <p className="mt-2 text-sm text-gray-500">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
