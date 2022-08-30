# Celtra Path

- uppercase letter: absolute position
- lowercase letter: relative position

## MoveTo - M

**parameters:** M \<x\> \<y\>

move current point to x, y

## LineTo - L, H, V

**parameters:** L \<x\> \<y\>

draw line to x, y

(H and V are used for drawing H - horizontal and V - vertical lines)

## Cubic Bezier Curve - C

**parameters:** C \<x1\> \<y1\> \<x2\> \<y1\> \<x\> \<y\>

- x, y: end point
- x1, y1: start control point
- x2, y2: end control point

(S - shorthand cubic bezier curve)

## Quadratic Bezier Curve

**parameters:** Q \<x1\> \<y1\> \<x\> \<y\>

- x, y: end point
- x1, y1: control point

(T - shorthand quadratic bezier curve)

## Close Path - Z

Z
