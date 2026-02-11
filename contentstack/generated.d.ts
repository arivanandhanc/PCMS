type BuildTuple<T, N extends number, R extends T[] = []> = R["length"] extends N
  ? R
  : BuildTuple<T, N, [...R, T]>;

type TuplePrefixes<T extends any[]> = T extends [any, ...infer Rest]
  ? T | TuplePrefixes<Rest extends any[] ? Rest : []>
  : [];

type MaxTuple<T, N extends number> = TuplePrefixes<BuildTuple<T, N>>;

export interface IReferencedEntry extends ISystemFields {
  uid: string;
  _content_type_uid: string;
}

export interface IPublishDetails {
  environment: string;
  locale: string;
  time: string;
  user: string;
}

export interface IFile {
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
  publish_details: IPublishDetails;
}

export interface ILink {
  title: string;
  href: string;
}

export interface ITaxonomy {
  taxonomy_uid: string;
  max_terms?: number;
  mandatory: boolean;
  non_localizable: boolean;
}

export type ITaxonomyEntry = ITaxonomy & { term_uid: string };

export interface ISystemFields {
  uid?: string;
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  _content_type_uid?: string;
  tags?: string[];
  ACL?: any[];
  _version?: number;
  _in_progress?: boolean;
  locale?: string;
  publish_details?: IPublishDetails;
  title?: string;
}

export type IModularBlocksExtension<T> = {
  [P in keyof T]?: T[P] & { _metadata?: { uid?: string } };
};

export interface IPageElementPrimary {
  /** Version */
  _version?: number;
  /** Background */
  background?: IFile | null;
  /** Button */
  button?: IButton;
  /** Description */
  description?: string;
  /** Form needed ? */
  form_needed_: boolean;
  /** Style */
  style?:
    | ("background-buttoon,text on top" | "image and elements side to side")
    | null;
}

export interface IButton {
  /** Version */
  _version?: number;
  /** Label */
  label?: string;
  /** URL */
  url?: string;
  /** Open in new tab */
  open_in_new_tab: boolean;
  /** Style */
  style?: ("white" | "Blue") | null;
}

export interface IMedia {
  /** Version */
  _version?: number;
  /** Media */
  media?: IFile | null;
}

export interface ICta {
  /** Version */
  _version?: number;
  /** Name */
  name?: string;
  /** Link */
  link?: ILink;
}

/** A block! */
export interface IBlock {
  /** Version */
  _version?: number;
  /** Title */
  title?: string;
  /** Copy */
  copy?: string;
  /** Image */
  image?: IFile | null;
  /** Layout */
  layout?: ("image_left" | "image_right") | null;
}

export interface IImageDescriptionBlock extends ISystemFields {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** Description */
  description?: string;
  /** Image */
  image?: IFile | null;
}

export interface IEcomprimary extends ISystemFields {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** URL */
  url?: string;
  /** sections */
  sections?: IPageElementPrimary[];
}

export interface IPdp extends ISystemFields {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** Product ID */
  product_id?: number | null;
  /** slug */
  slug?: string;
  /** Title of the product */
  title_of_the_product?: string;
  /** Product Image */
  product_image?: IFile | null;
  /** Product Descritpion */
  product_descritpion?: string;
  /** Product Price */
  product_price?: number | null;
  /** Available for cart ? */
  available_for_cart_: boolean;
}

export interface IPlp extends ISystemFields {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** Products */
  products?: (IPdp | IReferencedEntry)[];
}

export interface INewblock extends ISystemFields {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
}

export interface IContactForm extends ISystemFields {
  /** Version */
  _version?: number;
  /** Name */
  name: string;
  /** Email */
  email: string;
  /** Message */
  message: string;
}

export interface IFormIi extends ISystemFields {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
}

export interface IForm extends ISystemFields {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** Name */
  name?: string;
  /** Message */
  message?: string;
  /** Contact */
  contact?: string;
}

export interface ITcaresol extends ISystemFields {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** texts */
  texts?: string[];
}

export interface IIcaresol extends ISystemFields {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** Imiage */
  imiage?: IFile[] | null;
}

export interface ISubPages extends ISystemFields {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** URL */
  url?: string;
  /** Group */
  group?: {
    /** Titlefield */
    titlefield?: string;
    /** Media */
    media?: IMedia[];
    /** Descriptions */
    descriptions?: string[];
    /** Quote */
    quote?: string;
  };
  /** Quote */
  quote?: string;
}

/** Simple page with hero image or video */
export interface IPage extends ISystemFields {
  /** Version */
  _version?: number;
  /** Title */
  title: string;
  /** URL */
  url: string;
  /** Description */
  description?: string;
  /** Hero Image */
  hero_image?: IFile | null;
  /** Hero Video */
  hero_video?: IFile | null;
  /** Caresol */
  caresol?: (ITcaresol | IReferencedEntry)[];
  /** Reference */
  reference?: (IContactForm | IReferencedEntry)[];
  /** Body Text */
  body_text?: string;
  /** Body Text II */
  body_text2?: string;
  /** image_description_block */
  image_description_block?: (IImageDescriptionBlock | IReferencedEntry)[];
}

export interface IFooter extends ISystemFields {
  /** Version */
  _version?: number;
  /** Footer */
  title: string;
  /** Copyright */
  copyright?: string;
  /** CTA */
  cta?: ICta[];
}

/** This content type use to handle header content entry */
export interface IHeader extends ISystemFields {
  /** Version */
  _version?: number;
  /** Header */
  title: string;
  /** Logo */
  logo?: IFile | null;
  /** URL */
  url?: string;
  /** Links Group */
  links_group?: {
    /** Links */
    links?: ILink[];
  };
}
