# Gauss's Law and Applications
#JEE #JEEAdvanced #Class12 #Electrostatics #GaussLaw

---

## 8.1 Statement of Gauss's Law

### The Law

> [!KEY-LAW]
> **The total electric flux through any closed surface is equal to $\frac{1}{\varepsilon_0}$ times the total charge enclosed by the surface.**

$$\boxed{\oint_S \mathbf{E} \cdot d\mathbf{S} = \frac{q_{enclosed}}{\varepsilon_0}}$$

### Key Points
- $S$ is any **closed surface** (Gaussian surface)
- $q_{enclosed}$ is total charge **inside** the surface
- Works for any shape of closed surface
- $\varepsilon_0$ is permittivity of free space

---

## 8.2 Derivation of Gauss's Law

### Step 1: Flux Through Small Surface Element

Consider a point charge q at O. Draw a small area $dS$ on sphere of radius r.

The flux through this element:
$$d\phi = \mathbf{E} \cdot d\mathbf{S} = \frac{kq}{r^2} \cdot dS \cdot \cos\theta$$

Since normal is along radial direction, $\cos\theta = 1$:

$$d\phi = \frac{kq}{r^2} dS$$

### Step 2: Relate to Solid Angle

Solid angle subtended by $dS$ at O:
$$d\Omega = \frac{dS}{r^2}$$

Therefore:
$$d\phi = kq \cdot d\Omega$$

### Step 3: Integrate Over Complete Sphere

Total flux through sphere of radius r:
$$\phi = kq \int d\Omega = kq \cdot 4\pi = \frac{q}{4\pi\varepsilon_0} \cdot 4\pi = \frac{q}{\varepsilon_0}$$

### Generalization
- Works for any closed surface (not just sphere)
- Surface can enclose multiple charges
- For multiple charges: $q_{enclosed} = \sum q_i$

---

## 8.3 Key Implications

### Implication 1: Flux Depends Only on Enclosed Charge
- Position of charge inside surface doesn't matter
- External charges affect field but not **net flux** through surface

### Implication 2: Inverse Square Law Connection
- If Coulomb's law had exponent not exactly 2, Gauss's Law would be violated
- Gauss's Law is consequence of $1/r^2$ dependence
- Experimental verification of Gauss's Law confirms inverse-square law

### Implication 3: Electric Field from Symmetry
- Gauss's Law converts flux integral to field times area
- Only works when symmetry allows constant field over surface

---

## 8.4 Choosing a Gaussian Surface

### Requirements for Easy Application
1. **High symmetry:** Field magnitude constant on surface
2. **Normal to surface is parallel or perpendicular to E:** Makes dot product simple
3. **Surface passes through region of interest**

### Symmetry Types

| Charge Distribution | Gaussian Surface |
|---------------------|------------------|
| Point charge | Sphere centered on charge |
| Infinite wire | Cylinder around wire |
| Infinite plane | Pillbox (cylinder between planes) |
| Spherical shell/solid | Concentric sphere |

---

## 8.5 Application 1: Field Due to Infinite Wire

### Setup
- Infinite straight wire with linear charge density $\lambda$ (C/m)
- Wire along z-axis
- Cylindrical symmetry

### Symmetry Argument
- Field must be **radial** (perpendicular to wire)
- Magnitude depends only on perpendicular distance r
- Field same at all points at same r on cylinder

### Gaussian Surface
Choose cylinder of radius r, length l centered on wire.

### Flux Calculation

**Curved surface:**
- $\mathbf{E}$ parallel to $d\mathbf{S}$ everywhere
- $\phi_{curved} = E \cdot (2\pi r l)$

**End caps:**
- $\mathbf{E}$ perpendicular to $d\mathbf{S}$
- $\phi_{ends} = 0$

**Total flux:** $\phi = E \cdot 2\pi r l$

### Apply Gauss's Law

$$\phi = \frac{q_{enclosed}}{\varepsilon_0} = \frac{\lambda l}{\varepsilon_0}$$

Therefore:
$$E \cdot 2\pi r l = \frac{\lambda l}{\varepsilon_0}$$

$$\boxed{E = \frac{\lambda}{2\pi\varepsilon_0 r}}$$

**Vector form:**
$$\mathbf{E} = \frac{\lambda}{2\pi\varepsilon_0 r}\hat{n}$$

Where $\hat{n}$ is radial unit vector perpendicular to wire.

> [!KEY-RESULT]
> **Field near infinite wire:** $E \propto 1/r$ (not $1/r^2$!)

---

## 8.6 Application 2: Field Due to Infinite Plane Sheet

### Setup
- Infinite flat sheet with uniform surface charge density $\sigma$ (C/m²)
- Sheet in xy-plane
- Planar symmetry

### Symmetry Argument
- Field must be **perpendicular to sheet** (no component in plane)
- Magnitude same on both sides at equal distance
- Field points away from sheet (both sides)

### Gaussian Surface
Choose **pillbox** (cylinder cut through sheet):
- Area A for each circular face
- Height h (small, but cancels out)

### Flux Calculation

**Two circular faces:**
- Face 1: $\phi_1 = EA$ (E outward)
- Face 2: $\phi_2 = EA$ (E outward, opposite direction)

**Curved surface:**
- $\mathbf{E}$ perpendicular to surface normal
- $\phi_{curved} = 0$

**Total flux:** $\phi = EA + EA = 2EA$

### Apply Gauss's Law

$$2EA = \frac{q_{enclosed}}{\varepsilon_0} = \frac{\sigma A}{\varepsilon_0}$$

$$\boxed{E = \frac{\sigma}{2\varepsilon_0}}$$

**Vector form:**
$$\mathbf{E} = \frac{\sigma}{2\varepsilon_0}\hat{n}$$

Where $\hat{n}$ is unit vector **perpendicular to sheet** (away from it).

> [!KEY-RESULT]
> **Field near infinite sheet:** E is **constant** (independent of distance!) — true for ideal infinite sheet.

---

## 8.7 Application 3: Field Due to Charged Spherical Shell

### Setup
- Spherical shell of radius R
- Total charge q uniformly distributed on surface
- Surface charge density $\sigma = q/4\pi R^2$

### Case 1: Outside the Shell (r > R)

**Gaussian surface:** Sphere of radius r

**Flux:** $\phi = E \times 4\pi r^2$

**Charge enclosed:** q (all charge is on shell, which is inside r)

**Gauss's Law:**
$$E \cdot 4\pi r^2 = \frac{q}{\varepsilon_0}$$

$$E = \frac{q}{4\pi\varepsilon_0 r^2}$$

$$\boxed{\mathbf{E} = \frac{kq}{r^2}\hat{r} \quad (r > R)}$$

> [!IMPORTANT]
> **Outside shell: field is as if all charge concentrated at center**

### Case 2: Inside the Shell (r < R)

**Gaussian surface:** Sphere of radius r (inside shell)

**Charge enclosed:** 0 (shell is hollow)

**Flux:** $\phi = E \times 4\pi r^2$

**Gauss's Law:**
$$E \cdot 4\pi r^2 = 0$$

$$\boxed{E = 0 \quad (r < R)}$$

> [!IMPORTANT]
> **Inside shell: E = 0 everywhere** — this is a unique property of spherical shells.

---

## 8.8 Application 4: Solid Sphere with Uniform Volume Charge

### Setup
- Solid sphere of radius R
- Volume charge density $\rho$ (C/m³)
- Total charge $q = \rho \times \frac{4}{3}\pi R^3$

### Case 1: Outside (r > R)

Same as spherical shell:
$$E = \frac{kq}{r^2}$$

### Case 2: Inside (r < R)

**Gaussian surface:** Sphere of radius r

**Charge enclosed:**
$$q_{enc} = \rho \times \frac{4}{3}\pi r^3$$

**Flux:** $\phi = E \times 4\pi r^2$

**Gauss's Law:**
$$E \cdot 4\pi r^2 = \frac{\rho \cdot \frac{4}{3}\pi r^3}{\varepsilon_0}$$

$$E = \frac{\rho r}{3\varepsilon_0} = \frac{qr}{4\pi\varepsilon_0 R^3}$$

$$\boxed{E = \frac{kqr}{R^3} \quad (r < R)}$$

**Result:** Inside solid sphere, E increases linearly with r.

---

## 8.9 Summary: Field Formulas from Gauss's Law

| Charge Distribution | Outside (r > R) | Inside (r < R) |
|-------------------|-----------------|----------------|
| Point charge | $E = \frac{kq}{r^2}$ | Not applicable |
| Infinite wire | $E = \frac{\lambda}{2\pi\varepsilon_0 r}$ | Not applicable |
| Infinite sheet | $E = \frac{\sigma}{2\varepsilon_0}$ | Not applicable |
| Spherical shell | $E = \frac{kq}{r^2}$ | $E = 0$ |
| Solid sphere | $E = \frac{kq}{r^2}$ | $E = \frac{kqr}{R^3}$ |

---

## 8.10 Worked Examples

### Example 1: Linear charge density from field
**Problem:** Field from infinite wire is $9 \times 10^4$ N/C at 2 cm. Find linear charge density.

**Solution:**

$$E = \frac{\lambda}{2\pi\varepsilon_0 r}$$

$$\lambda = E \times 2\pi\varepsilon_0 r = 9 \times 10^4 \times 2\pi \times 8.85 \times 10^{-12} \times 0.02$$

$$\lambda = 10^{-6} \text{ C/m} = 1 \mu\text{C/m}$$

---

### Example 2: Two parallel sheets
**Problem:** Two large parallel sheets have surface charge densities $+\sigma$ and $-\sigma$. Find field in regions: (a) between sheets, (b) outside sheets.

**Solution:**

**Field from single sheet:** $\frac{\sigma}{2\varepsilon_0}$ (points away if +, toward if -)

**(a) Between sheets:**
- Left sheet (+): E to left
- Right sheet (-): E to left
- Net E = $\frac{\sigma}{2\varepsilon_0} + \frac{\sigma}{2\varepsilon_0} = \frac{\sigma}{\varepsilon_0}$ (to left)

**(b) Outside (left side):**
- E from + sheet: to left
- E from - sheet: to left (because toward - means left)
- Net E = $\frac{\sigma}{\varepsilon_0}$ (to left)

**All three regions have same field magnitude!** Direction differs.

> [!KEY-INSIGHT]
> Between two equal and opposite infinite sheets: Uniform field E = σ/ε₀ (anywhere, as long as both sheets extend infinitely)

---

### Example 3: Shell with off-center charge
**Problem:** Point charge +q at center of neutral conducting shell of radius R. Find E at distance r.

**Solution:**

**Inside charge region:**
- Gaussian surface inside conductor
- $q_{enc} = 0$ (inside metal, charge resides on inner surface)
- $E = 0$ (inside conducting material)

**Outside shell:**
- Gaussian surface radius r > R
- Total enclosed charge = q (inside shell) + induced charge on shell = 0 + q = q
- $E = \frac{kq}{r^2}$ (points outward)

---

## 8.11 Limitations of Gauss's Law

### When Gauss's Law is Useful
- Charge distribution has symmetry
- We can find surface where E is constant

### When Gauss's Law is NOT Useful
- No symmetry (e.g., dipole)
- Need to know E to compute flux (circular reasoning)
- Must use direct integration or numerical methods

---

## 8.12 Common Mistakes

### Mistake 1: Using wrong Gaussian surface
**Remember:** Choose surface where E is constant on it.

### Mistake 2: Including charges outside surface
**Only count charge inside your Gaussian surface.**

### Mistake 3: Forgetting direction of E for sheets
**E points away from + sheet, toward - sheet.**

### Mistake 4: Using E = σ/ε₀ for finite sheets
**Only true for infinitely large sheets.** For finite sheets, field decreases with distance.

---

## 8.13 JEE Advanced Patterns

### Pattern 1: Non-standard Gaussian surfaces
- Sometimes need creative surfaces
- Key: flux through parts may be zero

### Pattern 2: Multiple layers
- Conducting shells with multiple charges
- Apply Gauss's law in each region

### Pattern 3: Force on charged particle near shell
- Use E from Gauss's Law
- Apply F = qE

### Pattern 4: Energy using E from Gauss's Law
- Integrate potential energy or use work-energy

---

## Formula Summary

| Gaussian Surface | Field Formula |
|------------------|---------------|
| Sphere (outside) | $E = \frac{q}{4\pi\varepsilon_0 r^2}$ |
| Cylinder (wire) | $E = \frac{\lambda}{2\pi\varepsilon_0 r}$ |
| Pillbox (sheet) | $E = \frac{\sigma}{2\varepsilon_0}$ |

---

## Next Topic
→ Proceed to [[Continuous Charge Distributions]] for advanced problems.

---

*Tags: #GaussLaw #GaussianSurface #Symmetry #Applications #JEEAdvanced*