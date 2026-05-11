# Formula Cheat Sheet - Electric Charges and Fields
#JEE #NCERT #Class12 #FormulaSheet #QuickRevision

---

## 1. Basic Charge Properties

| Formula | Description |
|---------|-------------|
| $q = ne$ | Charge quantisation (n = integer) |
| $e = 1.602 \times 10^{-19}$ C | Elementary charge |
| $q_{total} = q_1 + q_2 + \ldots$ | Additivity of charges |
| Conservation: $q_{initial} = q_{final}$ | Charge conservation |

---

## 2. Coulomb's Law

### Scalar Form
$$F = \frac{1}{4\pi\varepsilon_0} \cdot \frac{q_1 q_2}{r^2} = k\frac{|q_1 q_2|}{r^2}$$

### Vector Form
$$\mathbf{F}_{21} = \frac{k q_1 q_2}{r_{21}^2} \hat{\mathbf{r}}_{21}$$

### Constants
| Constant | Value |
|----------|-------|
| $k = \frac{1}{4\pi\varepsilon_0}$ | $9 \times 10^9$ N·m²/C² |
| $\varepsilon_0$ | $8.854 \times 10^{-12}$ C²/N·m² |

### In Medium
$$F = \frac{1}{4\pi\varepsilon} \cdot \frac{q_1 q_2}{r^2}, \quad \varepsilon = \varepsilon_0 \varepsilon_r$$

---

## 3. Electric Field

### Definition
$$\mathbf{E} = \lim_{q \to 0} \frac{\mathbf{F}}{q} = \frac{\mathbf{F}}{q}$$

### Unit: N/C or V/m

### Due to Point Charge
$$\mathbf{E} = \frac{kQ}{r^2}\hat{r}$$

### Force on Charge in Field
$$\mathbf{F} = q\mathbf{E}$$

### Superposition
$$\mathbf{E}_{total} = \mathbf{E}_1 + \mathbf{E}_2 + \ldots + \mathbf{E}_n$$

---

## 4. Electric Field of Special Distributions

### On Axis of Charged Ring
$$E_x = \frac{kQx}{(R^2 + x^2)^{3/2}}$$

### On Axis of Charged Disc
$$E = \frac{\sigma}{2\varepsilon_0}\left(1 - \frac{x}{\sqrt{R^2 + x^2}}\right)$$

### On Perpendicular Bisector of Dipole (r >> a)
$$E = \frac{p}{4\pi\varepsilon_0 r^3}$$

### On Axis of Dipole (r >> a)
$$E = \frac{2p}{4\pi\varepsilon_0 r^3}$$

---

## 5. Electric Dipole

### Dipole Moment
$$\mathbf{p} = q(2\mathbf{a}) = q \times 2a \, \hat{p}$$

Unit: C·m or Debye (1 D = $3.335 \times 10^{-30}$ C·m)

### Field on Axis
$$E_{axis} = \frac{2p}{4\pi\varepsilon_0 r^3} \quad (r \gg a)$$

### Field on Equatorial Plane
$$E_{equatorial} = \frac{p}{4\pi\varepsilon_0 r^3} \quad (r \gg a)$$

---

## 6. Dipole in Uniform Field

### Torque
$$\tau = pE\sin\theta = |\mathbf{p} \times \mathbf{E}|$$

### Potential Energy
$$U = -\mathbf{p} \cdot \mathbf{E} = -pE\cos\theta$$

### Equilibrium
- Stable: $\theta = 0°$ (U minimum)
- Unstable: $\theta = 180°$ (U maximum)

---

## 7. Electric Flux

### For Element
$$\Delta\phi = \mathbf{E} \cdot \Delta\mathbf{S} = E \cdot \Delta S \cos\theta$$

### Total (Surface Integral)
$$\phi = \oint_S \mathbf{E} \cdot d\mathbf{S}$$

Unit: N·m²/C = V·m

---

## 8. Gauss's Law

### Statement
$$\oint_S \mathbf{E} \cdot d\mathbf{S} = \frac{q_{enclosed}}{\varepsilon_0}$$

### Derivative Form
$$\nabla \cdot \mathbf{E} = \frac{\rho}{\varepsilon_0}$$

---

## 9. Applications of Gauss's Law

### Infinite Wire (Linear density λ)
$$E = \frac{\lambda}{2\pi\varepsilon_0 r}$$

Direction: Radial, perpendicular to wire

### Infinite Sheet (Surface density σ)
$$E = \frac{\sigma}{2\varepsilon_0}$$

Direction: Perpendicular to sheet, away from (+) sheet

### Charged Sphere (Shell)

| Region | Field |
|--------|-------|
| Outside (r > R) | $E = \frac{kQ}{r^2}$ |
| Inside (r < R) | $E = 0$ |

### Solid Sphere

| Region | Field |
|--------|-------|
| Outside (r > R) | $E = \frac{kQ}{r^2}$ |
| Inside (r < R) | $E = \frac{kQr}{R^3}$ |

---

## 10. Charge Densities

### Linear
$$\lambda = \frac{dq}{dl} \quad \text{(C/m)}$$

### Surface
$$\sigma = \frac{dq}{dS} \quad \text{(C/m}^2\text{)}$$

### Volume
$$\rho = \frac{dq}{dV} \quad \text{(C/m}^3\text{)}$$

---

## 11. Relationships

### Charge → Density → Field
$$q = \int dq, \quad dq = \lambda dl \text{ or } \sigma dS \text{ or } \rho dV$$
$$\mathbf{E} = \int \frac{k \, dq}{r^2}\hat{r}$$

### Flux → Charge
$$\phi_{enclosed} = \frac{q}{\varepsilon_0}$$

---

## 12. Quick Reference Table

| Physical Quantity | Symbol | SI Unit | Formula |
|-------------------|--------|---------|---------|
| Charge | q, Q | C (Coulomb) | ne |
| Linear charge density | λ | C/m | dq/dl |
| Surface charge density | σ | C/m² | dq/dS |
| Volume charge density | ρ | C/m³ | dq/dV |
| Electric field | E | N/C, V/m | F/q |
| Electric flux | φ | N·m²/C | E·S |
| Dipole moment | p | C·m | q×2a |
| Permittivity | ε₀ | C²/N·m² | $8.85 \times 10^{-12}$ |

---

## 13. Dimensional Analysis

| Quantity | Dimensions |
|----------|-----------|
| Force (F) | $[MLT^{-2}]$ |
| Charge (q) | $[AT]$ |
| Electric field (E) | $[MLT^{-3}A^{-1}]$ |
| Flux (φ) | $[ML^3T^{-3}A^{-1}]$ |
| Dipole moment (p) | $[LTA]$ |
| λ | $[TL^{-1}A]$ |
| σ | $[TL^{-2}A]$ |
| ρ | $[TL^{-3}A]$ |

---

## 14. Important Limits

| Situation | Approximation | Result |
|-----------|---------------|--------|
| r >> a (dipole) | Treat as point dipole | $E \propto 1/r^3$ |
| Very close to large surface | Treat as infinite plane | $E = \sigma/2\varepsilon_0$ |
| Very close to long wire | Treat as infinite line | $E \propto 1/r$ |
| R >> x (disc at center) | Treat as infinite plane | $E = \sigma/2\varepsilon_0$ |
| x >> R (disc far away) | Treat as point charge | $E = kQ/x^2$ |

---

## 15. Memory Tricks

### For Field Directions
- **Positive charge:** Arrows point OUTWARD (like sun rays)
- **Negative charge:** Arrows point INWARD (like rain)
- **Dipole:** Lines connect + to - (like a bridge)

### For Gauss's Law Applications
- **Wire:** Cylinder has curved walls carrying flux
- **Sheet:** Pillbox has two caps carrying flux
- **Sphere:** Entire surface carries flux (no ends)

### For Dipole
- **Axis:** 2× stronger than equatorial
- **Stable:** p aligns with E
- **Unstable:** p anti-aligns with E

---

## 16. Common Formula Variations

### Coulomb's Law Forms
$$F = k\frac{q_1q_2}{r^2} = \frac{q_1q_2}{4\pi\varepsilon_0 r^2} = \frac{\lambda_1\lambda_2 L}{4\pi\varepsilon_0 r^2}$$

### Electric Field Forms
$$E = \frac{kQ}{r^2} = \frac{\sigma}{2\varepsilon_0} = \frac{\lambda}{2\pi\varepsilon_0 r}$$

### Dipole Field Forms
$$E_{axis} = \frac{2p}{4\pi\varepsilon_0 r^3} = \frac{2kq(2a)}{r^3} = \frac{2k\mathbf{p}}{r^3}$$

---

> [!REMINDER]
> Always check:
> 1. Units (convert cm to m, μC to C)
> 2. Direction (vector nature)
> 3. Approximations (r >> a for dipole formulas)
> 4. Sign conventions (positive/negative charges)

---

*Use this sheet for rapid revision before exams. Cover right column, try to recall formulas.*

*Tags: #FormulaSheet #QuickReference #CheatSheet #JEE-Mains #JEE-Advanced*