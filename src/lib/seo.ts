import type { Metadata } from "next";

export const siteConfig = {
  name: "WealthNestPro",
  url: "https://wealthnestpro.in",
  description:
    "Explore home loans, home loan balance transfer and loan against property solutions with WealthNestPro. Calculate EMIs and submit a loan enquiry.",
  logo: "/logo.png",
  ogImage: "/og-image.jpg",
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

export const defaultMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default:
      "Home Loan, Balance Transfer & Property Loan | WealthNestPro",
    template: "%s | WealthNestPro",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "home loan",
    "home loan India",
    "home loan assistance",
    "home loan balance transfer",
    "balance transfer home loan",
    "property loan",
    "loan against property",
    "home loan EMI calculator",
    "loan prepayment calculator",
    "loan balance transfer calculator",
    "loan against property calculator",
  ],
  authors: [
    {
      name: "WealthNestPro",
      url: siteConfig.url,
    },
  ],
  creator: "WealthNestPro",
  publisher: "WealthNestPro",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title:
      "Home Loan, Balance Transfer & Property Loan | WealthNestPro",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt:
          "WealthNestPro - Home Loan, Balance Transfer and Property Loan Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Home Loan, Balance Transfer & Property Loan | WealthNestPro",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: "/favicon.ico",
  },
  verification: {
    google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },
};