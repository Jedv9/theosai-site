# Theos Gaming Series 01

Product requirements brief — concept stage  
Last updated: August 24, 2026

> Internal development document. Every performance figure below is a design
> target, not a customer-facing claim. Claims can move to the storefront only
> after they are measured on production-representative hardware.

## Product strategy

Series 01 is a coherent performance setup for competitive and everyday gamers:

1. **VX-9 Pro Wireless** — a balanced, lightweight mouse.
2. **Atlas 75 HE** — a compact magnetic-switch keyboard.
3. **Grid-1 Performance Desk** — a height-adjustable desk and cable platform.

The range shares one design language: satin black structural surfaces, restrained
racing-orange functional details, warm-white legends, minimal lighting, exposed
precision where it communicates purpose, and no decorative feature that adds
weight, latency, noise, or setup friction.

“For everyone” is treated as broad compatibility, not one-size-fits-all
ergonomics. Series 01 should prioritize a clear performance use case while
offering sensible adjustability and accessibility.

## Commercial rule

The agreed pricing rule is **100% markup on total landed unit cost**:

```text
MSRP = landed unit cost × 2
gross margin = (MSRP - landed unit cost) / MSRP = 50%
```

Total landed unit cost must include the finished unit, retail packaging, inbound
freight, duty/tariffs, inspection, and an allowance for manufacturing defects.
It does not include payment processing, outbound customer shipping, returns,
warranty replacements, support, or marketing. Those costs will reduce the
real contribution margin below 50%.

Initial commercial gates:

| Product | Provisional MSRP | Maximum landed cost | Status |
| --- | ---: | ---: | --- |
| VX-9 Pro Wireless | $129.00 | $64.50 | Concept target |
| Atlas 75 HE | $199.00 | $99.50 | Concept target |
| Grid-1 Performance Desk | $899.00 | $449.50 | Concept target |

Prices remain provisional until at least two manufacturers quote the same
requirements, including packaging and certification assumptions.

---

## 1. VX-9 Pro Wireless

### Product intent

A medium-size, symmetrical performance mouse that feels neutral on first use
and predictable under pressure. Low mass matters, but balance, stiffness,
click consistency, and wireless stability take priority over winning a
single-number weight comparison.

### Design targets

| Area | Target |
| --- | --- |
| Shape | Symmetrical, medium; optimized for claw and relaxed claw |
| Envelope | Approximately 121 × 63 × 39 mm |
| Mass | 54 g ± 2 g without receiver or cable |
| Primary material | Glass-reinforced or high-stiffness PC/ABS; closed shell |
| Finish | Satin micro-texture; no rubber coating |
| Main inputs | 5 buttons plus wheel; separated primary triggers |
| Sensor | Current flagship-class optical sensor; no smoothing or acceleration |
| Polling | 1,000 Hz standard; validated high-rate mode as an optional tier |
| Connection | Low-latency 2.4 GHz and USB-C wired mode |
| Battery | Minimum 70 hours at 1,000 Hz under the published test method |
| Switches | Optical primary switches; mechanical side and wheel switches |
| Feet | Replaceable, rounded virgin-grade PTFE skates |
| Firmware | Onboard profile storage; settings available without a permanent app |
| Included | Receiver, receiver extender, flexible USB-C cable, spare skates |

### Mechanical requirements

- Center of mass must sit within 3 mm of the geometric grip center.
- No audible shell creak under normal squeeze loads.
- Primary-button lateral play and pre/post-travel require measurable tolerances.
- Side buttons must be reachable without changing grip and recessed enough to
  prevent accidental actuation.
- Wheel steps must remain distinct at fast scroll speed.
- The receiver must store securely in the product or travel accessory.
- Shell and PCB must be designed for repeatable assembly and repair access;
  adhesive is not an acceptable primary fastener.

### Validation gates

- Wireless packet-loss and latency testing in congested 2.4 GHz environments.
- Motion and click latency measured against at least two established competitors.
- Battery runtime measured at each advertised polling rate.
- Drop, torsion, switch-cycle, wheel-cycle, sweat, abrasion, and thermal tests.
- Grip evaluation with a deliberately varied hand-size and grip-style panel.
- FCC/CE/UKCA radio and safety review, RoHS/REACH, battery UN 38.3, and
  destination-market labeling before production.

### Cost gate

The product must land at or below **$64.50** to support a $129 MSRP under the
agreed markup rule. A supplier quote should separate tooling, NRE, unit cost,
packaging, accessories, certification, freight, duty, and inspection.

---

## 2. Atlas 75 HE

### Product intent

A compact competition keyboard with magnetic sensing that is quick to tune but
calm to live with. The value is consistent actuation and a clear configurator,
not excessive lighting or novelty controls.

### Design targets

| Area | Target |
| --- | --- |
| Layout | 75% ANSI launch layout with dedicated arrows and navigation column |
| Chassis | Aluminum upper frame with rigid polymer lower or quoted full aluminum option |
| Mount | Controlled gasket or isolation mount with minimal deck movement |
| Switch system | Hall-effect magnetic, factory-lubed, replaceable |
| Actuation | Adjustable target range from 0.1–4.0 mm |
| Features | Rapid trigger, per-key actuation, SOCD options only where permitted |
| Scan/polling | Architecture capable of stable high-rate input; final rate after validation |
| Keycaps | Double-shot PBT, shine-through not required |
| Connection | Detachable USB-C wired at launch |
| Profiles | Minimum three onboard profiles |
| Configuration | Browser-based configurator with no required account |
| Lighting | Single-zone white/orange status lighting; per-key RGB only if cost-neutral |
| Included | Detachable braided cable, keycap/switch puller, alternate accent keys |

### Experience requirements

- The default profile must be usable without configuration.
- Settings language must explain practical effects rather than only raw numbers.
- The configurator must expose reset, firmware recovery, and profile export.
- Stabilizers must be serviceable and free from material rattle on production units.
- Legends, status indicators, and secondary functions must remain readable in
  normal room lighting.
- Firmware updates must fail safely and allow recovery without returning the unit.
- Tournament mode must disable macros and nonessential shortcuts visibly.

### Validation gates

- Per-key actuation calibration across temperature and long-duration use.
- End-to-end key latency, scan consistency, chatter, and simultaneous-input tests.
- Switch-cycle, keycap wear, connector strain, ESD, spill-path, flex, and drop tests.
- Acoustic evaluation for stabilizers, case resonance, and high-frequency ping.
- Configurator testing on current Chrome, Safari, Firefox, and Edge releases.
- FCC/CE/UKCA, RoHS/REACH, IEC 62368-1 review, and destination-market labeling.

### Cost gate

The keyboard must land at or below **$99.50** to support a $199 MSRP. Full CNC
construction, wireless connectivity, and elaborate lighting are quote options,
not baseline promises; each must survive the cost and reliability gates.

---

## 3. Grid-1 Performance Desk

### Product intent

A stable sit/stand desk that treats cable routing and accessory placement as
part of the structure. It should look architectural when empty and remain calm
when fully configured.

### Design targets

| Area | Target |
| --- | --- |
| Launch size | 1600 × 800 mm work surface |
| Height range | Approximately 630–1280 mm, finalized with frame supplier |
| Lift system | Dual motor with synchronized control |
| Dynamic load | Minimum 100 kg validated evenly distributed |
| Stability | Performance benchmarked at seated and standing heights |
| Surface | Low-glare, durable laminate or linoleum over engineered core |
| Edge | Soft-touch front profile with replaceable impact strip |
| Cable system | Full-width hinged cable vault accessible from the seated position |
| Accessory system | Rear mechanical rail for monitor, light, and device modules |
| Controls | Four memory positions, lock, collision detection, clear height display |
| Power | External certified power module at launch; integrated power only after certification |
| Finish | Satin black frame and surface with replaceable orange functional accents |
| Packaging | Flat-pack, two-person assembly, parcel limits confirmed before design freeze |

### Structural and service requirements

- No gaming-style cutouts or shapes that reduce usable work surface.
- Monitor arms must clamp securely without interfering with the cable vault.
- Frame geometry must allow common chairs, under-desk PCs, and pedal setups.
- Frequently damaged components—controller, cable cover, accent rail, feet, and
  surface—must be individually replaceable.
- Assembly hardware must be keyed or clearly labeled and include one required tool.
- The desk must be stable enough for low-sensitivity mouse use at standing height.
- Packaging design must be developed alongside the product, not after design freeze.

### Validation gates

- Static and dynamic overload, cycle, impact, tip, pinch, and collision tests.
- Wobble measured in both axes at several heights and load positions.
- Controller fault, motor desynchronization, power interruption, and recovery tests.
- Surface abrasion, stain, sweat, heat, edge-impact, and cleaner-compatibility tests.
- Repeated assembly/disassembly and real-home assembly observation.
- UL 962/CSA or destination equivalent, CE/UKCA where applicable, RoHS/REACH,
  and review against BIFMA X5.5 and EN 527 requirements.
- Shipping simulation for both packages and carrier-size/weight validation.

### Cost gate

The desk must land at or below **$449.50** to support an $899 MSRP. For this
product, landed cost must explicitly include both packages, inbound freight,
damage allowance, inspection, and any certified external power hardware.
Outbound delivery and return freight require a separate contribution-margin
model because they can materially erase a 50% product gross margin.

---

## Shared development gates

No Series 01 product should move directly from this document to sale.

1. **Concept freeze** — user needs, industrial-design direction, target market,
   and claim language approved.
2. **Supplier RFQ** — the same requirements quoted by at least two qualified
   engineering/manufacturing partners.
3. **EVT** — engineering prototypes prove the core architecture.
4. **DVT** — production-intent design passes reliability, usability, and
   compliance pre-testing.
5. **PVT** — pilot units are made on the intended line, with final packaging and QA.
6. **Launch approval** — verified claims, inventory, fulfillment, returns,
   warranty stock, support process, and final policies are ready.

## Decisions still required

- Initial sales countries, currency, tax model, and regulatory scope.
- Forecast and acceptable tooling/NRE budget for each product.
- Minimum order quantity and launch inventory risk.
- Exact desk size variants and whether standing functionality is mandatory.
- Right-hand-only versus true ambidextrous side-button strategy for the mouse.
- ANSI-only launch versus ISO keyboard layout support.
- Warranty lengths, spare-parts period, and repair/replacement policy.
- Whether prices include delivery, especially for Grid-1.
