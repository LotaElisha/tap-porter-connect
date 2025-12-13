import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://tap.or.tz';
const SUPPORTED_LANGUAGES = ['en', 'sw', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'ko', 'ru', 'ar', 'zh'];

const SEOHead = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Update HTML lang attribute
    document.documentElement.lang = i18n.language;
    
    // Update dir attribute for RTL languages
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
  }, [i18n.language]);

  useEffect(() => {
    // Get page-specific SEO or use defaults
    const getPageSEO = () => {
      const path = location.pathname;
      
      switch (path) {
        case '/':
          return {
            title: t('seo.home.title'),
            description: t('seo.home.description')
          };
        case '/about':
          return {
            title: t('seo.about.title'),
            description: t('seo.about.description')
          };
        case '/contact':
          return {
            title: t('seo.contact.title'),
            description: t('seo.contact.description')
          };
        case '/membership':
          return {
            title: t('seo.membership.title'),
            description: t('seo.membership.description')
          };
        case '/programs':
          return {
            title: t('seo.programs.title'),
            description: t('seo.programs.description')
          };
        case '/history':
          return {
            title: t('seo.history.title'),
            description: t('seo.history.description')
          };
        case '/partners':
          return {
            title: t('seo.partners.title'),
            description: t('seo.partners.description')
          };
        case '/stories':
          return {
            title: t('seo.stories.title'),
            description: t('seo.stories.description')
          };
        case '/gallery':
          return {
            title: t('seo.gallery.title'),
            description: t('seo.gallery.description')
          };
        case '/porters':
          return {
            title: t('seo.porterDirectory.title'),
            description: t('seo.porterDirectory.description')
          };
        case '/news':
          return {
            title: t('seo.news.title'),
            description: t('seo.news.description')
          };
        case '/podcast':
          return {
            title: t('seo.podcast.title'),
            description: t('seo.podcast.description')
          };
        case '/porter-chat':
          return {
            title: t('seo.porterChat.title'),
            description: t('seo.porterChat.description')
          };
        default:
          return {
            title: t('seo.default.title'),
            description: t('seo.default.description')
          };
      }
    };

    const { title, description } = getPageSEO();
    const canonicalUrl = `${SITE_URL}${location.pathname}`;
    
    // Update document title
    document.title = title;
    
    // Helper function to set meta tag
    const setMetaTag = (selector: string, attribute: string, content: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        const [attrName, attrValue] = selector.match(/\[([^\]]+)\]/)?.[1].split('=') || [];
        if (attrName && attrValue) {
          element.setAttribute(attrName, attrValue.replace(/"/g, ''));
        }
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    // Helper function to set link tag
    const setLinkTag = (rel: string, href: string, additionalAttrs?: Record<string, string>) => {
      const selector = additionalAttrs?.hreflang 
        ? `link[rel="${rel}"][hreflang="${additionalAttrs.hreflang}"]`
        : `link[rel="${rel}"]:not([hreflang])`;
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (additionalAttrs) {
          Object.entries(additionalAttrs).forEach(([key, value]) => {
            element!.setAttribute(key, value);
          });
        }
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Update meta description
    setMetaTag('meta[name="description"]', 'content', description);
    
    // Update canonical URL
    setLinkTag('canonical', canonicalUrl);
    
    // Update Open Graph tags
    setMetaTag('meta[property="og:title"]', 'content', title);
    setMetaTag('meta[property="og:description"]', 'content', description);
    setMetaTag('meta[property="og:url"]', 'content', canonicalUrl);
    setMetaTag('meta[property="og:locale"]', 'content', i18n.language);
    setMetaTag('meta[property="og:site_name"]', 'content', 'Tanzania Association of Porters');
    setMetaTag('meta[property="og:type"]', 'content', 'website');
    setMetaTag('meta[property="og:image"]', 'content', `${SITE_URL}/tap-logo.jpeg`);
    
    // Update Twitter Card tags
    setMetaTag('meta[name="twitter:card"]', 'content', 'summary_large_image');
    setMetaTag('meta[name="twitter:title"]', 'content', title);
    setMetaTag('meta[name="twitter:description"]', 'content', description);
    setMetaTag('meta[name="twitter:image"]', 'content', `${SITE_URL}/tap-logo.jpeg`);
    
    // Add hreflang tags for language alternates
    SUPPORTED_LANGUAGES.forEach(lang => {
      const langUrl = lang === 'en' 
        ? `${SITE_URL}${location.pathname}`
        : `${SITE_URL}${location.pathname}?lang=${lang}`;
      setLinkTag('alternate', langUrl, { hreflang: lang });
    });
    
    // Add x-default hreflang
    setLinkTag('alternate', `${SITE_URL}${location.pathname}`, { hreflang: 'x-default' });
    
    // Add JSON-LD structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }
    
    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Tanzania Association of Porters",
      "alternateName": "TAP",
      "url": SITE_URL,
      "logo": `${SITE_URL}/tap-logo.jpeg`,
      "description": "Empowering Tanzania's Mountain Porters through welfare, training, and advocacy programs.",
      "foundingDate": "2018",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "P.O. Box 4087",
        "addressLocality": "Arusha",
        "addressCountry": "TZ"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+255-763-488-857",
        "email": "info@tap.or.tz",
        "contactType": "customer service",
        "availableLanguage": ["English", "Swahili"]
      },
      "sameAs": [
        "https://www.facebook.com/tanzaniaporters",
        "https://www.instagram.com/tanzaniaporters",
        "https://www.youtube.com/@tanzaniaporters"
      ],
      "areaServed": {
        "@type": "Country",
        "name": "Tanzania"
      },
      "serviceType": [
        "Porter Training",
        "Porter Welfare",
        "Mountain Climbing Support",
        "Porter Advocacy"
      ]
    };
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    
  }, [location.pathname, i18n.language, t]);

  return null;
};

export default SEOHead;
