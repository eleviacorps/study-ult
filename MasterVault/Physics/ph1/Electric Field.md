# Electric Field
#JEE #JEEAdvanced #Class12 #Electrostatics #ElectricField

---

## 4.1 Why Electric Field?

### The Question
When a charge Q exerts force on charge q at distance r, how does the force "travel"?

### The Field Concept (Faraday's Insight)
1. Charge Q creates an **electric field** everywhere in surrounding space
2. When charge q is placed in this field, it experiences a force
3. **If q is removed, the field remains** — it's a property of space around Q

> [!KEY-CONCEPT]
> The **electric field** is the "agency" through which one charge influences another. It exists independent of the test charge.

---

## 4.2 Definition of Electric Field

### Mathematical Definition

$$\mathbf{E}(\mathbf{r}) = \lim_{q \to 0} \frac{\mathbf{F}(\mathbf{r})}{q}$$

Where:
- $\mathbf{E}$ = electric field vector
- $\mathbf{F}$ = force on test charge
- $q$ = test charge (approaching zero)
- $\mathbf{r}$ = position vector

### Physical Interpretation
**Electric field at a point is the force that a unit positive charge would experience if placed at that point.**

### Units
$$[\mathbf{E}] = \frac{\text{N}}{\text{C}} = \text{V/m}$$

Both N/C and V/m are SI units of electric field.

---

## 4.3 Electric Field Due to a Point Charge

### Derivation

Start with Coulomb's Law:
$$\mathbf{F} = \frac{1}{4\pi\varepsilon_0} \frac{Qq}{r^2}\hat{\mathbf{r}}$$

Divide by q (test charge):
$$\mathbf{E} = \frac{\mathbf{F}}{q} = \frac{1}{4\pi\varepsilon_0} \frac{Q}{r^2}\hat{\mathbf{r}}$$

### Key Results

| Charge Type | Direction of E | Formula |
|-------------|---------------|---------|
| Positive Q (+Q) | Radially **outward** from Q | $\mathbf{E} = \frac{kQ}{r^2}\hat{r}$ |
| Negative Q (-Q) | Radially **inward** toward Q | $\mathbf{E} = -\frac{kQ}{r^2}\hat{r}$ |

### Magnitude Only
$$|\mathbf{E}| = \frac{1}{4\pi\varepsilon_0} \frac{|Q|}{r^2}$$

---

## 4.4 Properties of Electric Field

### Property 1: Spherical Symmetry
For a point charge, field magnitude is same on all points at same distance r.
- Field lines radiate outward (positive) or inward (negative)
- Creates spherical "shells" of equal field strength

### Property 2: Superposition
Electric fields follow superposition principle:
$$\mathbf{E}_{total} = \mathbf{E}_1 + \mathbf{E}_2 + \ldots + \mathbf{E}_n$$

### Property 3: Field Exists Everywhere
Electric field exists at every point in space around a charge, not just where we put test charges.

### Property 4: Independent of Test Charge
The field $\mathbf{E}$ at a point is determined by source charge(s), NOT by the test charge used to measure it.

---

## 4.5 Electric Field Due to System of Charges

### Superposition for Fields

For charges $q_1, q_2, \ldots, q_n$ at positions $\mathbf{r}_1, \mathbf{r}_2, \ldots, \mathbf{r}_n$:

$$\mathbf{E}(\mathbf{r}) = \frac{1}{4\pi\varepsilon_0} \sum_{i=1}^{n} \frac{q_i}{r_i^2}\hat{\mathbf{r}}_i$$

Where $r_i$ is distance from charge $q_i$ to the point where field is being calculated.

### Step-by-Step Calculation

1. Draw diagram with all charges and point P
2. Calculate distance from each charge to P
3. Find field due to each charge (magnitude and direction)
4. Resolve all fields into components
5. Sum components: $E_x = \sum E_{ix}$, $E_y = \sum E_{iy}$
6. Find resultant: $|\mathbf{E}| = \sqrt{E_x^2 + E_y^2}$

---

## 4.6 Worked Examples

### Example 1: Field on bisector of two charges
**Problem:** Charges +10 μC and -10 μC are 10 cm apart. Find field at point C, 5 cm from +10 μC on the line joining them.

**Solution:**

**Field due to +10 μC at C (distance 5 cm):**
$$E_1 = \frac{k \times 10 \times 10^{-6}}{(0.05)^2} = 3.6 \times 10^4 \text{ N/C}$$
Direction: Toward the negative charge (right)

**Field due to -10 μC at C (distance 15 cm):**
$$E_2 = \frac{k \times 10 \times 10^{-6}}{(0.15)^2} = 4 \times 10^3 \text{ N/C}$$
Direction: Toward C from -10 μC charge (left)

**Net field:**
$$E_{net} = 3.6 \times 10^4 + 4 \times 10^3 = 4.0 \times 10^4 \text{ N/C}$$
Direction: Toward the right (toward -10 μC)

---

### Example 2: Field at vertex of equilateral triangle
**Problem:** Equal charges +q at A, B, C forming equilateral triangle of side a. Find field at C.

**Solution:**

**Field from A at C:**
- Distance = a
- $E_A = \frac{kq}{a^2}$ (along CA, away from A)

**Field from B at C:**
- Distance = a
- $E_B = \frac{kq}{a^2}$ (along CB, away from B)

**Angle between E_A and E_B = 60°**

By symmetry, the resultant points along the angle bisector:
$$E_{net} = 2 \times \frac{kq}{a^2} \times \cos(30°) = 2 \times \frac{kq}{a^2} \times \frac{\sqrt{3}}{2} = \frac{\sqrt{3}kq}{a^2}$$

Direction: Along bisector of ∠ACB, outward from triangle.

---

### Example 3: Electron falling in uniform field
**Problem:** Electron falls through 1.5 cm in uniform field of $2 \times 10^4$ N/C. Find time of fall. (Compare with free fall under gravity)

**Solution:**

**Acceleration of electron:**
$$a = \frac{eE}{m_e} = \frac{(1.6 \times 10^{-19})(2 \times 10^4)}{9.11 \times 10^{-31}} = 3.5 \times 10^{14} \text{ m/s}^2$$

**Time of fall:**
$$t = \sqrt{\frac{2h}{a}} = \sqrt{\frac{2 \times 0.015}{3.5 \times 10^{14}}} = 2.9 \times 10^{-9} \text{ s}$$

**Key insight:** This time is **independent of mass** in electric field problems (unlike gravity where time also doesn't depend on mass, but magnitudes are vastly different).

> [!JEE-INSIGHT]
> **Electric field acceleration is enormous compared to gravity:**
> - $a_e \approx 3.5 \times 10^{14}$ m/s²
> - $g = 9.8$ m/s²
> - Electric acceleration is ~$10^{13}$ times larger!

---

## 4.7 Physical Significance of Electric Field

### Why Introduce Field?

1. **Convenience:** Field is independent of test charge - it's a property of space
2. **Finite propagation speed:** When charges move, field changes propagate at speed c (speed of light)
3. **Energy transport:** Fields carry energy (electromagnetic waves)
4. **Action at a distance alternative:** Field is local - force at a point depends on field at that point

> [!DEEP-INSIGHT]
> The true significance of field emerges when charges move. A charge moving at constant velocity creates a "frozen" field pattern that moves with it. An accelerated charge creates waves that propagate outward at speed c.

---

## 4.8 Field vs Force

| Aspect | Electric Field (E) | Electric Force (F) |
|--------|-------------------|-------------------|
| Definition | Force per unit charge | Actual force on a charge |
| Formula | $\mathbf{E} = \mathbf{F}/q$ | $\mathbf{F} = q\mathbf{E}$ |
| Depends on | Source charges only | Source charges AND test charge |
| Location property | Yes - exists in space | No - acts on specific charge |
| Units | N/C or V/m | N |
| Vector nature | Yes | Yes |

---

## 4.9 Direction of Electric Field - Quick Rules

### Rule 1: Positive source charge
Field lines **diverge outward** from the charge.

### Rule 2: Negative source charge
Field lines **converge inward** toward the charge.

### Rule 3: Test charge in field
- Positive test charge → experiences force in direction of E
- Negative test charge → experiences force opposite to E

### Rule 4: Neutral point (zero field)
Where field vectors from different charges cancel exactly - no force on any charge placed there.

---

## 4.10 Uniform vs Non-Uniform Electric Field

### Uniform Electric Field
- Same magnitude at all points
- Same direction at all points
- Field lines are parallel and equally spaced

**Examples:**
- Between parallel charged plates
- Far from point charge (very small region)

### Non-Uniform Electric Field
- Magnitude varies with position
- Direction may change with position
- Most common in electrostatics

---

## 4.11 Common Mistakes

### Mistake 1: Confusing field direction
**Wrong:** Field points toward positive charge
**Correct:** Field points away from positive charge, toward negative charge

**Trick:** "Field runs from positive to negative" like current!

### Mistake 2: Using distance instead of r²
**Wrong:** $E = kQ/r$
**Correct:** $E = kQ/r^2$

### Mistake 3: Forgetting that field is a vector
**Important:** When adding fields, use vector addition, not scalar addition!

### Mistake 4: Not considering test charge sign
**Remember:** $\mathbf{F} = q\mathbf{E}$ means:
- Positive q → F in same direction as E
- Negative q → F opposite to E

### Mistake 5: Units confusion
- 1 V/m = 1 N/C (they're the same!)
- Always convert cm to m before calculation

---

## 4.12 JEE Advanced Patterns

### Pattern 1: Field at arbitrary point from multiple charges
- Use vector addition
- Often simplifies using symmetry or geometry tricks

### Pattern 2: Finding zero field points
- Set $\mathbf{E} = 0$
- Requires solving vector equation
- Usually between unlike charges

### Pattern 3: Motion in electric field
- Electron/proton in uniform field: $a = eE/m$
- Use kinematics equations

### Pattern 4: Field and force relationship
- Given field distribution, find force on charge
- Given force, find field

---

## Formula Summary

| Situation | Electric Field Formula |
|-----------|----------------------|
| Point charge Q | $E = \frac{kQ}{r^2}$ (radially outward if +) |
| Multiple charges | $\mathbf{E} = \sum \mathbf{E}_i$ |
| Distance from Q | $r = \sqrt{\frac{kQ}{E}}$ |
| Force on charge q | $\mathbf{F} = q\mathbf{E}$ |

---

## Next Topic
→ Proceed to [[Electric Field Lines]] to visualize fields.

---

*Tags: #ElectricField #FieldDefinition #Superposition #VectorAddition #JEE*