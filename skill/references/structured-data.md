# Structured Data (JSON-LD) Playbook

Standardized boilerplates and execution rules for high-precision search schemas.

## 1. Schema Constraints
- **JSON-LD Only**: Never use legacy Microdata or RDFa attributes in markup templates. Wrap all schemas inside `<script type="application/ld+json">`.
- **Zero Placeholders**: Ensure all schemas compile with active production URLs and real variables.
- **FAQPage Rules**: Commercial rich results for FAQPage are retired. Enforce FAQPage schemas strictly on information, educational, government, or medical layouts.

---

## 2. LocalBusiness Template

For localized operations:

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Moyres Guest Farm",
  "image": "https://moyres.co.za/images/hero.webp",
  "telephony": "+27123456789",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Moyres Farm Road",
    "addressLocality": "Dublin",
    "postalCode": "A65 F123",
    "addressCountry": "IE"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 53.3498,
    "longitude": -6.2603
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "08:00",
    "closes": "20:00"
  }
}
```

---

## 3. Gym Template

For fitness facilities and training studios, use the specialized `Gym` type:

```json
{
  "@context": "https://schema.org",
  "@type": "Gym",
  "name": "XO-Fit Pretoria",
  "image": "https://xo-fit.co.za/images/gym-interior.webp",
  "telephone": "+27123456789",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Fitness Way",
    "addressLocality": "Pretoria",
    "addressRegion": "Gauteng",
    "postalCode": "0081",
    "addressCountry": "ZA"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": -25.7479,
    "longitude": 28.2293
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    "opens": "05:00",
    "closes": "21:00"
  }
}
```

---

## 4. Product Template

For packages, training sessions, or memberships sold, use the `Product` type to qualify for rich shopping snippets:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "1-on-1 Personal Training Package",
  "image": "https://xo-fit.co.za/images/pt-session.webp",
  "description": "10-session personalized strength and body conditioning training package.",
  "offers": {
    "@type": "Offer",
    "url": "https://xo-fit.co.za/packages/personal-training",
    "priceCurrency": "ZAR",
    "price": "3500.00",
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2027-12-31"
  }
}
```
