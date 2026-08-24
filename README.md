# Theos Gaming — storefront concept

A premium, dependency-free ecommerce storefront for **Theos Gaming**.

- `index.html` — storefront content and inline product artwork
- `assets/styles.css` — responsive storefront design
- `assets/app.js` — cart, search, filtering, navigation, and form interactions
- `product-development/SERIES-01.md` — internal requirements for the first three products
- `product-development/cost-model.csv` — editable 100% markup cost gates
- `privacy.html` / `terms.html` — policy templates requiring final legal review
- `favicon.svg` — Theos performance mark

## Preview locally

```bash
python3 -m http.server 3000
# → http://localhost:3000
```

## Shopify integration

The current build is a high-fidelity, static storefront prototype. Series 01 is
presented as an in-development concept range, and the saved setup is persisted
locally. No orders or preorders are accepted. To launch on Shopify:

1. map the page sections into Shopify theme sections;
2. replace the three concept products with real Shopify products and variant IDs;
3. connect cart actions to Shopify's Ajax Cart API;
4. replace the placeholder support email, social links, policies, currency, and
   fulfillment details with final store information; and
5. complete legal review before publishing.

The project can continue to deploy as a static preview through GitHub Pages
without a build step.
