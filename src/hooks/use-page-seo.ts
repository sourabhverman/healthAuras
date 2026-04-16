import { useEffect } from "react";

interface PageSEO {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  ogTitle?: string;
  ogDescription?: string;
  jsonLd?: Record<string, unknown>;
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

function setPageJsonLd(data: Record<string, unknown>) {
  let el = document.querySelector<HTMLScriptElement>('script[data-page-ld]');
  if (!el) {
    el = document.createElement("script");
    el.setAttribute("type", "application/ld+json");
    el.setAttribute("data-page-ld", "true");
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function usePageSEO({
  title,
  description,
  keywords,
  canonical,
  ogTitle,
  ogDescription,
  jsonLd,
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

    // JSON-LD: page-specific structured data injected at runtime
    if (jsonLd) setPageJsonLd(jsonLd);

    return () => {
      document.title = prevTitle;
      document.querySelector("script[data-page-ld]")?.remove();
    };
  }, [title, description, keywords, canonical, ogTitle, ogDescription, jsonLd]);
}
