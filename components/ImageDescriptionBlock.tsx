"use client";

import Image from "next/image";
import "@/compstyles/idb.css";
import type { IImageDescriptionBlock } from "@/contentstack/generated";

type Props = {
  block: IImageDescriptionBlock;
};

export default function ImageDescriptionBlock({ block }: Props) {
  const { title, description, image } = block;

  return (
    <section className="idb-wrapper">
      <div className="idb-card">
        {image?.url ? (
          <div className="idb-image">
            <Image
              src={image.url}
              alt={image.filename ?? title}
              width={800}
              height={500}
              className="idb-img"
            />
          </div>
        ) : null}

        <div className="idb-content">
          <h2>{title}</h2>

          {description ? (
            <div
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
