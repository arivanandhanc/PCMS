"use client";
import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e: any) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setDone(true);
    }

    setLoading(false);
  };

  /* ✅ Beautiful success state */
  if (done) {
    return (
      <div className="cs-success-card">
        <div className="cs-success-icon">✓</div>
        <h3>Message Sent Successfully</h3>
        <p>Thanks for reaching out. We’ll get back to you soon.</p>
      </div>
    );
  }

  return (
    <section className="cs-contact">
      <h2>Contact Us</h2>
      <p>Have questions? Send us a message.</p>

      <form onSubmit={handleSubmit} className="cs-contact-form">
        <input
          name="name"
          placeholder="Your name"
          required
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          required
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your message"
          rows={5}
          required
          onChange={handleChange}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </section>
  );
}
