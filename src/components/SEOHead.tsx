
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'product' | 'article';
  product?: {
    name: string;
    price: number;
    originalPrice?: number;
    brand: string;
    model: string;
    condition: string;
    availability: 'in_stock' | 'out_of_stock';
    category: string;
    images: string[];
    description?: string;
    features?: string[];
  };
  breadcrumbs?: Array<{
    name: string;
    url: string;
  }>;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = "Gavi Gadgets Uganda - Buy iPhone, Samsung, Pixel, Huawei | Better than Jumia & Jiji",
  description = "Gavi Gadgets Uganda - Best online electronics store for iPhone 15, 14, 13, 12, 11, Samsung Galaxy S24, S23, S22, Google Pixel 8, 7, 6, Huawei smartphones in Kampala. Better prices than Jumia Uganda and Jiji Uganda.",
  keywords = "smartphones Uganda, iPhone Uganda, Samsung Uganda, Google Pixel Uganda, Huawei Uganda, mobile phones Kampala, electronics Uganda, gadgets Uganda",
  image = "https://gavigadgets.ug/images/gavi_gadgets_logo.png",
  url = "https://gavigadgets.ug",
  type = "website",
  product,
  breadcrumbs
}) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'product' ? "Product" : "WebPage",
    name: product?.name || title,
    description: product?.description || description,
    ...(product && {
      brand: {
        "@type": "Brand",
        name: product.brand
      },
      model: product.model,
      category: product.category,
      condition: product.condition === 'new' ? 'NewCondition' : 'UsedCondition',
      image: product.images,
      offers: {
        "@type": "Offer",
        price: product.price,
        priceCurrency: "UGX",
        availability: product.availability === 'in_stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: {
          "@type": "Organization",
          name: "Gavi Gadgets Uganda",
          address: {
            "@type": "PostalAddress",
            streetAddress: "New Pioneer Mall Shop PA 82A",
            addressLocality: "Kampala",
            addressCountry: "Uganda"
          }
        },
        priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "127"
      }
    })
  };

  const breadcrumbStructuredData = breadcrumbs ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `https://gavigadgets.ug${crumb.url}`
    }))
  } : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Gavi Gadgets Uganda" />
      <meta property="og:locale" content="en_UG" />
      
      {product && (
        <>
          <meta property="product:price:amount" content={product.price.toString()} />
          <meta property="product:price:currency" content="UGX" />
          <meta property="product:availability" content={product.availability} />
          <meta property="product:condition" content={product.condition} />
          <meta property="product:brand" content={product.brand} />
        </>
      )}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      
      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
