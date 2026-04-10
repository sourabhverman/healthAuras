import { useEffect } from "react";

interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function usePageSEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
}: PageSEO) {
  useEffect(() => {
    const prevTitle = document.title;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "keywords", keywords);
    setCanonical(canonical);

    // Open Graph
    setMeta("property", "og:title", ogTitle ?? title);
    setMeta("property", "og:description", ogDescription ?? description);
    setMeta("property", "og:url", canonical);

    // Twitter
    setMeta("name", "twitter:title", ogTitle ?? title);
    setMeta("name", "twitter:description", ogDescription ?? description);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription]);
}
