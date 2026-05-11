# Electric Flux
#JEE #Class12 #Electrostatics #GaussLaw #ElectricFlux

---

## 6.1 Physical Meaning of Electric Flux

### Analogy with Fluid Flow
Think of water flowing through a net:
- **Flux** = Amount of water passing through net per unit time
- Depends on: water speed, net area, angle of net relative to flow

### Electric Analogy
**Electric flux** = "Amount" of electric field passing through a surface

- Depends on: Field magnitude (E), Surface area (A), Orientation (angle between E and normal)

> [!KEY-CONCEPT]
> Electric flux is a **scalar quantity** (dot product gives scalar), but it has sign based on orientation.

---

## 6.2 Definition of Electric Flux

### For Small Area Element $\Delta S$

$$\Delta \phi = \mathbf{E} \cdot \Delta \mathbf{S} = E \cdot \Delta S \cdot \cos\theta$$

Where:
- $\Delta \phi$ = flux through area element
- $\mathbf{E}$ = electric field vector
- $\Delta \mathbf{S} = \Delta S \hat{n}$ = area vector (perpendicular to surface)
- $\theta$ = angle between $\mathbf{E}$ and normal to surface

### For Complete Surface S

$$\phi = \sum \mathbf{E} \cdot \Delta \mathbf{S} \approx \oint_S \mathbf{E} \cdot d\mathbf{S}$$

As $\Delta S \to 0$, sum becomes surface integral.

---

## 6.3 Unit of Electric Flux

$$[\phi] = \text{N·m}^2/\text{C} = \text{V·m}$$

Where:
- N = Newton
- m = meter
- C = Coulomb
- V = Volt (J/C)

> [!NOTE]
> Flux has same unit as voltage × meter, which appears in many electromagnetic formulas.

---

## 6.4 Understanding the Dot Product

### When E is Perpendicular to Surface (θ = 0°)
$$\phi = E \cdot A \cdot \cos(0°) = EA$$

Maximum flux - all field lines pass through.

### When E is Parallel to Surface (θ = 90°)
$$\phi = E \cdot A \cdot \cos(90°) = 0$$

Zero flux - no field lines pass through.

### General Case (0° < θ < 90°)
$$\phi = EA\cos\theta = E \times (\text{projection of A perpendicular to E})$$

**Alternative view:** Flux = E × (area component normal to E)

---

## 6.5 Positive and Negative Flux

### Convention: Outward Normal
For **closed surfaces**, the area vector points **outward** (away from interior).

### Sign Interpretation
- **Positive flux:** More field lines leaving than entering
- **Negative flux:** More field lines entering than leaving
- **Net flux:** Difference between outgoing and incoming lines

**Physically:**
- Positive net flux → net positive charge inside (source of field lines)
- Negative net flux → net negative charge inside (sink for field lines)
- Zero net flux → no net charge inside

---

## 6.6 Flux Through Different Orientations

| Orientation | θ | cos θ | Flux φ |
|-------------|---|-------|--------|
| E ⟂ surface (normal) | 0° | +1 | +EA (max positive) |
| E at 60° to normal | 60° | +0.5 | +0.5 EA |
| E ∥ to surface | 90° | 0 | 0 |
| E at 120° to normal | 120° | -0.5 | -0.5 EA |
| E ⟂ surface (but opposite) | 180° | -1 | -EA (max negative) |

---

## 6.7 Flux Through Symmetrical Surfaces

### Example 1: Uniform Field Through Rectangle
**Problem:** E = 3×10³ î N/C. Rectangle 10 cm on side, plane parallel to yz-plane.

**Solution:**
Plane parallel to yz-plane → normal along x-axis
$$\phi = \mathbf{E} \cdot \mathbf{A} = (3 \times 10^3 \hat{i}) \cdot (0.1 \times 0.1 \hat{i}) = 30 \text{ N·m}^2/\text{C}$$

### Example 2: Inclined Rectangle
**Problem:** Same field, but normal makes 60° angle with x-axis.

**Solution:**
$$\phi = EA\cos\theta = 30 \times \cos(60°) = 30 \times 0.5 = 15 \text{ N·m}^2/\text{C}$$

---

## 6.8 Flux Through Cubical Surface

### Uniform Field Through Cube
When uniform E passes through a cube with faces parallel to axes:
- Flux through two faces perpendicular to x-direction
- Zero flux through faces parallel to x-direction (E perpendicular to their normals)
- **Net flux = 0** (for uniform field through closed box)

**Key insight:** Uniform field has equal entering and exiting flux for closed surface.

---

## 6.9 Non-Uniform Field Flux

### General Formula
$$\phi = \oint_S \mathbf{E} \cdot d\mathbf{S}$$

For non-uniform fields, we need to integrate over the surface.

### Example: Point Charge at Center of Sphere
**Problem:** Find flux through sphere of radius r enclosing point charge q at center.

**Solution:**
At any point on sphere: $\mathbf{E} = \frac{kq}{r^2}\hat{r}$
$d\mathbf{S} = r^2 \sin\theta \, d\theta \, d\phi \, \hat{r}$

$$\phi = \oint \frac{kq}{r^2} \hat{r} \cdot r^2 \sin\theta \, d\theta \, d\phi \, \hat{r} = kq \int_0^{2\pi} d\phi \int_0^\pi \sin\theta \, d\theta = \frac{q}{\varepsilon_0}$$

---

## 6.10 Flux Calculation Steps

**Step 1:** Identify the surface and its orientation

**Step 2:** Determine relationship between E and surface normal

**Step 3:** Calculate angle θ or check if E is constant or varying

**Step 4:** Apply formula:
- Constant E, flat surface: $\phi = EA\cos\theta$
- Varying E or curved surface: Integrate

**Step 5:** Consider sign convention for closed surfaces

---

## 6.11 Important Results

### Result 1: Flux Through Any Closed Surface
$$\oint_S \mathbf{E} \cdot d\mathbf{S} = \frac{q_{enclosed}}{\varepsilon_0}$$

(Gauss's Law - detailed in next topic)

### Result 2: Flux Through Sphere with Central Charge
$$\phi = \frac{q}{\varepsilon_0}$$

Independent of sphere radius!

### Result 3: Net Flux in Uniform Field (Closed Surface)
$$\phi = 0$$

(This holds for any closed surface in uniform field)

---

## 6.12 Worked Examples

### Example 1: Flux Through Square from Point Charge
**Problem:** Point charge +10 mC at 5 cm above center of 10 cm square. Find flux through square.

**Solution:**

**Method:** Consider square as one face of a cube with point charge at center.

Total flux from point charge q = q/ε₀

Since charge is symmetrically located, flux through each of 6 faces = q/6ε₀

$$\phi = \frac{10 \times 10^{-3}}{6 \times 8.85 \times 10^{-12}} = 1.88 \times 10^8 \text{ N·m}^2/\text{C}$$

---

### Example 2: Cube in Non-Uniform Field
**Problem:** $E_x = \alpha x^{1/2}$ where $\alpha = 800$ N/C·m$^{1/2}$. Cube has side 0.1 m.

**Solution:**

**Flux through left face (x = a):**
- $E = \alpha a^{1/2}$ (toward negative x)
- $\phi_L = -E \cdot A = -\alpha a^{1/2} \cdot a^2 = -\alpha a^{5/2}$

**Flux through right face (x = 2a):**
- $E = \alpha (2a)^{1/2}$ (toward positive x)
- $\phi_R = +E \cdot A = +\alpha (2a)^{1/2} \cdot a^2 = \alpha a^{5/2} \cdot 2^{1/2}$

**Net flux:**
$$\phi = \alpha a^{5/2}(\sqrt{2} - 1) = 800 \times (0.1)^{5/2} \times 0.414 = 1.05 \text{ N·m}^2/\text{C}$$

**Enclosed charge:**
$$q = \phi \varepsilon_0 = 9.27 \times 10^{-12} \text{ C}$$

---

## 6.13 Flux in Different Geometries

### Cylinder in Uniform Field
- End caps: Flux = EA (one positive, one negative)
- Curved surface: Zero flux (E perpendicular to normal)
- **Net flux = 0**

### Sphere with Point Charge Off-Center
- Flux still = q/ε₀ (independent of position inside)
- Distribution over surface is non-uniform

### Cubical Surface Crossing Field Source
- If charge outside: some faces have + flux, some - flux
- Net flux = 0 (no charge enclosed)

---

## 6.14 Common Mistakes

### Mistake 1: Forgetting to consider both sides
**Important:** Flat surface has TWO sides - flux contributions differ.

### Mistake 2: Not using outward normal for closed surfaces
**Rule:** Always use outward normal for closed surfaces. Inward gives negative flux.

### Mistake 3: Confusing flux with field
**Remember:** Flux is about a surface; field is about a point.

### Mistake 4: Wrong integration limits
For spherical surface: $\phi = 0$ to $2\pi$, $\theta = 0$ to $\pi$

---

## Formula Summary

| Situation | Flux Formula |
|-----------|-------------|
| Small area element | $\Delta\phi = \mathbf{E} \cdot \Delta\mathbf{S}$ |
| Flat surface, constant E | $\phi = EA\cos\theta$ |
| Closed surface (Gauss's Law) | $\phi = q/\varepsilon_0$ |
| Point charge at sphere center | $\phi = q/\varepsilon_0$ |
| Uniform field through closed surface | $\phi = 0$ |

---

## Next Topic
→ Proceed to [[Electric Dipole]] to understand two-charge systems.

---

*Tags: #ElectricFlux #GaussLaw #SurfaceIntegral #JEE #N/C*