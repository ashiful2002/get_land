import React from "react";
import { ShieldCheck, Zap, Headphones, Home } from "lucide-react";
import Section from "../../../../Components/Section/Section";

const benefits = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "Verified Properties",
    description:
      "All listings are checked and verified for safety and legality.",
  },
  {
    icon: <Zap className="w-8 h-8 text-primary" />,
    title: "Instant Booking",
    description: "Book your desired property quickly and easily online.",
  },
  {
    icon: <Headphones className="w-8 h-8 text-primary" />,
    title: "24/7 Support",
    description: "We're always here to help you with your property needs.",
  },
  {
    icon: <Home className="w-8 h-8 text-primary" />,
    title: "Easy Management",
    description: "Track, favorite, and manage properties in your dashboard.",
  },
];

const WhyChooseUs = () => {
  return (
    <Section title="Why Choose Us?">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="bg-base-100 dark:bg-base-300 p-6 rounded-lg shadow-md text-center hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-4">{benefit.icon}</div>
            <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-200">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default WhyChooseUs;
