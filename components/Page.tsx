import Image from "next/image";
import "@/compstyles/page.css";

interface PageProps {
  page: {
    title: string;
    description?: string;
    body_text?: string;
    body_text2?: string;
    hero_image?: {
      url: string;
      title?: string;
    };
    hero_video?: {
      url: string;
    };
  };
}

export default function Page({ page }: PageProps) {
  if (!page) {
    return <div className="cs-empty">No page data found</div>;
  }

  return (
    <main className="one">
      {/* 1️⃣ HERO */}
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
            <Image
              src={page.hero_image!.url}
              alt={page.title}
              fill
              priority
              className="cs-hero__media"
            />
          )}

          <div className="cs-hero__overlay">
            <h1>{page.title}</h1>
            {page.description && <p>{page.description}</p>}
          </div>
        </section>
      )}

      {/* 2️⃣ BODY CONTENT */}
      {page.body_text && (
        <section className="cs-page__content">
          <div className="cs-richtext">{page.body_text}</div>
        </section>
      )}

      {/* 3️⃣ ANOTHER MEDIA IMAGE (REUSED HERO IMAGE) */}
      {page.hero_image?.url && (
        <section className="cs-secondary-media">
          <Image
            src={page.hero_image.url}
            alt={page.hero_image.title || page.title}
            width={1200}
            height={700}
            className="cs-secondary-media__image"
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
