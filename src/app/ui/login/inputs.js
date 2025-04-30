import { useState } from "react";
import { motion } from "framer-motion";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function SignupForm() {
  const [filledFields, setFilledFields] = useState({});
  const [activeField, setActiveField] = useState(null);

  const handleChange = (e) => {
    setFilledFields({
      ...filledFields,
      [e.target.id]: e.target.value.trim() !== "",
    });
  };

  return (
    <form className='space-y-4 w-full max-w-md mx-auto'>
      {[
        { id: "signup-name", label: "Full Name", type: "text" },
        { id: "signup-email", label: "Email Address", type: "email" },
        { id: "signup-password", label: "Password", type: "password" },
        { id: "signup-confirm", label: "Confirm Password", type: "password" },
      ].map(({ id, label, type }) => (
        <div key={id} className='relative'>
          <label className='block text-gray-700 mb-2' htmlFor={id}>
            {label}
          </label>
          <div className='relative w-full'>
            {activeField === id && (
              <motion.div
                initial={{ borderWidth: 0 }}
                animate={{ borderWidth: 4 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className='absolute inset-0 rounded-lg border-blue-500 border animate-border'
              />
            )}
            <motion.input
              id={id}
              type={type}
              onChange={handleChange}
              onFocus={() => setActiveField(id)}
              onBlur={() => setActiveField(null)}
              className='relative w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white'
              placeholder={`Enter your ${label.toLowerCase()}`}
            />
            {filledFields[id] && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className='absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600'
              >
                <CheckIcon size={20} />
              </motion.div>
            )}
          </div>
        </div>
      ))}
      <button
        type='submit'
        className='w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium'
      >
        Sign Up
      </button>
    </form>
  );
}
