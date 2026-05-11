# Continuous Charge Distributions
#JEE #Class12 #Electrostatics #ChargeDensity

---

## 9.1 From Discrete to Continuous

### Discrete Charges
Earlier we dealt with point charges $q_1, q_2, q_3, \ldots$

**Field calculation:**
$$\mathbf{E} = \sum_{i} \frac{k q_i}{r_i^2}\hat{r}_i$$

### Why Continuous Distributions?
- Large charged bodies cannot be treated as point charges
- Charge is actually quantized (electrons), but macroscopic scale sees continuity
- Similar to mass distribution in mechanics

---

## 9.2 Types of Charge Distributions

### Linear Charge Density (λ)
For charge distributed along a line (wire, rod):

$$\lambda = \frac{dq}{dl}$$

**Units:** C/m

**Charge on element dl:** $dq = \lambda \, dl$

### Surface Charge Density (σ)
For charge distributed on a surface (plate, sphere):

$$\sigma = \frac{dq}{dS}$$

**Units:** C/m²

**Charge on element dS:** $dq = \sigma \, dS$

### Volume Charge Density (ρ)
For charge distributed in volume (solid sphere, cylinder):

$$\rho = \frac{dq}{dV}$$

**Units:** C/m³

**Charge in element dV:** $dq = \rho \, dV$

---

## 9.3 Calculating Field from Continuous Distribution

### General Procedure

**Step 1:** Divide charge distribution into small elements $dq$

**Step 2:** Write field due to $dq$ at point P:
$$d\mathbf{E} = \frac{k \, dq}{r^2}\hat{r}$$

**Step 3:** Choose coordinate system and express $dq$ in terms of variables

**Step 4:** Identify limits of integration

**Step 5:** Integrate:
$$\mathbf{E} = \int d\mathbf{E}$$

### Types of Integrals
- **Line integral** for linear charge
- **Surface integral** for surface charge
- **Volume integral** for volume charge

---

## 9.4 Linear Charge Distribution Examples

### Example 1: Charged Ring

**Setup:**
- Ring of radius R
- Total charge Q uniformly distributed
- Linear charge density: $\lambda = \frac{Q}{2\pi R}$

**Find field on axis:**

**Charge element:** $dq = \lambda \, dl = \lambda R \, d\theta$

**Field from element:**
$$dE = \frac{k \, dq}{r^2} = \frac{k \lambda R \, d\theta}{(R^2 + x^2)}$$

**Component along axis:** $dE_x = dE \cdot \cos\alpha = dE \cdot \frac{x}{\sqrt{R^2 + x^2}}$

**Integrate:**
$$E_x = \int dE_x = \frac{k \lambda R x}{(R^2 + x^2)^{3/2}} \int_0^{2\pi} d\theta = \frac{k Q x}{(R^2 + x^2)^{3/2}}$$

> [!KEY-RESULT]
> **Field on axis of charged ring:**
> $$E = \frac{kQx}{(R^2 + x^2)^{3/2}}$$
> At center (x = 0): E = 0

---

### Example 2: Finite Straight Wire

**Setup:**
- Wire of length 2L along y-axis
- Total charge Q
- Linear charge density $\lambda = Q/2L$

**Find field at point P (distance a from wire on perpendicular bisector):**

This requires integration over the wire length.

Due to symmetry:
- $E_y$ components cancel
- Only $E_x$ components add

$$E_x = \int_{-L}^{L} \frac{k \lambda \, dy}{a^2 + y^2} \cdot \frac{a}{\sqrt{a^2 + y^2}}$$

$$E_x = \frac{2k\lambda L}{a\sqrt{a^2 + L^2}} = \frac{kQ}{a\sqrt{a^2 + L^2}}$$

**Special case: Infinite wire (L → ∞)**
$$E_x = \frac{2k\lambda}{a} = \frac{\lambda}{2\pi\varepsilon_0 a}$$

This matches Gauss's Law result!

---

## 9.5 Surface Charge Distribution Examples

### Example 3: Charged Disc

**Setup:**
- Disc of radius R
- Surface charge density σ
- Total charge $Q = \sigma \pi R^2$

**Find field on axis:**

**Ring of radius r, width dr:**
- Area: $dS = 2\pi r \, dr$
- Charge: $dq = \sigma \cdot 2\pi r \, dr$

**Field from ring:**
$$dE = \frac{k \, dq}{(r^2 + x^2)} = \frac{k \sigma \cdot 2\pi r \, dr}{(r^2 + x^2)}$$

**Along axis component:**
$$dE_x = dE \cdot \frac{x}{\sqrt{r^2 + x^2}}$$

$$E_x = \int_0^R \frac{2\pi k \sigma x r \, dr}{(r^2 + x^2)^{3/2}}$$

**Result:**
$$E_x = 2\pi k \sigma \left(1 - \frac{x}{\sqrt{R^2 + x^2}}\right)$$

Or using $\sigma/2\varepsilon_0$:

$$E = \frac{\sigma}{2\varepsilon_0}\left(1 - \frac{x}{\sqrt{R^2 + x^2}}\right)$$

> [!KEY-RESULT]
> **Limiting cases:**
> - Near disc (x << R): $E \approx \frac{\sigma}{2\varepsilon_0}$ (like infinite sheet)
> - Far from disc (x >> R): $E \approx \frac{kQ}{x^2}$ (like point charge)

---

### Example 4: Two Parallel Charged Plates

**Setup:**
- Two large parallel plates
- Surface charge densities $\sigma_1$ and $\sigma_2$

**Field calculation:**

Using superposition of fields from each sheet:

| Region | Net Field |
|--------|----------|
| Right of both | $\frac{\sigma_1 - \sigma_2}{2\varepsilon_0}$ |
| Between plates | $\frac{\sigma_1 + \sigma_2}{2\varepsilon_0}$ |
| Left of both | $\frac{-\sigma_1 + \sigma_2}{2\varepsilon_0}$ |

**Special case: Equal and opposite charges**
- $\sigma_1 = +\sigma$, $\sigma_2 = -\sigma$
- Between plates: $E = \sigma/\varepsilon_0$
- Outside: $E = 0$

---

## 9.6 Volume Charge Distribution Examples

### Example 5: Uniformly Charged Solid Sphere

**Setup:**
- Solid sphere radius R
- Volume charge density ρ
- Total charge $Q = \rho \frac{4}{3}\pi R^3$

**Field inside (r < R):**
$$E = \frac{\rho r}{3\varepsilon_0} = \frac{Qr}{4\pi\varepsilon_0 R^3}$$

**Field outside (r > R):**
$$E = \frac{Q}{4\pi\varepsilon_0 r^2}$$

> [!ANALOGY]
> This is exactly like gravitational field of uniform sphere (Newton's shell theorem).

---

## 9.7 Integration Strategy

### For Linear Charge
$$dq = \lambda \, dl$$
$$\mathbf{E} = \int \frac{k \, dq}{r^2}\hat{r}$$

**Coordinate choice:** Along the line (use θ, x, or y as variable)

### For Surface Charge
$$dq = \sigma \, dS$$
$$\mathbf{E} = \int \frac{k \, dq}{r^2}\hat{r}$$

**Coordinate choice:** Polar coordinates on surface

### For Volume Charge
$$dq = \rho \, dV$$
$$\mathbf{E} = \int \frac{k \, dq}{r^2}\hat{r}$$

**Coordinate choice:** Spherical, cylindrical, or Cartesian depending on shape

---

## 9.8 Symmetry Exploitation

### Cylindrical Symmetry
- Use cylindrical coordinates (r, θ, z)
- E has only radial component (depends only on r and z)
- dV = r dr dθ dz

### Spherical Symmetry
- Use spherical coordinates (r, θ, φ)
- E is radial (depends only on r)
- dV = r² sinθ dr dθ dφ

### Planar Symmetry
- Use Cartesian
- E is along one axis
- dS = dx dy

---

## 9.9 Common Integration Mistakes

### Mistake 1: Wrong element size
**For ring:** $dq = \lambda \cdot Rd\theta$, not $Rd\theta$
**For disc:** $dq = \sigma \cdot 2\pi r dr$, not $2\pi r dr$

### Mistake 2: Forgetting projection
**Must multiply by cosθ** when taking component along desired direction.

### Mistake 3: Wrong limits
**Ring:** θ from 0 to 2π
**Disc:** r from 0 to R
**Semicircle:** θ from 0 to π

### Mistake 4: Wrong distance
**r** in formula is distance from element to point P, not coordinate!

---

## 9.10 Summary Table

| Distribution | Element | Formula |
|--------------|---------|---------|
| Ring | Arc length | $dq = \lambda R d\theta$ |
| Disc | Ring | $dq = \sigma \cdot 2\pi r dr$ |
| Sphere | Shell | $dq = \rho \cdot 4\pi r^2 dr$ |
| Cylinder | Shell | $dq = \rho \cdot 2\pi r L dr$ |

---

## 9.11 Special Cases and Limits

| Situation | Approximation |
|-----------|---------------|
| Very far from any finite charge | Point charge |
| Very close to large charged surface | Infinite plane |
| Very close to long wire | Infinite line |
| Large disc at center | Charged plane |

These correspond to Gauss's Law applications!

---

## Next Topic
→ Proceed to [[Formula Cheat Sheet]] for quick revision.

---

*Tags: #ContinuousCharge #Integration #LinearDensity #SurfaceDensity #VolumeDensity #JEE*