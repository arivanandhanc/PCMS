"use client";

import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import "@/compstyles/page.css";
import "@/compstyles/ecom.css";

export default function SectionPrimary({ section }: any) {
  const bg = section.background?.url;
  const btn = section.button;

  const isOverlay =
    section.style === "background-buttoon,text on top";

  return (
    <>
      <section
        className={`ecom-section ${
          isOverlay ? "layout-overlay" : "layout-split"
        }`}
        style={
          isOverlay && bg
            ? { backgroundImage: `url(${bg})` }
            : {}
        }
      >
        <div className="ecom-inner">
          {/* LEFT IMAGE (only for split layout) */}
          {!isOverlay && bg && (
            <div className="ecom-image">
              <img src={bg} alt="" />
            </div>
          )}

          {/* CONTENT */}
          <div className="ecom-content">
            {section.description && (
              <p className="ecom-description">
                {section.description}
              </p>
            )}

            {btn?.label && btn?.url && (
              <Link
                href={btn.url}
                target={btn.open_in_new_tab ? "_blank" : "_self"}
                className={`ecom-btn ${btn.style}`}
              >
                {btn.label}
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* FORM BLOCK */}
      {section.form_needed_ && (
        <section className="cs-form-section">
          <div className="cs-page__content">
            <ContactForm />
          </div>
        </section>
      )}
    </>
  );
}
