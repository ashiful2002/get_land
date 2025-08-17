import { useState } from "react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What are the purpose of this website?",
      answer:
        "This is a fully dynamic MERN Stack web application for buy sell and manage realestate properties.",
    },
    {
      question: "Is this website have a dashboard?",
      answer:
        "Yes! there are three user role base dashboaed in here. 1.User  2.Agent  3.Admin",
    },
    {
      question: "what a normal user can?",
      answer:
        "A normal user can explore the website, view and choose property. ___ 2. If a user want to buy a property can make property to his/her wishlist. ___ 3. frmo there he/she can make a offer to the agent who posted the specific property. ___4. Then the agent accept users offered price then he is able to pay using stripe. ___ 5.  After payment user can see his/her properties in 'bought property' from dashboard. ___6. Also suer can update his user profile. ",
    },
    {
      question: "What a Agent do?",
      answer:
        "__1. A agent can post a new property. __2. Update property. ___3. Delete his posted properties. ___4. see his all added properties in dashboard. ___ 5. view sold properties ___6. download pdf of his sold properties details. ___7. can see requested properties has made by users ",
    },
    {
      question: "Whats the  role fo a admin?",
      answer:
        "haha, an admin can manage all of the users. ",
    },
    {
      question: "How do I create an account?",
      answer:
        "Click the 'Sign Up' button on the top right corner, fill in your details, and verify your email to create an account.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-auto px-4 py-12">
      <h2 className="heading">Frequently Asked Questions</h2>
      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200/30 dark:border-gray-700 rounded-lg shadow-sm dark:bg-gray-800"
          >
            <button
              className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-800 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="text-xl border p-2 rounded-full text-gray-800 dark:text-gray-100 border-gray-300 dark:border-gray-600">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Animated Answer */}
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openIndex === index
                  ? "max-h-40 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="p-4 text-gray-600 dark:text-gray-200 border-t border-gray-200 dark:border-gray-700">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}

        <h2 className="capitalize mt-5 text-gray-800 dark:text-gray-100">
          if you have more queries
          <button className="ml-5 btn btn-xs btn-primary text-center uppercase">
            <a href="#contact">Contact Us</a>
          </button>
        </h2>
      </div>
    </section>
  );
};

export default FAQ;
