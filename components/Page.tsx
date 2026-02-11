"use client";
import Image from "next/image";
import "@/compstyles/page.css";
import type { IPage as PageEntry } from "@/contentstack/generated";
import { ITcaresol } from "@/contentstack/generated";
import ContactForm from "@/components/ContactForm";
import ImageDescriptionBlock from "@/components/ImageDescriptionBlock";


import TcaresolComponent from "@/components/tcaresol";

type PageProps = {
  page: (Pick<
    PageEntry,
    | "title"
    | "description"
    | "hero_image"
    | "hero_video"
    | "body_text"
    | "body_text2"
    | "caresol"
  > & {
    caresol?: ITcaresol[]; 
  }) | null;
};




export default function Page({ page }: PageProps) {
  if (!page) return <div className="cs-empty">No page data found</div>;


  const blocks = (page as any)?.modular_blocks || [];

const imageBlock = blocks.find(
  (b: any) => b.image_description_block
)?.image_description_block;

  return (
    <main className="one">
      {/* ---------------- HERO SECTION ---------------- */}
      {(page.hero_video?.url || page.hero_image?.url) && (
        <section className="cs-hero">
          {page.hero_video?.url ? (
            <video className="cs-hero__media" autoPlay muted loop playsInline>
              <source src={page.hero_video.url} />
            </video>
          ) : (
            page.hero_image?.url && (
              <Image
                src={page.hero_image.url}
                alt={page.title}
                fill
                priority
                className="cs-hero__media"
              />
            )
          )}

          <div className="cs-hero__overlay">
            <h1>{page.title}</h1>
            {page.description && <p>{page.description}</p>}
          </div>
        </section>
      )}

      {/* ---------------- BODY TEXT BLOCKS ---------------- */}
      {page.body_text && (
        <section className="cs-page__content">
          <div className="cs-richtext">{page.body_text}</div>
        </section>
      )}

      {/* ---------------- TEXT CAROUSEL SECTION ---------------- */}
{Array.isArray(page.caresol) && page.caresol.length > 0 && (
  [...page.caresol]
    .sort((a: any, b: any) => {
      const getPos = (entry: any) => {
        const firstBlock = entry?.texts?.[0] || "";
        const match = typeof firstBlock === "string"
          ? firstBlock.match(/pos-(\d+)/)
          : firstBlock?.attrs?.class?.match(/pos-(\d+)/);

        return match ? Number(match[1]) : 999;
      };
      return getPos(a) - getPos(b);
    })
    .map((item, i) => (
      <section key={i} className="cs-carousel-section">
        <TcaresolComponent {...item} />
      </section>
    ))
)}

{imageBlock && (
  <ImageDescriptionBlock block={imageBlock} />
)}


      {/* ---------------- IMAGE BLOCK ---------------- */}
      {page.hero_image?.url && (
        <section className="cs-secondary-media">
          <Image
            src={page.hero_image.url}
            alt={page.hero_image.title || page.title}
            width={1200}
            height={700}
          />
        </section>
      )}
{/* ---------------- CONTACT FORM ---------------- */}
<section className="cs-form-section">
  <ContactForm />
</section>

      {/* ---------------- BOTTOM BODY TEXT ---------------- */}
      {page.body_text2 && (
        <section className="cs-page__content">
          <div className="cs-richtext">{page.body_text2}</div>
        </section>
        
        
      )}
    </main>
  );
}
