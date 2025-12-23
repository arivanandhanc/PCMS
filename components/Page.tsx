import Image from "next/image";
import "@/compstyles/page.css";
import type { Page as PageEntry } from "@/contentstack/generated";

type PageProps = {
  page: Pick<
    PageEntry,
    | "title"
    | "description"
    | "hero_image"
    | "hero_video"
    | "body_text"
    | "body_text2"
  > | null;
};

export default function Page({ page }: PageProps) {
  if (!page) {
    return <div className="cs-empty">No page data found</div>;
  }

  return (
    <main className="one">
      {(page.hero_video?.url || page.hero_image?.url) && (
        <section className="cs-hero">
          {page.hero_video?.url ? (
            <video
              className="cs-hero__media"
              autoPlay
              muted
              loop
              playsInline
            >
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

      {page.body_text && (
        <section className="cs-page__content">
          <div className="cs-richtext">{page.body_text}</div>
        </section>
      )}

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

      {page.body_text2 && (
        <section className="cs-page__content">
          <div className="cs-richtext">{page.body_text2}</div>
        </section>
      )}
    </main>
  );
}
