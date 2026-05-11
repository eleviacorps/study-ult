# Important Derivations - Electric Charges and Fields
#JEE #Class12 #Derivations #Electrostatics #NCERT

---

## Derivation 1: Coulomb's Law from Gauss's Law

### For Point Charge at Center of Sphere

**Given:** Point charge q at center of sphere of radius r

**To Prove:** Flux through sphere = q/ε₀, leading to E = kq/r²

**Derivation:**

**Step 1:** By symmetry, electric field is radial and has same magnitude at all points on sphere surface.

**Step 2:** At any point on sphere, E is parallel to outward normal.
$$\oint_S \mathbf{E} \cdot d\mathbf{S} = E \times \text{(surface area)}$$

**Step 3:** Surface area of sphere = $4\pi r^2$
$$\phi = E \times 4\pi r^2$$

**Step 4:** Apply Gauss's Law:
$$\oint_S \mathbf{E} \cdot d\mathbf{S} = \frac{q_{enclosed}}{\varepsilon_0}$$

**Step 5:** Since charge q is at center:
$$E \times 4\pi r^2 = \frac{q}{\varepsilon_0}$$

**Step 6:** Solve for E:
$$E = \frac{q}{4\pi\varepsilon_0 r^2} = \frac{kq}{r^2}$$

**Step 7:** Force on test charge q₀:
$$F = q_0 E = \frac{kq q_0}{r^2}$$

> [!KEY-STEP]
> This derivation shows that Gauss's Law → Coulomb's Law for point charges, proving their mathematical consistency.

---

## Derivation 2: Electric Field on Axis of Dipole

### For Point P on Axis at Distance r from Center (r >> a)

**Given:** Charges +q and -q separated by distance 2a

**To Find:** Electric field at point P on axis

**Derivation:**

**Step 1:** Let P be on the side of +q charge. Distance from +q to P = r - a
Distance from -q to P = r + a

**Step 2:** Electric field at P due to +q (radially outward along axis):
$$E_+ = \frac{kq}{(r-a)^2} \quad \text{(direction: from -q toward +q)}$$

**Step 3:** Electric field at P due to -q (radially inward, but since -q is behind +q, direction is from P toward -q):
$$E_- = \frac{kq}{(r+a)^2} \quad \text{(direction: toward -q)}$$

**Step 4:** Both fields point in same direction (along axis from center toward +q):
$$\mathbf{E} = E_+ + E_- = kq\left[\frac{1}{(r-a)^2} - \frac{1}{(r+a)^2}\right]\hat{p}$$

**Step 5:** Combine fractions:
$$\frac{1}{(r-a)^2} - \frac{1}{(r+a)^2} = \frac{(r+a)^2 - (r-a)^2}{(r^2-a^2)^2}$$

**Step 6:** Expand numerator:
$$(r^2 + 2ar + a^2) - (r^2 - 2ar + a^2) = 4ar$$

**Step 7:** Therefore:
$$E = kq \cdot \frac{4ar}{(r^2-a^2)^2} = \frac{4kar}{(r^2-a^2)^2}$$

**Step 8:** For r >> a, r² - a² ≈ r²:
$$E \approx \frac{4kar}{r^4} = \frac{4kaq \cdot a}{r^3}$$

**Step 9:** Define dipole moment p = q × 2a:
$$E = \frac{2ka \cdot 2aq}{r^3} = \frac{2p}{4\pi\varepsilon_0 r^3}$$

> [!FINAL-RESULT]
> **On axial line (r >> a):** $\mathbf{E} = \frac{2\mathbf{p}}{4\pi\varepsilon_0 r^3}$

---

## Derivation 3: Electric Field on Equatorial Plane of Dipole

### For Point P on Perpendicular Bisector at Distance r from Center (r >> a)

**Given:** Same dipole configuration

**To Find:** Electric field at point P on equatorial plane

**Derivation:**

**Step 1:** By symmetry, E from +q and -q have equal perpendicular components that cancel. Parallel components add.

**Step 2:** Distance from each charge to P:
$$r' = \sqrt{r^2 + a^2}$$

**Step 3:** Magnitude of field from each charge:
$$E_+ = E_- = \frac{kq}{r^2 + a^2}$$

**Step 4:** Each field makes angle θ with axis, where:
$$\cos\theta = \frac{a}{\sqrt{r^2 + a^2}}$$

**Step 5:** Component along axis (opposite to dipole moment):
$$E_{parallel} = 2 \times E_+ \times \cos\theta = 2 \times \frac{kq}{r^2 + a^2} \times \frac{a}{\sqrt{r^2 + a^2}}$$

**Step 6:**
$$E_{parallel} = \frac{2kaq}{(r^2 + a^2)^{3/2}}$$

**Step 7:** For r >> a:
$$E \approx \frac{2kaq}{r^3} = \frac{p}{4\pi\varepsilon_0 r^3}$$

> [!FINAL-RESULT]
> **On equatorial plane (r >> a):** $\mathbf{E} = -\frac{\mathbf{p}}{4\pi\varepsilon_0 r^3}$ (opposite to dipole moment)

---

## Derivation 4: Field Due to Infinite Wire using Gauss's Law

### To Find: Electric Field at Distance r from Infinite Wire

**Given:** Infinite wire with linear charge density λ (C/m)

**Derivation:**

**Step 1:** Choose cylindrical Gaussian surface of radius r and length L, coaxial with wire.

**Step 2:** By symmetry, E is radial and constant on curved surface.

**Step 3:** Calculate flux through different parts:
- Curved surface: $\phi_{curved} = E \times (2\pi r L)$
- End caps: $\phi_{caps} = 0$ (E perpendicular to normal)

**Step 4:** Total flux:
$$\phi = E \times 2\pi r L$$

**Step 5:** Charge enclosed:
$$q_{enclosed} = \lambda L$$

**Step 6:** Apply Gauss's Law:
$$E \times 2\pi r L = \frac{\lambda L}{\varepsilon_0}$$

**Step 7:** Solve:
$$E = \frac{\lambda}{2\pi\varepsilon_0 r}$$

> [!FINAL-RESULT]
> **Field due to infinite wire:** $\mathbf{E} = \frac{\lambda}{2\pi\varepsilon_0 r}\hat{n}$

> [!KEY-INSIGHT]
> Unlike point charge (E ∝ 1/r²), wire gives E ∝ 1/r. This is a key distinction tested in JEE.

---

## Derivation 5: Field Due to Infinite Plane Sheet

### To Find: Electric Field Due to Infinite Uniformly Charged Sheet

**Given:** Infinite sheet with surface charge density σ (C/m²)

**Derivation:**

**Step 1:** By symmetry, field must be perpendicular to sheet, same magnitude on both sides.

**Step 2:** Choose pillbox (cylindrical Gaussian surface) with cross-section A, cut through sheet.

**Step 3:** Flux through surfaces:
- Face 1 (right): $\phi_1 = EA$ (E outward)
- Face 2 (left): $\phi_2 = EA$ (E outward, opposite direction)
- Curved surface: $\phi_{curved} = 0$ (E ⟂ normal)

**Step 4:** Total flux:
$$\phi = EA + EA = 2EA$$

**Step 5:** Charge enclosed:
$$q_{enclosed} = \sigma A$$

**Step 6:** Apply Gauss's Law:
$$2EA = \frac{\sigma A}{\varepsilon_0}$$

**Step 7:** Solve:
$$E = \frac{\sigma}{2\varepsilon_0}$$

> [!FINAL-RESULT]
> **Field due to infinite sheet:** $\mathbf{E} = \frac{\sigma}{2\varepsilon_0}\hat{n}$

> [!IMPORTANT]
> **Field is constant (independent of distance!)** - true only for ideal infinite sheet. For finite sheets, field decreases with distance.

---

## Derivation 6: Field Due to Charged Spherical Shell

### Case (a): Outside the Shell (r > R)

**Step 1:** By spherical symmetry, E is radial, magnitude constant on sphere of radius r.

**Step 2:** Choose Gaussian sphere of radius r > R.
$$\phi = E \times 4\pi r^2$$

**Step 3:** Charge enclosed = total charge on shell = q
$$E \times 4\pi r^2 = \frac{q}{\varepsilon_0}$$

**Step 4:**
$$E = \frac{q}{4\pi\varepsilon_0 r^2} = \frac{kq}{r^2}$$

> **Outside:** $E = \frac{kQ}{r^2}$ (like point charge)

---

### Case (b): Inside the Shell (r < R)

**Step 1:** Choose Gaussian sphere of radius r < R inside shell.

**Step 2:** Charge enclosed = 0 (shell is hollow, charge on surface)
$$\phi = E \times 4\pi r^2 = 0$$

**Step 3:**
$$E = 0$$

> **Inside:** $E = 0$ everywhere

---

## Derivation 7: Torque on Dipole in Uniform Field

### To Find: Torque on Electric Dipole in Uniform Field

**Given:** Dipole with moment p = q(2a) in uniform field E, making angle θ with field.

**Derivation:**

**Step 1:** Forces on charges:
- +q experiences: $\mathbf{F}_+ = q\mathbf{E}$ (along field direction)
- -q experiences: $\mathbf{F}_- = -q\mathbf{E}$ (opposite to field)

**Step 2:** These equal and opposite forces form a couple (force pair with moment arm).

**Step 3:** Perpendicular distance between forces:
$$d = 2a \sin\theta$$

**Step 4:** Magnitude of torque = Force × perpendicular distance
$$\tau = F \times d = qE \times (2a \sin\theta)$$

**Step 5:**
$$\tau = (q \cdot 2a)E \sin\theta = pE \sin\theta$$

**Step 6:** Vector form:
$$\boldsymbol{\tau} = \mathbf{p} \times \mathbf{E}$$

> [!FINAL-RESULT]
> **Torque:** $\tau = pE\sin\theta$ (maximum at θ = 90°)

---

## Derivation 8: Potential Energy of Dipole in Uniform Field

### To Find: Potential Energy U of Dipole in Uniform Field

**Derivation Method 1: Work Done**

**Step 1:** Work done to rotate dipole from θ₁ to θ₂:
$$W = \int_{\theta_1}^{\theta_2} \tau \, d\theta = \int_{\theta_1}^{\theta_2} pE\sin\theta \, d\theta$$

**Step 2:**
$$W = pE[-\cos\theta]_{\theta_1}^{\theta_2} = pE(\cos\theta_1 - \cos\theta_2)$$

**Step 3:** If θ₁ = θ, θ₂ = 0 (aligned):
$$W = pE(\cos\theta - 1)$$

**Step 4:** Taking reference at θ = 90° (U = 0):
$$U = -W = -pE\cos\theta = -\mathbf{p} \cdot \mathbf{E}$$

> [!FINAL-RESULT]
> **Potential Energy:** $U = -pE\cos\theta = -\mathbf{p} \cdot \mathbf{E}$

> [!INTERPRETATION]
> - θ = 0°: U = -pE (minimum, stable)
> - θ = 90°: U = 0
> - θ = 180°: U = +pE (maximum, unstable)

---

## Derivation 9: Flux Through Sphere Due to Point Charge

### To Find: Electric Flux Through Sphere Due to Point Charge q at Center

**Derivation:**

**Step 1:** At any point on sphere, E is perpendicular to surface.
$$\phi = \oint E \cdot dS = E \times S$$

**Step 2:** E at distance r from charge q:
$$E = \frac{kq}{r^2}$$

**Step 3:** Surface area of sphere:
$$S = 4\pi r^2$$

**Step 4:**
$$\phi = \frac{kq}{r^2} \times 4\pi r^2 = 4\pi kq = \frac{q}{\varepsilon_0}$$

> [!KEY-RESULT]
> **Flux = q/ε₀** - independent of sphere radius! This is the essence of Gauss's Law.

---

## Derivation 10: Field on Axis of Charged Ring

### To Find: Electric Field at Point P on Axis of Uniformly Charged Ring

**Given:** Ring of radius R carrying charge Q uniformly distributed

**Derivation:**

**Step 1:** Consider small element dl at angle θ on ring.
Charge on element: $dq = \lambda dl = \frac{Q}{2\pi R} dl$

**Step 2:** Distance from element to point P on axis:
$$r = \sqrt{R^2 + x^2}$$

**Step 3:** Field due to element at P:
$$dE = \frac{k \, dq}{R^2 + x^2}$$

**Step 4:** By symmetry, perpendicular components cancel. Axial component:
$$dE_x = dE \cdot \cos\alpha = \frac{k \, dq}{R^2 + x^2} \cdot \frac{x}{\sqrt{R^2 + x^2}}$$

**Step 5:** Integrate around ring:
$$E_x = \int dE_x = \frac{kx}{(R^2 + x^2)^{3/2}} \int dq = \frac{kQx}{(R^2 + x^2)^{3/2}}$$

> [!FINAL-RESULT]
> **On axis of ring:** $E_x = \frac{kQx}{(R^2 + x^2)^{3/2}}$

> [!SPECIAL-CASE]
> At center (x = 0): E = 0. At large x (x >> R): E ≈ kQ/x² (like point charge).

---

## Derivation 11: Electric Field Inside Solid Sphere (Uniform Volume Density)

### To Find: E at Distance r < R from Center

**Derivation:**

**Step 1:** Consider Gaussian sphere of radius r < R.
$$\phi = E \times 4\pi r^2$$

**Step 2:** Volume charge density:
$$\rho = \frac{Q}{\frac{4}{3}\pi R^3}$$

**Step 3:** Charge enclosed in Gaussian sphere:
$$q_{enc} = \rho \times \frac{4}{3}\pi r^3 = \frac{Qr^3}{R^3}$$

**Step 4:** Apply Gauss's Law:
$$E \times 4\pi r^2 = \frac{Qr^3}{\varepsilon_0 R^3}$$

**Step 5:**
$$E = \frac{Qr}{4\pi\varepsilon_0 R^3}$$

> [!KEY-RESULT]
> **Inside solid sphere:** E ∝ r (increases linearly from center)

---

## Summary Table of Derived Results

| Charge Distribution | Outside | Inside |
|---------------------|---------|--------|
| Point charge | E ∝ 1/r² | N/A |
| Infinite wire | E ∝ 1/r | N/A |
| Infinite plane | E = constant | N/A |
| Spherical shell | E = kQ/r² | E = 0 |
| Solid sphere | E = kQ/r² | E ∝ r |

---

*Master these derivations. JEE often asks derivations or parts of them.*

*Tags: #Derivations #GaussLaw #Dipole #JEE-Advanced #NCERT*