
import contentstack, { QueryOperation } from "@contentstack/delivery-sdk";
export const dynamic = "force-dynamic";
import ContentstackLivePreview, { IStackSdk } from "@contentstack/live-preview-utils";
import type { SubPages } from "@/contentstack/generated";
import { Page } from "./types";
import { getContentstackEndpoints, getRegionForString } from "@timbenniks/contentstack-endpoints";

export const isPreview = process.env.NEXT_PUBLIC_CONTENTSTACK_PREVIEW === "true";

const region = getRegionForString(process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as string)

const endpoints = getContentstackEndpoints(region, true)

export const stack = contentstack.stack({
  apiKey: process.env.NEXT_PUBLIC_CONTENTSTACK_API_KEY as string,
  deliveryToken: process.env.NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN as string,
  environment: process.env.NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT as string,
  region: region ? region : process.env.NEXT_PUBLIC_CONTENTSTACK_REGION as any,
  host: process.env.NEXT_PUBLIC_CONTENTSTACK_CONTENT_DELIVERY || endpoints && endpoints.contentDelivery,
});

export async function fetchContentstack(url: string) {
  const res = await fetch(url, {
    headers: {
      api_key: process.env.CONTENTSTACK_API_KEY!,
      access_token: process.env.CONTENTSTACK_DELIVERY_TOKEN!,
    },
    cache: "no-store",            //  Force fresh content
    next: { revalidate: 0 },       //  Disable stale caching in Vercel
  });

  return res.json();
}


// Function to fetch page data based on the URL
export async function getPage(url: string) {
  const result = await stack
    .contentType("page")
    .entry()
    .includeReference("caresol")   
    .query()
    .where("url", QueryOperation.EQUALS, url)
    .find<Page>();

  if (result.entries?.length) return result.entries[0];
  return null;
}


export async function getSubPage(
  url: string
): Promise<SubPages | null> {
  const result = await stack
    .contentType("sub_pages")
    .entry()
    .query()
    .where("url", QueryOperation.EQUALS, url)
    .find<SubPages>();

  if (result.entries?.length) {
    const entry = result.entries[0];

    if (isPreview) {
      contentstack.Utils.addEditableTags(
        entry as unknown as { uid: string },
        "sub_pages",
        true
      );
    }

    return entry;
  }

  return null;
}


async function fetchSingletonEntry<
  T extends contentstack.Utils.EntryModel
>(contentTypeUid: string): Promise<T | null> {
  const result = await stack
    .contentType(contentTypeUid)
    .entry()
    .query()
    .find<T>();

  if (result.entries && result.entries.length > 0) {
    const entry = result.entries[0];

    if (isPreview) {
      contentstack.Utils.addEditableTags(entry, contentTypeUid, true);
    }

    return entry;
  }

  return null;
}


export async function getHeader() {
  return fetchSingletonEntry("header");
}

export async function getFooter() {
  return fetchSingletonEntry("footer");
}

// PLP
export async function getProductList() {
  const result = await stack
    .contentType("plp")
    .entry()
    .includeReference("products")
    .query()
    .find<any>();

  if (result.entries?.length) {
    return result.entries[0];
  }

  return null;
}

// PDP by UID (used by PLP)
export async function getProductByUid(uid: string) {
  const entry = await stack
    .contentType("pdp")
    .entry(uid)
    .fetch();

  return entry;
}

// PDP by slug (used by PDP page)
export async function getProductBySlug(slug: string) {
  const result = await stack
    .contentType("pdp")
    .entry()
    .query()
    .where("slug", QueryOperation.EQUALS, slug)
    .find<any>();

  if (!result.entries?.length) return null;

  const uid = result.entries[0].uid;

  const fullEntry = await stack
    .contentType("pdp")
    .entry(uid)
    .fetch();

  return fullEntry;
}




// ✅ ECOM PAGE (separate from normal Page CT)
export async function getEcomPage(url: string) {
  const result = await stack
    .contentType("ecomprimary")
    .entry()
    .includeEmbeddedItems()           // for Global field (sections)
    .includeReference("sections.button")
    .includeReference("sections.background")
    .query()
    .where("url", QueryOperation.EQUALS, url)
    .find<any>();

  if (result.entries?.length) {
    return result.entries[0];
  }

  return null;
}
