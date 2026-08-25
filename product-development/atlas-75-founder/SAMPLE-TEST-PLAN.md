# Atlas 75 HE Founder’s Edition — sample test plan

This plan qualifies an existing production platform for a small Theos-selected
edition. It does not validate a new keyboard design or replace accredited
compliance testing.

## Test controls

- Test two independently purchased samples from the same quoted revision.
- Photograph the carton, labels, serials, receiver, PCB markings visible without
  destructive disassembly, accessories, and software version.
- Record operating system, USB port, connection mode, firmware, configurator,
  switch type, actuation profile, RGB state, and battery state for every run.
- Run both samples from a full reset before comparison.
- Keep supplier claims in a separate column from observed results.

## Critical-fail conditions

Any one of these stops the candidate:

- duplicated, missing, stuck, or chattering input at a stable default profile;
- receiver disconnect, unrecoverable pairing failure, or intermittent USB port;
- firmware update with no documented recovery path;
- configurator flagged by current malware scans or delivered from an unverified
  file-sharing account;
- different PCB, firmware, switch, radio, or battery from the quoted model;
- sample label does not match the supplied FCC/model evidence;
- shell damage, battery swelling, overheating, exposed conductor, or charging fault;
- supplier refuses written resale and defect terms; or
- one of two samples behaves materially differently under identical settings.

## Inspection worksheet

| ID | Test | Method | Acceptance |
| --- | --- | --- | --- |
| ID-01 | Identity | Match invoice, carton, underside label, receiver, software, and firmware | One exact model/revision chain |
| ID-02 | Contents | Inventory all promised accessories | Complete and undamaged |
| ID-03 | Branding | Photograph every third-party mark | All marks disclosed before site copy |
| ME-01 | Case | Twist lightly at corners on flat surface | No rocking, cracking, or intermittent input |
| ME-02 | Plate/deck | Compare center and edge movement | No localized defect or sensor change |
| ME-03 | Stabilizers | Test space, enter, backspace, both shifts | No binding or functional rattle defect |
| ME-04 | Keycaps | Inspect legends, stems, alignment, and contact | No cracks, doubled legends, or interference |
| ME-05 | USB-C | Twenty careful insert/remove and movement checks | No disconnect or loose receptacle |
| HE-01 | Calibration | Reset and calibrate twice | Completes without error on every key |
| HE-02 | Actuation range | Test minimum, midpoint, and maximum on every key | Each setting changes behavior predictably |
| HE-03 | Rapid trigger | Test WASD, shift, control, space, and common rhythm inputs | No chatter, false release, or stuck state |
| HE-04 | Repetition | 200 presses each on WASD, shift, space, enter | Zero duplicate or missing events |
| HE-05 | Rollover | Use a keyboard event visualizer with dense chord patterns | Advertised rollover observed by mode |
| FW-01 | Profiles | Save, power-cycle, switch host, and retest | Intended profile persists without app |
| FW-02 | Reset | Perform documented factory reset | Returns to known usable default |
| FW-03 | Recovery | Follow documented safe recovery without forcing failure | Recovery instructions and files are accessible |
| SW-01 | Source | Obtain software only from verified manufacturer domain | Signed/hashable installer or functioning web app |
| SW-02 | Security | Scan installer and outbound connections | No malware alert or unexplained privileged service |
| SW-03 | Functions | Remap, actuation, RT, lighting, export/import | All advertised controls save correctly |
| SW-04 | Removal | Uninstall/clear browser permissions | No broken driver or persistent unexplained process |
| CN-01 | Wired | Cold boot, sleep/wake, hub/direct port, reconnect | Twenty cycles without lost profile or input |
| CN-02 | 2.4 GHz | Test near router, active headset, and busy Wi-Fi | No observed drop or stuck input |
| CN-03 | Range | Test normal desk, 3 m, and 6 m line-of-sight | Stable at claimed/useful range |
| CN-04 | Bluetooth | Pair, switch devices, sleep/wake | Behavior matches documentation |
| CN-05 | Receiver identity | Confirm model/label and storage | Receiver remains paired and securely stored |
| PW-01 | Charging | Observe charge state, temperature, and completion | No fault, excessive heat, or phantom disconnect |
| PW-02 | Runtime log | Use fixed lighting/profile and timestamp battery states | Publish no runtime claim until repeatable |
| AC-01 | Sound | Record fixed microphone position for all stabilized keys | No isolated ticking, ping, or grinding defect |
| AC-02 | Consistency | Compare both samples on the same desk mat | No material sample-to-sample acoustic mismatch |
| PK-01 | Repack | Unpack and repack twice | No crushing, abrasion, or loose heavy keyboard |
| PK-02 | Label | Check origin, model, electrical, radio, importer plan | All mandatory data has a defined location |

## Evidence score

Score only after critical fails are cleared.

| Category | Weight |
| --- | ---: |
| Identity and supplier evidence | 20 |
| Input consistency and HE controls | 25 |
| Wired/wireless stability | 20 |
| Software and recovery | 15 |
| Mechanical/acoustic quality | 10 |
| Packaging and serviceability | 10 |
| **Total** | **100** |

Minimum approval score: **80/100**, with no category below half of its available
points and no unresolved critical fail.

## Claims release

The following stay off the product page until measured on both samples:

- latency or response-time numbers;
- polling/scan-rate language beyond a clearly attributed supplier specification;
- wireless range;
- battery runtime;
- actuation accuracy or resolution;
- switch lifespan;
- water/spill resistance; and
- tournament or esports superiority.

The first site listing may safely describe only observed layout, included
connections, materials, user-adjustable controls, package contents, and Theos
acceptance testing.
