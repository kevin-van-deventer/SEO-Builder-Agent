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
