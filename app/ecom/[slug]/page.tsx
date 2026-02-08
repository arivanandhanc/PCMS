import SectionPrimary from "@/components/ecom/SectionPrimary";
import { getEcomPage } from "@/lib/contentstack";

export default async function EcomPage(props: any) {
  const { slug } = await props.params;

  const page = await getEcomPage(`/${slug}`);

  if (!page) return <div>Page not found</div>;

  return (
    <div>
      <h1 style={{ padding: "40px 60px" }}>{page.title}</h1>

      {page.sections?.map((section: any, i: number) => (
        <SectionPrimary key={i} section={section} />
      ))}
    </div>
  );
}
