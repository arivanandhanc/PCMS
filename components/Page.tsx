import Image from "next/image";
import "@/compstyles/page.css";
interface PageProps {
  page: {
    title: string;
    description?: string;
    body_text?: string;
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
    <main>
      {/* HERO */}
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

      {/* PAGE CONTENT */}
      {page.body_text && (
        <section className="cs-page__content">
          <div className="cs-richtext">{page.body_text}</div>
        </section>
      )}
    </main>
  );
}
