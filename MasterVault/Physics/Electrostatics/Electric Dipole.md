# Electric Dipole
#JEE #JEEAdvanced #Class12 #Electrostatics #Dipole

---

## 7.1 What is an Electric Dipole?

### Definition
An **electric dipole** is a system of two equal and opposite point charges (+q and -q) separated by a finite distance.

### Key Parameters
- **Separation:** 2a (distance between charges)
- **Axis:** Line connecting the two charges
- **Direction:** Conventionally from negative to positive charge

### Dipole Moment Vector ($\mathbf{p}$)

$$\mathbf{p} = q \times 2a \, \hat{p}$$

Where:
- $q$ = magnitude of each charge
- $2a$ = separation between charges
- $\hat{p}$ = unit vector from -q to +q

**Important:** Dipole moment is a **vector** pointing from negative to positive charge.

### SI Unit of Dipole Moment
$$[p] = \text{C·m} = \text{debye}$$

**1 debye = $3.335 \times 10^{-30}$ C·m**

---

## 7.2 Why Study Dipoles?

### Physical Significance
1. **Neutral overall:** Total charge = 0, but creates field
2. **Polar molecules:** H₂O, HCl, NH₃ have permanent dipole moments
3. **Non-polar becomes polar:** Molecules like CO₂ develop induced dipole in external field
4. **Important in chemistry:** Explains molecular interactions, hydrogen bonding

### Key Feature: 1/r³ Dependence
Unlike single charge field ($E \propto 1/r^2$), dipole field falls off as $E \propto 1/r^3$ (at large distances).

---

## 7.3 Electric Field of a Dipole

### Case 1: Point on Axis (End-on Position)

**Setup:** Point P on axis, at distance r from center.

**Derivation:**
- Field due to +q at P: $E_+ = \frac{kq}{(r-a)^2}$ (away from +q)
- Field due to -q at P: $E_- = \frac{kq}{(r+a)^2}$ (toward -q)

Both fields point in **same direction** (from +q toward -q).

$$\mathbf{E} = \frac{kq}{(r-a)^2} \hat{p} - \frac{kq}{(r+a)^2} \hat{p} = kq\left[\frac{1}{(r-a)^2} - \frac{1}{(r+a)^2}\right]\hat{p}$$

For r >> a:
$$\mathbf{E} = \frac{2kq \cdot 2a}{r^3} \hat{p} = \frac{2\mathbf{p}}{4\pi\varepsilon_0 r^3}$$

> [!KEY-RESULT]
> **On dipole axis:** $E_{axis} = \frac{2p}{4\pi\varepsilon_0 r^3}$ (along dipole moment)

---

### Case 2: Point on Equatorial Plane (Broad-on Position)

**Setup:** Point P on perpendicular bisector, at distance r from center.

**Derivation:**
- Distance to each charge: $\sqrt{r^2 + a^2}$
- E₊ points away from +q (along OP)
- E₋ points toward -q (toward O)
- These have components along and opposite to $\hat{p}$
- Perpendicular components cancel (by symmetry)

Net field along negative dipole moment direction:

$$E = -\frac{p}{4\pi\varepsilon_0 (r^2 + a^2)^{3/2}}$$

For r >> a:
$$E_{equatorial} = -\frac{p}{4\pi\varepsilon_0 r^3}$$

> [!KEY-RESULT]
> **On equatorial plane:** $E_{equatorial} = -\frac{p}{4\pi\varepsilon_0 r^3}$ (opposite to dipole moment)

---

### Case 3: General Point

For any point at distance r making angle θ with dipole axis:

$$E_r = \frac{p \cos\theta}{4\pi\varepsilon_0 r^3} \quad \text{(along radial direction)}$$
$$E_\theta = \frac{p \sin\theta}{4\pi\varepsilon_0 r^3} \quad \text{(perpendicular to radial)}$$

---

## 7.4 Comparison: Single Charge vs Dipole

| Aspect | Point Charge | Electric Dipole |
|--------|--------------|-----------------|
| Field dependence | $E \propto 1/r^2$ | $E \propto 1/r^3$ |
| Direction | Radial | Varies with position |
| Symmetry | Spherical | Axial |
| Neutrality | Charge ≠ 0 | Total charge = 0 |
| Source | Single charge | Two opposite charges |

---

## 7.5 Worked Examples

### Example 1: Field at point on dipole axis
**Problem:** Dipole with p = $4 \times 10^{-9}$ C·m. Find field at 10 cm from center on axis.

**Solution:**

$$E = \frac{2p}{4\pi\varepsilon_0 r^3} = \frac{2 \times 4 \times 10^{-9}}{4\pi \times 8.85 \times 10^{-12} \times (0.1)^3}$$

$$E = \frac{8 \times 10^{-9}}{4 \times 3.14 \times 8.85 \times 10^{-12} \times 10^{-3}}$$

$$E = \frac{8 \times 10^{-9}}{1.11 \times 10^{-12}} = 7200 \text{ N/C}$$

Direction: Along dipole moment (from - to +).

---

### Example 2: Point on equatorial plane
**Problem:** Same dipole. Find field at 10 cm from center on equatorial plane.

**Solution:**

$$E = \frac{p}{4\pi\varepsilon_0 r^3} = \frac{4 \times 10^{-9}}{4\pi \times 8.85 \times 10^{-12} \times 10^{-3}}$$

$$E = \frac{4 \times 10^{-9}}{1.11 \times 10^{-12}} = 3600 \text{ N/C}$$

Direction: Opposite to dipole moment (from + to -).

**Note:** Field on equatorial plane is exactly **half** of field on axis at same distance.

---

### Example 3: Net dipole moment of charge system
**Problem:** Charges at (0,0,-15 cm) and (0,0,+15 cm) are +2.5×10⁻⁷ C and -2.5×10⁻⁷ C.

**Solution:**

**Total charge:** $2.5 \times 10^{-7} + (-2.5 \times 10^{-7}) = 0$

**Dipole moment:** $\mathbf{p} = q \times \mathbf{d}$
- $q = 2.5 \times 10^{-7}$ C
- $\mathbf{d}$ from -q to +q = $0.3$ m along z-axis

$$p = 2.5 \times 10^{-7} \times 0.3 = 7.5 \times 10^{-8} \text{ C·m}$$

Direction: Positive z-direction.

---

## 7.6 Physical Significance: Polar vs Non-Polar Molecules

### Non-Polar Molecules
- Centers of positive and negative charge coincide
- No permanent dipole moment (e.g., CO₂, CH₄)
- Can develop induced dipole in external field

### Polar Molecules
- Centers of positive and negative charge separated
- Permanent dipole moment (e.g., H₂O, HCl, NH₃)
- Align with external electric field

### Why H₂O is Polar
- Oxygen has higher electronegativity
- Bond electrons pulled more toward oxygen
- Charge centers don't coincide → net dipole moment

---

## 7.7 Dipole in External Uniform Field

### Torque on Dipole

When dipole with moment $\mathbf{p}$ is placed in uniform field $\mathbf{E}$:

**Force Analysis:**
- Force on +q: $\mathbf{F}_+ = q\mathbf{E}$ (in direction of E)
- Force on -q: $\mathbf{F}_- = -q\mathbf{E}$ (opposite to E)
- Net force = 0 (no translation)

**But forces act at different points!**
Creates a **couple** (torque) that tends to rotate the dipole.

**Torque Magnitude:**
$$\tau = qE \times 2a \sin\theta = pE\sin\theta$$

**Vector Form:**
$$\boldsymbol{\tau} = \mathbf{p} \times \mathbf{E}$$

Where $\theta$ is angle between $\mathbf{p}$ and $\mathbf{E}$.

> [!KEY-RESULT]
> **Torque on dipole:** $\tau = pE\sin\theta$ (tries to align p with E)

---

### Equilibrium Conditions

| Position | θ | τ | Type |
|-----------|---|---|------|
| p parallel to E | 0° | 0 | Stable |
| p antiparallel to E | 180° | 0 | Unstable |
| p perpendicular to E | 90° | pE (max) | - |

**Stable equilibrium:** p and E parallel (lowest potential energy)
**Unstable equilibrium:** p and E antiparallel (highest potential energy)

---

### Potential Energy of Dipole in Field

$$U = -\mathbf{p} \cdot \mathbf{E} = -pE\cos\theta$$

| θ | U | Interpretation |
|---|--|----------------|
| 0° | -pE (minimum) | Stable equilibrium |
| 90° | 0 | Intermediate |
| 180° | +pE (maximum) | Unstable equilibrium |

---

## 7.8 Force on Dipole in Non-Uniform Field

### Non-Zero Net Force
When field is non-uniform, forces on +q and -q differ in magnitude.

**Result:**
- Net force on dipole
- Also torque (unless dipole aligned with field)

### Direction of Force
Dipole moves toward region of **stronger field** when aligned with field.

**This explains:**
- Why charged comb attracts paper pieces
- Paper becomes polarized, then attracted to comb
- Non-uniform field of comb pulls paper

---

## 7.9 Common Mistakes

### Mistake 1: Using wrong formula
**Remember:** Formula for dipole field depends on whether you're on axis or equatorial plane.

### Mistake 2: Confusing direction
**Axis field:** Along dipole moment direction
**Equatorial field:** Opposite to dipole moment direction

### Mistake 3: Using 1/r² instead of 1/r³
Dipole field falls off faster than point charge field.

### Mistake 4: Not understanding stability
Stable equilibrium → lower PE → tends to rotate to align

---

## 7.10 JEE Advanced Patterns

### Pattern 1: Find E at general point from dipole
Use components $E_r$ and $E_\theta$ formulas.

### Pattern 2: Torque and angular acceleration
Use $\tau = I\alpha$ for rotating dipole.

### Pattern 3: Work done in rotating dipole
$W = \Delta U = pE(\cos\theta_1 - \cos\theta_2)$

### Pattern 4: Combined with Gauss's Law
Sometimes find equivalent charge distribution.

---

## Formula Summary

| Formula | Meaning | Condition |
|---------|---------|-----------|
| $\mathbf{p} = q(2\mathbf{a})$ | Dipole moment | Definition |
| $E_{axis} = \frac{2p}{4\pi\varepsilon_0 r^3}$ | Field on axis | r >> a |
| $E_{equatorial} = \frac{p}{4\pi\varepsilon_0 r^3}$ | Field on perpendicular bisector | r >> a |
| $\tau = pE\sin\theta$ | Torque in uniform field | Always |
| $U = -pE\cos\theta$ | Potential energy | Always |

---

## Next Topic
→ Proceed to [[Gauss's Law and Applications]] for advanced field calculations.

---

*Tags: #Dipole #DipoleMoment #Torque #PotentialEnergy #1/r³ #JEE*