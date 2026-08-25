# Theos Gaming — Shopify storefront

A premium storefront and upload-ready Shopify Online Store 2.0 theme for
**Theos Gaming**.

- `index.html` — storefront content and inline product artwork
- `assets/styles.css` — responsive storefront design
- `assets/app.js` — cart, search, filtering, navigation, and form interactions
- `shopify-theme/` — production Shopify theme source
- `theos-gaming-shopify-theme.zip` — Shopify Admin upload package
- `product-development/SERIES-01.md` — internal requirements for the first three products
- `product-development/cost-model.csv` — editable 100% markup cost gates
- `product-development/atlas-75-founder/` — sub-$1,000 supplier brief, RFQ,
  compliance gate, scorecard, and sample acceptance plan
- `privacy.html` / `terms.html` — policy templates requiring final legal review
- `favicon.svg` — Theos performance mark

## Preview locally

```bash
python3 -m http.server 3000
# → http://localhost:3000
```

## Shopify integration

The Shopify build uses native Liquid products, variants, pricing, inventory,
collections, predictive search, customer newsletter forms, Ajax cart, and
Shopify checkout.

1. In Shopify Admin, go to **Online Store → Themes**.
2. Choose **Add theme → Upload zip file**.
3. Upload `theos-gaming-shopify-theme.zip`.
4. Click **Customize**, then assign:
   - the hero and featured products;
   - the three category collections;
   - the homepage product collection;
   - navigation menus, logo, social links, and final store copy.
5. Add final store policies under **Settings → Policies** and test checkout
   before publishing.

To rebuild the ZIP after editing:

```bash
cd shopify-theme
zip -r ../theos-gaming-shopify-theme.zip . \
  -x "*.DS_Store" -x "__MACOSX/*"
```

The project can continue to deploy as a static preview through GitHub Pages
without a build step.
