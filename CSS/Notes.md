CSS is the language that styles and organizes web pages. It makes websites visually appealing and user-friendly. 

- CSS adds color, spacing, responsiveness and animations. 

## `class` Vs `id`

- class: reusable, multiple elements

- id: unique, one element 

## box-sizing: border-box 

By default, CSS adds padding and border outside the width, which makes elements bigger than expected and breaks layouts. 

- `box-sizing: border-box` ensures the element's width stays fixed by including padding and border inside the given width. 

- Example: If we set width to 200px, the element remains 200px even after adding padding and border. 

- It prevents layout breakage caused by padding and borders. 

- `box-sizing: border-box` makes layouts predictable by keeping padding and borders inside the defined width, preventing layout breakage. 


## `position: relative` Vs. `position: absolute`

- Position helps control where an element appears without breaking the document flow unnecessarily. 

**position: relative**

- Moves relative to its original position 
- `Relative` is for reference.

**position: absolute**

- Positioned relative to the nearest positioned parent. 
- `absolute` is for precise placement. 


## CSS Selectors 

Selectors decide which elements CSS should apply to. 

- Selectors target elements based on tag, class, id, or structure. 

1. Element Selector 

    `p {}`

    Styles all `<p>` tag

2. Class Selector 

    `.card {}`

    Reusable styles 

3. ID Selector 

    `#header {}`

    One unique element

4. Descendant Selector 

    `.card p {}`

    Stores `<p>` inside `.card`

5. Child Selector 

    `.card > p {}`

    Only direct children

6. Attribute Selector 

    `input[type="text"] {}`


## CSS Grid 

- Best for: Two-direction layout (rows AND columns)

- Creating full page layout (Two directions: rows and columns)

- Use when: 

    Page layouts, Dashboards, Cards layout 

- Grid is used for complex layouts where both rows and columns are needed. 

## CSS Flexbox 

Flexbox helps build responsive layouts without using floats or complex calculations. 

- `Flexbox` aligns items in a single direction. One direction only (row or column). 

- Example: 

    **Navbar** (logo left, links right)

    **Centering:** 

    ```css
    display: flex; 
    justify-content: center; 
    align-items:center; 
    ```

- `Flex` is one-dimensional, `Grid` is two-dimensional. 

- Best for: One-direction layout (row OR column)

- Use when: 

    Aligning items in a navbar 

    Centering content 

- Flexbox is ideal for arranging items in a single direction and handling alignment. 


## CSS Box Model 

The CSS box model defines how much space an element occupies in a webpage. 

- Every HTML element is a box. 

    Content -> actual text/image
    Padding -> space inside the border 
    Border -> outline around padding 
    Margin -> space outside the element  

- The final size of an element is `content + padding + border`, while `margin` controls the spacing outside.

- The CSS box model defines element sizing using content, padding, border and margin. 


## What's new in CSS3

CSS3 made web design responsive, animated, and layout-friendly. 

1. Flexbox & Grid - Modern layout, Easy alignment, Responsive design 

2. Media Queries - responsive design 

3. Animations & Transitions 

4. CSS Variables 

```css
:root{
    --primary-color: blue;
}
button {
    background: var(--primary-color) ; 
}
```

## z-index 

- `z-index` controls the stacking order of overlapping elements. 

- Works only on positioned elements.z-index works only when position is relative, absolute, fixed or sticky.

- Higher z-index comes on top, but only for positioned elements.


## Different ways to apply CSS to a webpage 

1. Inline CSS 

```html
<h1 style="color: red;">Hello</h1>
```

- Hard to maintain, least preferred 
- No reuse 

2. Internal CSS 

```html
<style>
    h1 {color: red;}
</style>
```

- Used in small pages

3. External CSS 

```html
<link rel="stylesheet" href="styles.css">
```

- Reusable, maintainable and clean separation 
- Preferred 

**Which CSS loads first?**

Inline > Internal > External


## `position` Property
 
- Controls how an element is positioned in the document. 

- `position: static;`

    Normal flow, `top/left` won't work. Use when we don't need positioning. 

- `position: relative;`

    ```css
    position: relative;
    top: 10px;
    ```

    Moves relative to itself. Space is preserved. 

    Used as a reference for absolute children. 


## Media Queries 

- Media queries make websites responsive across different screen sizes. 

- Media queries help apply different styles based on device size. 

- It enables responsive design 

- It applies CSS based on screen width 

## CSS Custom Properties 

Avoid repetition and make styling scalable. 

```css
:root{
    --primary-color: #2563eb; 
    --spacing: 16px; 
}

button {
    background: var(--primary-color);
    padding: var(--spacing)
}
```

- Cleaner code, easy theme changes

- CSS variables help maintain consistency and simplify theme management. 


## Margin Vs. Padding 

- Margin = space outside the element 
- Padding = space inside the element 

Padding increases space inside the element, margin increases space outside. 

## `display: none` Vs `display:block`

Display none removes the element from layout, block makes it visible and takes full width. 

- **display:none**

    Element removed completely. No space occupied. 

- **display:block**

    Element is visible. Takes full width by default. 


## How to center a div 

1. flexbox 

```css
.parent{
    display: flex; 
    justify-content: center; 
    align-items: center; 
}
```

2. Absolute positioning

```css
div {
    position: absolute; 
    top: 50%; 
    left: 50%; 
    transform: translate(-50%, -50%); 
}
```

## `display: none` Vs `visibility:hidden`

Visibility hidden hides the element but keeps its space, display none removes it completely. 

- display: none 

    Element is removed. No space. DOM still exists 

- visibility: hidden 

    Element is invisible. Space is still reserved. 


## Positioning properties in CSS 

Positioning controls how and where an element is placed in the layout. 

- `position: static`

    Default. Normal document flow. 

    top/left/right/bottom do nothing 

    Static is the default positioning; elements appear in normal flow 

- `position: relative`

    Element stays in normal flow. You can move it slightly. 

    Its original space remains. 

    ```css
    .box{
        position: relative;
        top: 10px;
        left: 20px; 
    }
    ```

- `position: absolute`

    Removed from normal flow. Positive relative to: nearest positioned parent. 


## CSS Overflow 

- Overflow controls what happens when content exceeds the container size. 

- `overflow:hidden`

    Cuts extra content. No scroll. 

- `overflow: scroll`

    Scrollbar always visible 

- `overflow: auto`

    Scroll only when needed. 


## display: inline-block

- `display:block`

    Takes full width. Starts on a new line. 

    Width & height can be set. 

    Block elements start on a new line and take full width.

- `display: inline-block`

    Stays in same line. Width & height can be set. 

    Doesn't break line. 


## Pseudo-Classes 

Pseudo-classes apply styles based on the state of an element. 

- Common pseudo-classes: 

    `button:hover {}`, `input:focus {}`, `a: visited {}`, `li:first-child {}`

- Real life examples 

    Hover effect on buttons, Focus styles on input, Styling first or last item 

- Pseudo-classes style elements based on user interaction or position. 


## Pseudo-Elements in CSS 

Pseudo-elements style a specific part of an elemet. 

- Real life example: 

    First letter styling 
    Decorative icons 
    Custom separators 

- Example: 

    `div::before {}`, `div::after {}`

- Pseudo-elements target parts of an element, not the element itself. 


## @keyframes 

- `@keyframes` defines the stages of an animation. 

- It defines how an element changes over time. 

