import Image from "next/image";
import "@/compstyles/subpage.css";

type SubPageProps = {
  page: {
    title: string;
    descriptions?: string[];
    group?: {
      titlefield?: string;
      media?: {
        media: {
          url: string;
          title?: string;
        };
      }[];
    };
    quote?: string;
  };
};

const SubPage = ({ page }: SubPageProps) => {
  return (
    <section className="cs-subpage">
      {/* TITLE */}
      <h1 className="cs-subpage__title">{page.title}</h1>

      {/* OPTIONAL GROUP TITLE */}
      {page.group?.titlefield && (
        <h2 className="cs-subpage__subtitle">
          {page.group.titlefield}
        </h2>
      )}

      {/* MEDIA */}
      {page.group?.media?.length > 0 && (
        <div className="cs-subpage__media">
          {page.group.media.map((item, index) => (
            <Image
              key={index}
              src={item.media.url}
              alt={item.media.title || "Content image"}
              width={900}
              height={600}
            />
          ))}
        </div>
      )}

      {/* DESCRIPTIONS */}
      {page.descriptions?.map((text, index) => (
        <p key={index} className="cs-subpage__text">
          {text}
        </p>
      ))}

      {/* QUOTE */}
      {page.quote && (
        <div
          className="cs-subpage__quote"
          dangerouslySetInnerHTML={{ __html: page.quote }}
        />
      )}
    </section>
  );
};

export default SubPage;
