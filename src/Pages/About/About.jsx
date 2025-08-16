import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">
        About This Platform
      </h1>
      <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
        Our Real Estate Platform is designed to make buying, selling, and
        managing properties easier for everyone — whether you’re a{" "}
        <strong>home buyer</strong>, <strong>property agent</strong>, or{" "}
        <strong>administrator</strong>.
      </p>

      <h2 className="text-2xl font-semibold mb-3">
        Here’s what you can do here:
      </h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
        <li>
          <strong>Browse & Search Properties</strong> – Find homes that match
          your needs using filters and categories.
        </li>
        <li>
          <strong>Make Secure Offers</strong> – Submit offers directly through
          the site with safe, Stripe-powered payments.
        </li>
        <li>
          <strong>Leave Reviews</strong> – Share your experiences and read what
          others have to say.
        </li>
        <li>
          <strong>Role-Based Access</strong> – Users, Agents, and Admins each
          get their own dashboards and tools.
        </li>
        <li>
          <strong>Powerful Admin Tools</strong> – Manage users, properties,
          offers, and even flag fraudulent activity.
        </li>
        <li>
          <strong>Data & Analytics</strong> – Get real-time insights on property
          trends and activity.
        </li>
      </ul>

      <p className="mt-6 text-lg text-gray-700 dark:text-gray-300">
        We built this platform using the <strong>MERN stack</strong> (MongoDB,
        Express.js, React, Node.js) with{" "}
        <strong>Firebase Authentication</strong>, so it’s{" "}
        <strong>secure</strong>, <strong>fast</strong>, and{" "}
        <strong>user-friendly</strong>.
      </p>
    </div>
  );
};

export default About;
