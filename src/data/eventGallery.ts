export type GalleryMedia = {
  type: 'image' | 'video';
  src: string;
  alt: string;
  caption?: string;
};

export type GalleryEvent = {
  slug: string;
  title: string;
  category: 'Conference' | 'Exhibition' | 'Technical Event' | 'Company Event';
  date: string;
  location: string;
  description: string;
  cover: string;
  media: GalleryMedia[];
  published: boolean;
};

/**
 * Published event metadata. Media files should live on persistent Hostinger
 * storage or an external media bucket; do not commit large media files here.
 */
export const galleryEvents: GalleryEvent[] = [];
