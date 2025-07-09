import React from "react";
import { Building2, Smile, MapPin, Trophy } from "lucide-react";
import Section from "../../../../Components/Section/Section";

const stats = [
  {
    icon: <Building2 className="w-8 h-8 text-primary" />,
    number: "1,200+",
    label: "Properties Listed",
  },
  {
    icon: <Smile className="w-8 h-8 text-primary" />,
    number: "3,000+",
    label: "Happy Clients",
  },
  {
    icon: <MapPin className="w-8 h-8 text-primary" />,
    number: "85+",
    label: "Locations Covered",
  },
  {
    icon: <Trophy className="w-8 h-8 text-primary" />,
    number: "10+",
    label: "Years of Experience",
  },
];

const Achievements = () => {
  return (
    <Section title="Our Achievements">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-base-100 dark:bg-base-300 p-6 rounded-lg shadow-md hover:shadow-lg transition"
          >
            <div className="flex justify-center mb-2">{stat.icon}</div>
            <h3 className="text-2xl font-bold">{stat.number}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Achievements;
