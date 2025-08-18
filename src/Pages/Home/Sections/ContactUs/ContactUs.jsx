import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { FaSpinner } from "react-icons/fa";

const ContactUs = () => {
  const form = useRef();
  const [btnDisabled, setBtnDisabled] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    setBtnDisabled(true);
    emailjs
      .sendForm("service_d4iaj4s", "template_rup5e5m", form.current, {
        publicKey: "nGiYi51Xc7LsGmqCI",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          setBtnDisabled(false);
          toast.success(`email send successfully`);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div id="contact" className="mx-auto px-4 py-10">
      <form
        className="max-w-lg mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-8 flex flex-col gap-6"
        ref={form}
        onSubmit={sendEmail}
      >
        <h2 className="heading ">Contact Us</h2>
        <h2 className=" mt-5 text-gray-800 dark:text-gray-100">
          If you have more queries drop a message, we will find you.
        </h2>
        {/* Name */}
        <div className="flex flex-col gap-1 md:w-md">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Name
          </label>
          <input
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
                   focus:ring-2 focus:ring-primary focus:outline-none 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            type="text"
            name="user_name"
            placeholder="Your full name"
            required
          />
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Email
          </label>
          <input
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 
                   focus:ring-2 focus:ring-primary focus:outline-none 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            type="email"
            name="user_email"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Message */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-600 dark:text-gray-300">
            Message
          </label>
          <textarea
            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 h-32 resize-none
                   focus:ring-2 focus:ring-primary focus:outline-none 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
            name="message"
            placeholder="Write your message..."
            required
          />
        </div>

        {/* Submit */}
        <button
          disabled={btnDisabled}
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-blue-500 text-white font-medium py-2 px-4 rounded-lg 
             hover:bg-blue-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {btnDisabled ? (
            <>
              <FaSpinner className="animate-spin" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </div>
  );
};
export default ContactUs;
