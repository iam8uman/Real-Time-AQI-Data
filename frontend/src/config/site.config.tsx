import { Metadata } from 'next';
import logoImg from '@/../public/The Wind (1).svg';
import logoIconImg from '@/../public/The Wind.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Vayu instant and accurate',
  description: `Vayu is a IOT based mobile platform which monitor real time air quality index (AQI) of real time location.`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  // TODO: favicon
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Vayu instant and accurate` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Vayu instant and accurate` : title,
      description,
      url: 'https://vayuweb.vercel.app',
      siteName: 'Vayu instant and accurate', // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: 'The Wind.svg',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
