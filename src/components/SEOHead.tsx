import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

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
        default:
          return {
            title: t('seo.default.title'),
            description: t('seo.default.description')
          };
      }
    };

    const { title, description } = getPageSEO();
    
    // Update document title
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (!ogTitle) {
      ogTitle = document.createElement('meta');
      ogTitle.setAttribute('property', 'og:title');
      document.head.appendChild(ogTitle);
    }
    ogTitle.setAttribute('content', title);
    
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (!ogDescription) {
      ogDescription = document.createElement('meta');
      ogDescription.setAttribute('property', 'og:description');
      document.head.appendChild(ogDescription);
    }
    ogDescription.setAttribute('content', description);
    
    // Update og:locale
    let ogLocale = document.querySelector('meta[property="og:locale"]');
    if (!ogLocale) {
      ogLocale = document.createElement('meta');
      ogLocale.setAttribute('property', 'og:locale');
      document.head.appendChild(ogLocale);
    }
    ogLocale.setAttribute('content', i18n.language);
    
  }, [location.pathname, i18n.language, t]);

  return null;
};

export default SEOHead;
