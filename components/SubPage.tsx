"use client";
import Image from "next/image";
import "@/compstyles/subpage.css";
import type { ISubPages } from "@/contentstack/generated";
import { redirect } from "next/navigation";
type SubPageProps = {
  page: Pick<
    ISubPages,
    "title" | "group" | "quote"
  > | null;
};

export default function SubPage({ page }: SubPageProps) {
  if (!page) redirect("/");

  const group = page.group;

  return (
    <main>
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
