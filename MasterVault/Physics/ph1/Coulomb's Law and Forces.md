# Coulomb's Law and Forces
#JEE #JEEAdvanced #Class12 #Electrostatics #CoulombsLaw

---

## 2.1 Historical Background

### Charles Augustin de Coulomb (1736-1806)
- French physicist
- Invented **torsion balance** to measure force between charges
- Discovered the inverse-square law in 1785
- Also discovered inverse-square law for magnetic poles

> [!HISTORICAL-NOTE]
> Coulomb wasn't the first to suspect inverse-square law. **Priestley** and **Cavendish** also anticipated it, but Cavendish never published his results.

---

## 2.2 The Torsion Balance Experiment

### Experimental Setup
1. Thin rod with two small charged spheres at ends
2. Suspended by a thin fiber
3. Third charged sphere brought near one end
4. Twist of fiber measures force

### Key Insight
When separation >> radius of spheres, spheres behave as **point charges**.

### Charge Division Method
Coulomb found a way to get fractional charges:
- Touch charged sphere with identical uncharged sphere → charge splits equally (q/2 each)
- Repeat to get q/4, q/8, etc.

---

## 2.3 Coulomb's Law - Statement

**The electrostatic force between two point charges is:**
1. **Directly proportional** to the product of the magnitudes of charges
2. **Inversely proportional** to the square of the distance between them
3. **Along the line joining** the two charges

### Mathematical Form

$$F = k \frac{|q_1 \cdot q_2|}{r^2}$$

Where:
- $F$ = force (in Newtons)
- $q_1, q_2$ = charges (in Coulombs)
- $r$ = distance between charges (in meters)
- $k = 9 \times 10^9$ N·m²/C² (Coulomb's constant)

### Vector Form

$$\mathbf{F}_{21} = \frac{k q_1 q_2}{r_{21}^2} \hat{\mathbf{r}}_{21}$$

Where $\hat{\mathbf{r}}_{21}$ is a unit vector from charge 1 to charge 2.

> [!IMPORTANT]
> The force is **repulsive** if $q_1$ and $q_2$ have same sign (both + or both −).
> The force is **attractive** if $q_1$ and $q_2$ have opposite signs.

---

## 2.4 Permittivity Form of Coulomb's Law

The constant $k$ can be written in terms of permittivity of free space ($\varepsilon_0$):

$$k = \frac{1}{4\pi\varepsilon_0}$$

Therefore:

$$\boxed{F = \frac{1}{4\pi\varepsilon_0} \frac{q_1 q_2}{r^2}}$$

Where:
$$\varepsilon_0 = 8.854 \times 10^{-12} \text{ C}^2 \text{ N}^{-1} \text{m}^{-2}$$

### Why $4\pi$ Factor?
This form is chosen because it simplifies formulas in electrostatics, particularly Gauss's Law.

---

## 2.5 Coulomb's Law vs Gravitational Force

| Property | Electrostatic Force | Gravitational Force |
|----------|---------------------|---------------------|
| **Formula** | $F = \frac{kq_1q_2}{r^2}$ | $F = \frac{Gm_1m_2}{r^2}$ |
| **Sign** | Can be + (repulsive) or − (attractive) | Always negative (attractive) |
| **Relative Strength** | $\sim 10^{39}$ times stronger | Much weaker |
| **Dependence** | On charge | On mass |
| **Formula Contains** | $k = \frac{1}{4\pi\varepsilon_0}$ | $G = 6.67 \times 10^{-11}$ |

### Comparison: Electron-Proton System
$$\frac{F_e}{F_g} = \frac{ke^2}{G m_e m_p} \approx 2.4 \times 10^{39}$$

> [!KEY-INSIGHT]
> **Electric force is enormously stronger than gravitational force!** For subatomic particles, gravity is negligible compared to electric forces.

---

## 2.6 Worked Examples

### Example 1: Force between charged spheres
**Problem:** What is the force between two charges of $+2 \times 10^{-7}$ C and $+3 \times 10^{-7}$ C placed 30 cm apart in air?

**Solution:**
$$F = \frac{k q_1 q_2}{r^2} = \frac{9 \times 10^9 \times 2 \times 10^{-7} \times 3 \times 10^{-7}}{(0.3)^2}$$

$$F = \frac{9 \times 10^9 \times 6 \times 10^{-14}}{0.09} = \frac{5.4 \times 10^{-4}}{0.09} = 6 \times 10^{-3} \text{ N}$$

$$F = 6 \text{ mN}$$

**Direction:** Repulsive (along the line joining charges)

---

### Example 2: Finding distance from force
**Problem:** A charge of $-0.8$ μC exerts 0.2 N force on another charge of $0.4$ μC. Find the distance between them.

**Solution:**
$$F = \frac{k q_1 q_2}{r^2}$$

$$r^2 = \frac{k q_1 q_2}{F} = \frac{9 \times 10^9 \times 0.8 \times 10^{-6} \times 0.4 \times 10^{-6}}{0.2}$$

$$r^2 = \frac{9 \times 10^9 \times 0.32 \times 10^{-12}}{0.2} = \frac{2.88 \times 10^{-3}}{0.2} = 1.44 \times 10^{-2}$$

$$r = 0.12 \text{ m} = 12 \text{ cm}$$

---

### Example 3: Force on each charge (Newton's Third Law)
**Problem:** In the previous example, what is the force on the second charge due to the first?

**Solution:**
By Newton's Third Law, the forces are equal and opposite. So the magnitude is **0.2 N**, directed toward the first charge.

---

## 2.7 Comparing Electric and Gravitational Forces

### Example 4: Electron-Proton at 1 Å (JEE Pattern)
**Problem:** (a) Compare strengths of electric and gravitational forces between electron and proton. (b) Find their accelerations when 1 Å apart.

**Solution:**

**(a) Force Comparison:**
$$F_e = \frac{ke^2}{r^2} \quad F_g = \frac{G m_p m_e}{r^2}$$

$$\frac{F_e}{F_g} = \frac{ke^2}{G m_p m_e} = 2.4 \times 10^{39}$$

**(b) Acceleration Calculation:**
$$|\mathbf{F}| = \frac{ke^2}{r^2} = 8.99 \times 10^9 \times \frac{(1.6 \times 10^{-19})^2}{(10^{-10})^2} = 2.3 \times 10^{-8} \text{ N}$$

For electron:
$$a_e = \frac{F}{m_e} = \frac{2.3 \times 10^{-8}}{9.11 \times 10^{-31}} = 2.5 \times 10^{22} \text{ m/s}^2$$

For proton:
$$a_p = \frac{F}{m_p} = \frac{2.3 \times 10^{-8}}{1.67 \times 10^{-27}} = 1.4 \times 10^{19} \text{ m/s}^2$$

> [!JEE-INSIGHT]
> Both accelerations are enormous compared to g = 9.8 m/s². **Gravity is completely negligible** in atomic systems!

---

## 2.8 Coulomb's Law in Different Media

### Effect of Medium
The force between charges changes when placed in a medium other than vacuum/vacuum:

$$F = \frac{1}{4\pi\varepsilon_0 \varepsilon_r} \frac{q_1 q_2}{r^2}$$

Where $\varepsilon_r$ is the **relative permittivity** (dielectric constant) of the medium.

### Vacuum
$$\varepsilon_r = 1 \quad \text{(no modification)}$$

### Water
$$\varepsilon_r \approx 80 \quad \text{(force reduced by 80 times)}$$

### Medium-Specific Formula
$$F = \frac{1}{4\pi\varepsilon} \frac{q_1 q_2}{r^2}$$

Where $\varepsilon = \varepsilon_0 \varepsilon_r$

---

## 2.9 Point Charge Approximation

### When is a body a "point charge"?
When the **size of charged body is much smaller than the distance** between them.

$$\text{Size} \ll r$$

Under this approximation, we assume:
- All charge concentrated at a single point
- No internal structure effects
- Distance measured between "centers"

---

## 2.10 Limits and Validity of Coulomb's Law

### Range of Validity
- Tested from $10^{-10}$ m (atomic scale) to $10^7$ m (astronomical scale)
- Follows inverse-square law extremely accurately

### Modern Tests
Deviation from $1/r^2$ would violate Gauss's Law. Experiments show exponent is **exactly 2** to within 1 part in $10^{16}$.

> [!FUNDAMENTAL]
> Coulomb's Law + Superposition Principle = **Foundation of Classical Electrodynamics**

---

## 2.11 Common Mistakes

### Mistake 1: Forgetting the square in denominator
**Wrong:** $F = \frac{kq_1 q_2}{r}$
**Correct:** $F = \frac{kq_1 q_2}{r^2}$

**Why students err:** Often remember "inverse" but not "inverse square"

### Mistake 2: Mixing up k and ε₀
**Wrong:** Using $F = \frac{\varepsilon_0 q_1 q_2}{4\pi r^2}$
**Correct:** $F = \frac{q_1 q_2}{4\pi \varepsilon_0 r^2}$

**Trick:** Remember "k" has "inverse 4π epsilon" → $\frac{1}{4\pi\varepsilon_0}$

### Mistake 3: Not using vector form for direction
**Important:** Force is a vector. Always specify direction!

### Mistake 4: Confusing SI and CGS units
**JEE Trap:** Always work in SI units (C, m, N)
1 μC = $10^{-6}$ C, not $10^{-3}$ C

---

## 2.12 Dimensional Analysis

$$[F] = \text{MLT}^{-2}$$

$$[k] = \frac{\text{N·m}^2}{\text{C}^2} = \frac{\text{M·L}^3 \text{T}^{-4}}{\text{A}^2 \text{T}^2} = \text{M L}^3 \text{T}^{-4} \text{A}^{-2}$$

$$[\varepsilon_0] = \text{C}^2 \text{N}^{-1} \text{m}^{-2} = \text{A}^2 \text{T}^2 \text{M}^{-1} \text{L}^{-3} \text{T}^2 = \text{A}^2 \text{T}^4 \text{M}^{-1} \text{L}^{-3}$$

---

## 2.13 JEE Advanced Question Patterns

### Pattern 1: Three-charge systems
Find net force on one charge due to two others using vector addition.

### Pattern 2: Charge in equilibrium
Find conditions where a charge experiences zero net force.

### Pattern 3: Variable charge distributions
Force changes as charges move or redistribute.

### Pattern 4: Combined with other concepts
Coulomb + Work-Energy, Coulomb + Motion in Field

---

## Formula Summary Table

| Formula | When to Use |
|---------|-------------|
| $F = k\frac{q_1 q_2}{r^2}$ | Basic two-point-charge force (scalar) |
| $\mathbf{F} = k\frac{q_1 q_2}{r^2}\hat{r}$ | Vector form with direction |
| $F = \frac{1}{4\pi\varepsilon_0}\frac{q_1 q_2}{r^2}$ | Using permittivity |
| $F = \frac{q_1 q_2}{4\pi\varepsilon r^2}$ | In a medium with permittivity ε |

---

## Next Topic
→ Proceed to [[Forces between Multiple Charges - Superposition]] to understand multi-charge systems.

---

*Tags: #CoulombsLaw #InverseSquareLaw #ForceCalculation #VectorForm #JEE*