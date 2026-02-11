"use client";
import "@/compstyles/tcaresol.css";
import { ITcaresol } from "@/contentstack/generated";
import { decode } from "html-entities";



const TcaresolComponent = (entry: ITcaresol) => {
  const raw = entry.texts || [];

  // Convert RTE strings safely
  const slides = raw.map((item: any) => {
    let html = typeof item === "string" ? item : item?.text || "";

    // Extract class & id before removing tags
    const idMatch = html.match(/id="([^"]+)"/)?.[1] || "";
    const classMatch = html.match(/class="([^"]+)"/)?.[1] || "";

    // Clean text content fully
  const cleaned = decode(html)
  .replace(/&nbsp;|&#160;/gi, " ")
  .replace(/<\/?[^>]+(>|$)/g, "")
  .replace(/\s+/g, " ")
  .trim();

    return {
      id: idMatch,
      className: classMatch,
      html: cleaned,
      pos: Number(classMatch.match(/pos-(\d+)/)?.[1] || 999)
    };
  });

  if (!slides.length) return null;

  // Sort by pos-x
  const ordered = slides.sort((a, b) => a.pos - b.pos);

  // Wrapper element based on first item
  const wrapperId = ordered[0].id || "";
  const wrapperClass = ordered[0].className || "";

  return (
    <div id={wrapperId} className={`tcaresol-root ${wrapperClass}`}>
      <div className="tcaresol-track">
        {ordered.map((s, i) => (
          <span key={i} className="tcaresol-slide">{s.html}</span>
        ))}
      </div>
    </div>
  );
};

export default TcaresolComponent;
