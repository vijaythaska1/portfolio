"use client";

import { isValidEmail } from '@/utils/check-email';
import emailjs from '@emailjs/browser';
import { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { TbMailForward } from "react-icons/tb";
import { toast } from 'react-toastify';

function ContactWithCaptcha() {
  const [input, setInput] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [captcha, setCaptcha] = useState(null);
  const [error, setError] = useState({
    email: false,
    required: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkRequired = () => {
    if (input.email && input.message && input.name) {
      setError(prev => ({ ...prev, required: false }));
    }
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    // if (!captcha) {
    //   toast.error('Please complete the captcha!');
    //   return;
    // }
    if (!input.email || !input.message || !input.name) {
      setError(prev => ({ ...prev, required: true }));
      toast.error('All fields are required!');
      return;
    }
    if (error.email) {
      toast.error('Please provide a valid email!');
      return;
    }
    setIsSubmitting(true);
    const emailData = {
      to_name: "Admin",
      from_name: input.name,
      from_email: input.email,
      message: input.message,
    };
    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
    const options = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
    try {
      await emailjs.send(
        serviceID,
        templateID,
        emailData,
        options
      );
      toast.success('Message sent successfully!');
      setInput({
        name: '',
        email: '',
        message: '',
      });
      setCaptcha(null);

    } catch (error) {
      console.error('Send error:', error);
      toast.error(error?.text || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <p className="font-medium mb-5 text-[#16f2b3] text-xl uppercase">
        Contact with me
      </p>
      <div className="max-w-3xl text-white rounded-lg border border-[#464c6a] p-3 lg:p-5">
        <p className="text-sm text-[#d3d8e8]">
          {"If you have any questions or concerns, please don't hesitate to contact me. I am open to any work opportunities that align with my skills and interests."}
        </p>
        <form onSubmit={handleSendMail} className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-base">Your Name: </label>
            <input
              id="name"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="text"
              maxLength="100"
              required
              onChange={(e) => setInput(prev => ({ ...prev, name: e.target.value }))}
              onBlur={checkRequired}
              value={input.name}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-base">Your Email: </label>
            <input
              id="email"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              type="email"
              maxLength="100"
              required
              value={input.email}
              onChange={(e) => setInput(prev => ({ ...prev, email: e.target.value }))}
              onBlur={() => {
                checkRequired();
                setError(prev => ({ ...prev, email: !isValidEmail(input.email) }));
              }}
              disabled={isSubmitting}
            />
            {error.email && (
              <p className="text-sm text-red-400">Please provide a valid email!</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="text-base">Your Message: </label>
            <textarea
              id="message"
              className="bg-[#10172d] w-full border rounded-md border-[#353a52] focus:border-[#16f2b3] ring-0 outline-0 transition-all duration-300 px-3 py-2"
              maxLength="500"
              name="message"
              required
              onChange={(e) => setInput(prev => ({ ...prev, message: e.target.value }))}
              onBlur={checkRequired}
              rows="4"
              value={input.message}
              disabled={isSubmitting}
            />
          </div>

          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={setCaptcha}
          />

          <div className="flex flex-col items-center gap-2">
            {error.required && (
              <p className="text-sm text-red-400">
                All fields are required!
              </p>
            )}
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-1 hover:gap-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-600 px-5 md:px-12 py-2.5 md:py-3 text-center text-xs md:text-sm font-medium uppercase tracking-wider text-white no-underline transition-all duration-200 ease-out hover:text-white hover:no-underline md:font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <TbMailForward className="mt-1" size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactWithCaptcha;