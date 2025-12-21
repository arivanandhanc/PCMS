type BuildTuple<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : BuildTuple<T, N, [...R, T]>;

type TuplePrefixes<T extends any[]> = T extends [any, ...infer Rest]
  ? T | TuplePrefixes<Rest extends any[] ? Rest : []>
  : [];

type MaxTuple<T, N extends number> = TuplePrefixes<BuildTuple<T, N>>;

export interface PublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

export interface File {
  uid: string;
  created_at: string;
  updated_at: string;
  created_by: string;
  updated_by: string;
  content_type: string;
  file_size: string;
  tags: string[];
  filename: string;
  url: string;
  ACL: any[] | object;
  is_dir: boolean;
  parent_uid: string;
  _version: number;
  title: string;
  _metadata?: object;
  description?: string;
  dimension?: {
    height: number;
    width: number;
  };
  publish_details: PublishDetails;
}

export interface Link {
  title: string;
  href: string;
}

export interface Taxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

export type TaxonomyEntry = Taxonomy & { term_uid: string };

/** A block! */
export interface Block {
  /** Version */
  _version?: number;
  /** Title */
  title?: string;
  /** Copy */
  copy?: string;
  /** Image */
  image?: File | null;
  /** Layout */
  layout?: ("image_left" | "image_right") | null;
}

export interface Footer {
  /** Version */
  _version?: number;
  /** Footer */
  title: string;
  /** Copyright */
  copyright?: string;
  /** URL */
  url?: string;
}

/** This content type use to handle header content entry */
export interface Header {
  /** Version */
  _version?: number;
  /** Header */
  title: string;
  /** Logo */
  logo?: File | null;
  /** URL */
  url?: string;
  /** Links Group */
  links_group?: {
    /** Links */
    links?: Link;
    /** Link1 */
    link1?: Link;
  };
}

export interface Blocks {
  block: Block;
}

export interface Page {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** URL */
  url?: string;
  /** Description */
  description?: string;
  /** Image */
  image?: File | null;
  /** Rich Text */
  rich_text?: string;
  /** blocks */
  blocks?: Blocks[];
}
