import Image from "next/image";

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
    return (
      <div style={{ padding: "4rem", textAlign: "center" }}>
        No page data found
      </div>
    );
  }

  return (
    <main
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem",
      }}
    >
      {/* TITLE */}
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        {page.title}
      </h1>

      {/* DESCRIPTION */}
      {page.description && (
        <p style={{ fontSize: "1.1rem", marginBottom: "2rem" }}>
          {page.description}
        </p>
      )}

      {/* HERO MEDIA (VIDEO FIRST, IMAGE FALLBACK) */}
      {page.hero_video?.url ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: "100%",
            maxHeight: "500px",
            objectFit: "cover",
            marginBottom: "2rem",
          }}
        >
          <source src={page.hero_video.url} />
        </video>
      ) : page.hero_image?.url ? (
        <Image
          src={page.hero_image.url}
          alt={page.hero_image.title || "Hero image"}
          width={1200}
          height={600}
          style={{ marginBottom: "2rem" }}
        />
      ) : null}

      {/* BODY TEXT */}
      {page.body_text && (
        <div
          style={{
            fontSize: "1rem",
            lineHeight: 1.6,
            whiteSpace: "pre-line",
          }}
        >
          {page.body_text}
        </div>
      )}
    </main>
  );
}
