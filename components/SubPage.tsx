import Image from "next/image";
import "@/compstyles/subpage.css";
import type { SubPages } from "@/contentstack/generated";

type SubPageProps = {
  page: Pick<
    SubPages,
    "title" | "group" | "quote"
  > | null;
};

export default function SubPage({ page }: SubPageProps) {
  if (!page) {
    return <div className="cs-empty">No sub page data</div>;
  }

  const group = page.group;

  return (
    <main className="one">
      <section className="cs-page__content">
  {group?.media?.map((item, idx) =>
    item.media?.url ? (
      <figure key={idx} className={`cs-media cs-media--${idx % 3}`}>
        <Image
          src={item.media.url}
          alt={item.media.title || ""}
          width={600}
          height={600}
        />
      </figure>
    ) : null
  )}

  {group?.descriptions?.map((desc, i) => (
    <p key={i}>{desc}</p>
  ))}

        {group?.quote && (
          <div
            className="cs-quote"
            dangerouslySetInnerHTML={{ __html: group.quote }}
          />
        )}

        {page.quote && (
          <div
            className="cs-quote"
            dangerouslySetInnerHTML={{ __html: page.quote }}
          />
        )}
      </section>
    </main>
  );
}
