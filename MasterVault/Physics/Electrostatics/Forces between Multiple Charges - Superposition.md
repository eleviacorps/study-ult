# Forces between Multiple Charges - Superposition Principle
#JEE #JEEAdvanced #Class12 #Electrostatics #Superposition

---

## 3.1 The Challenge of Multi-Charge Systems

When we have more than two charges, how do we calculate the net force on any one charge?

**Simple example:** Three charges: $q_1$, $q_2$, $q_3$
- Force on $q_1$ = Force due to $q_2$ + Force due to $q_3$

This is where the **Superposition Principle** comes in!

---

## 3.2 Superposition Principle - Statement

> [!KEY-PRINCIPLE]
> **The total force on any charge due to a system of charges is the vector sum of all the forces exerted on it by the other charges, taken one at a time.**

### Key Points:
1. Each force is calculated **individually** as if other charges don't exist
2. All individual forces are **added vectorially**
3. Forces are **independent** — presence of other charges doesn't affect individual pair forces

### Mathematical Form

For charges $q_1, q_2, q_3, \ldots, q_n$:

$$\mathbf{F}_1 = \mathbf{F}_{12} + \mathbf{F}_{13} + \ldots + \mathbf{F}_{1n}$$

$$\mathbf{F}_1 = \frac{q_1}{4\pi\varepsilon_0} \sum_{i=2}^{n} \frac{q_i}{r_{1i}^2} \hat{\mathbf{r}}_{1i}$$

Where:
- $\mathbf{F}_1$ = net force on charge $q_1$
- $\mathbf{F}_{1i}$ = force on $q_1$ due to $q_i$
- $\hat{\mathbf{r}}_{1i}$ = unit vector from $q_1$ to $q_i$

---

## 3.3 Vector Addition of Forces

### Method 1: Component Method
For each force:
1. Find x-component: $F_x = F \cos\theta$
2. Find y-component: $F_y = F \sin\theta$
3. Add all x-components → $F_x^{net}$
4. Add all y-components → $F_y^{net}$
5. $F_{net} = \sqrt{F_x^{net^2} + F_y^{net^2}}$

### Method 2: Parallelogram Law
- Draw two forces from same point
- Complete parallelogram
- Diagonal gives resultant

### Method 3: Trigonometric
Use when forces at specific angles (60°, 120°, etc.)

---

## 3.4 Important Rules for Force Calculation

### Rule 1: Newton's Third Law Always Holds
$$\mathbf{F}_{12} = -\mathbf{F}_{21}$$

The force on $q_1$ due to $q_2$ is equal and opposite to force on $q_2$ due to $q_1$.

### Rule 2: Like Charges Repel, Unlike Attract
- $q_1 > 0$, $q_2 > 0$ → Repulsion along line
- $q_1 < 0$, $q_2 < 0$ → Repulsion along line
- $q_1$ and $q_2$ opposite signs → Attraction along line

### Rule 3: Distance is Always Positive
When calculating magnitude, $r$ in denominator is always the actual distance (never negative).

---

## 3.5 Worked Examples

### Example 1: Three charges in a line
**Problem:** Charges +q, +2q, and +3q are placed on a straight line with equal spacing. Find the force on the middle charge (+2q).

**Solution:**
- Distance between adjacent charges = d
- Force on +2q due to +q: $F_1 = k \cdot \frac{q \cdot 2q}{d^2}$ (repulsive, toward +q)
- Force on +2q due to +3q: $F_2 = k \cdot \frac{2q \cdot 3q}{d^2}$ (repulsive, away from +3q)

Net force direction: Toward +q charge

$$F_{net} = k \frac{2q^2}{d^2} - k \frac{6q^2}{d^2} = -k\frac{4q^2}{d^2}$$

The negative sign indicates direction: toward the +q charge.

---

### Example 2: Charges at vertices of equilateral triangle (JEE Pattern)
**Problem:** Three charges +q each are placed at vertices of an equilateral triangle of side l. Find net force on a charge Q placed at the centroid.

**Solution:**

**Step 1:** Geometry
- Centroid O is equidistant from all vertices
- $AO = BO = CO = \frac{l}{\sqrt{3}}$

**Step 2:** Force magnitude
- Each charge q exerts force $F = \frac{kQq}{l^2/3} = \frac{3kQq}{l^2}$
- Direction: From each vertex toward centroid

**Step 3:** Vector addition
- By symmetry, three forces are at 120° to each other
- Resultant of any two forces = one force (magnitude) in opposite direction
- Third force cancels remaining component

**Final result:** $\mathbf{F}_{net} = 0$

> [!KEY-INSIGHT]
> For a **symmetric charge configuration** with equal charges at vertices, the net force at the geometric center is ZERO!

---

### Example 3: Two +q and one -q (Important!)
**Problem:** Charges q, q, and -q are placed at vertices of an equilateral triangle. Find force on each charge.

**Solution:**

**Force on charge q at A:**
- Due to q at B: $F_1 = \frac{kq^2}{l^2}$ along BA
- Due to -q at C: $F_2 = \frac{kq^2}{l^2}$ along AC (toward C)

By parallelogram law:
- Resultant magnitude = $F$ (same as each component)
- Direction: Along BC (bisector of ∠BAC)

**Force on -q at C:**
- Due to q at A: $F_1 = \frac{kq^2}{l^2}$ along CA (toward A)
- Due to q at B: $F_2 = \frac{kq^2}{l^2}$ along CB (toward B)

Resultant: $\sqrt{3}F$ along angle bisector of ∠ACB

**Check:** $\mathbf{F}_1 + \mathbf{F}_2 + \mathbf{F}_3 = 0$ (Newton's 3rd Law!)

> [!IMPORTANT-RESULT]
> For ANY configuration of charges, the **sum of ALL forces is zero** (if we consider action-reaction pairs). This follows from Newton's Third Law.

---

### Example 4: Finding equilibrium position (JEE Advanced)
**Problem:** Two charges +Q and +4Q are fixed at distance d apart. Where should a third charge q be placed so that it is in equilibrium?

**Solution:**

Let charge q be placed at distance x from +Q (and d-x from +4Q).

For equilibrium: Force from +Q + Force from +4Q = 0

$$\frac{kQq}{x^2} + \frac{k(4Q)q}{(d-x)^2} = 0$$

This gives: $x = \frac{d}{3}$ (nearer to smaller charge)

**Direction check:** Both forces act in SAME direction for positive q → equilibrium only possible if q is negative!

**Correct answer:** Charge q must be negative, placed between the two charges at distance d/3 from +Q.

---

## 3.6 Symmetry Arguments

### Why Symmetry Makes Problems Easier

1. **Radial symmetry:** If charge distribution is spherically symmetric, field is along radial direction
2. **Planar symmetry:** Infinite plane → field perpendicular to plane
3. **Cylindrical symmetry:** Infinite wire → field radially outward/inward

### Using Symmetry in Force Calculation

**Example:** 4 identical charges at corners of a square
- Force on any charge has equal contributions from two adjacent charges
- Remaining two charges have equal but perpendicular effects
- Net force is along diagonal (toward center or away, depending on charge sign)

---

## 3.7 Common Mistakes in Superposition

### Mistake 1: Not adding as vectors
**Wrong:** $F_{total} = F_1 + F_2 + F_3$ (scalar addition)
**Correct:** $\mathbf{F}_{total} = \mathbf{F}_1 + \mathbf{F}_2 + \mathbf{F}_3$ (vector addition)

### Mistake 2: Using superposition incorrectly
**Wrong:** Thinking force on q₁ is affected by presence of q₃
**Correct:** Coulomb's force between q₁ and q₂ is UNCHANGED by q₃

### Mistake 3: Direction errors
**Important:** Always draw free body diagram before calculating!

### Mistake 4: Confusing action-reaction
**Note:** $\mathbf{F}_{12}$ and $\mathbf{F}_{21}$ act on DIFFERENT bodies. Both are included when calculating forces on ALL charges, but never when considering ONE charge in isolation.

---

## 3.8 JEE Advanced Techniques

### Technique 1: Resolve into Components
For complex geometries:
1. Choose coordinate system
2. Resolve each force into x and y components
3. Sum components separately
4. Find magnitude and direction from components

### Technique 2: Use Symmetry
- Look for symmetric positions
- Forces from symmetric charges often cancel or combine simply

### Technique 3: Work with Force Components
For forces at angles:
$$F_x = \frac{kq_1q_2}{r^2} \cos\theta$$
$$F_y = \frac{kq_1q_2}{r^2} \sin\theta$$

### Technique 4: Consider Couples
Sometimes easier to find net torque or potential energy rather than force directly.

---

## 3.9 Problem-Solving Strategy

**Step 1:** Identify all charges in the system

**Step 2:** For the charge of interest, identify all other charges and calculate individual forces

**Step 3:** Draw force vectors from a single point (head-to-tail or parallelogram)

**Step 4:** Calculate vector sum using:
- Component method (most reliable)
- Parallelogram law
- Trigonometry

**Step 5:** Write answer with magnitude AND direction

---

## 3.10 Self-Check Questions

1. Can a charge be in stable equilibrium under electrostatic forces alone?
   - **Answer:** No, at a point in free space. (Earnshaw's theorem)

2. If all charges are on a line, in what direction is the net force on any charge?
   - **Answer:** Along the line (can be left or right)

3. For what charge configuration is the net force on every charge zero?
   - **Answer:** Only if all charges are zero! (or very special constrained systems)

---

## Formula Summary

| Situation | Net Force on Charge |
|-----------|-------------------|
| Two charges | $F = \frac{kq_1q_2}{r^2}$ along line |
| Three charges collinear | Vector sum along line |
| Equilateral triangle (equal + charges) | Zero at centroid |
| Square corners (equal charges) | Along diagonal toward center |
| N charges | $\mathbf{F} = \sum_{i=1}^{n} \frac{kqq_i}{r_i^2}\hat{r}_i$ |

---

## Next Topic
→ Proceed to [[Electric Field]] to understand the field concept.

---

*Tags: #Superposition #VectorAddition #Equilibrium #Symmetry #JEEAdvanced*