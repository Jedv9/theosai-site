# Theos Gaming — storefront concept

A premium, dependency-free ecommerce storefront for **Theos Gaming**.

- `index.html` — storefront content and inline product artwork
- `assets/styles.css` — responsive storefront design
- `assets/app.js` — cart, search, filtering, navigation, and form interactions
- `privacy.html` / `terms.html` — launch-ready policy templates
- `favicon.svg` — Theos performance mark

## Preview locally

```bash
python -m http.server 3000
# → http://localhost:3000
```

## Shopify integration

The current build is a high-fidelity, static storefront prototype. The cart is
persisted locally and the checkout handoff is intentionally presented as a
connection step. To launch on Shopify:

1. map the page sections into Shopify theme sections;
2. replace the three concept products with real Shopify products and variant IDs;
3. connect cart actions to Shopify's Ajax Cart API;
4. replace the placeholder support email, social links, policies, currency, and
   shipping thresholds with final store details; and
5. complete legal review before publishing.

The project can continue to deploy as a static preview through GitHub Pages
without a build step.
