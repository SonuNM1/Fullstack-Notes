TypeScript is a superset of JavaScript that adds static typing. 

- `Superset` means everything that is valid JavaScript is also valid TypeScript. 

    JavaScript = base language. 
    TypeScript = JavaScript + extra features 

- Written by Microsoft. Compiles to JavaScript. Runs everywhere JS runs. 


## Why do we need TypeScript? 

TS adds static typing and compile-time error checking, which helps developers detect bugs early and make codebases more predictable. 

**Problem with JavaScript:** 

- JS is dynamically typed 
- Errors appear at runtime 
- Large codebases become hard to maintain 

- Example: 

```js
function add(a, b){
    return a + b; 
}

add(2, "3") ; // "23"
```

    No error until runtime. 

**How TypeScript fixes this?**

```ts
function add(a: number, b: number): number {
    return a + b ; 
}

add(2, "3") ; // Compile time error 
```

    TypeScript catches error at compile time instead of runtime. 


## JavaScript Vs. TypeScript 

| JavaScript               | TypeScript          |
| ------------------------ | ------------------- |
| Dynamic typing           | Static typing       |
| Runtime errors           | Compile-time errors |
| Less safe for large apps | Better scalability  |
| No interfaces            | Interfaces & types  |


- JavaScript is flexible, while TypeScript is safer. 


## Data types in TypeScript 

- Built-in data types: String, Number, Boolean, Null, Undefined, any, void 

- User-defined data types: arrays, enums, classes, Interface 

## `void` type in TS

It's just opposite of `any` type. The `void` type represents the unavailability of the data type for any variable. 


## TypeScript Compilation Flow 

TypeScript (.ts / .tsx)
        ↓
     Compiler
        ↓
JavaScript (.js)
        ↓
Browser

- Browsers don't understand TypeScript; it's compiled to JavaScript. 

## any 

- Disables type checking and should be avoided. 

**Valid use cases for `any`**

1. Migrating JavaScript -> TypeScript 

- We can't type everything at once. 

    `let legacyDate: any;`

2. Third-party libraries without types 

- Some old libraries don't provide typings. 

3. Unknown data (temporary)

- Example: API response before validation 

    ```js
    const response: any = await fetchData();
    ```

    Later we convert it to proper type. 


## type annotations 

- Type annotations allow developers to declare variable types explicitly. 

- This improves code readability and reduces runtime errors. 

```ts
let username: string = "Sonu NM"; 
let age: number = 25;
let isAdmin: boolean = true; 
```

## type inference 

TS can automatically infer types based on assigned values. 

- This means we don't always need to explicitly declare a type. TS figures it out for us. 

```ts
let count = 10; 
count = "hello" ; // error
```

    TS infers that count must be a number based on its initial value, so assigning a string later causes a compile-time error. 


## Core TypeScript Concepts 

1. **Static Typing**

- We tell TS what kind of data a variable should hold. 

    `let count: number = 10;`

- Prevents accidental misuse, makes code predictable. 

2. **Type Inference**

- TypeScript can guess the type automatically. 

    `let name = "Sonu";`

    TypeScript understands: `let name: string;`

    TS automatically infers types when possible. 

3. **Interfaces**

- An interface defines the structure of an object. 

- Why interfaces exist? 

    JS allows any object shape. TS enforces structure. 

- Example: 

```js
interface User {
    id: number;
    email: string; 
}
```

- Interfaces are used in React props, API responses. Improves readability


4. **Types (`type`)**

- Type is a way to describe what kind of data a value can hold. 

5. **any**

- Disables type checking 

- `let data: any`

- Using `any` defeats the purpose of TS. 

## Interface vs Type 

| Interface           | Type                 |
| ------------------- | -------------------- |
| Object structure    | Data shape           |
| Extendable          | More flexible        |
| Preferred for props | Preferred for unions |

- Use `interface` for objects, `type` for unions and complex definitions. 


## Arrays, tuples, and enums in TS 

TS allows developers to enforce strict types on arrays, tuples, and enums to improve clarity and prevent runtime errors. 

```ts
let scores: number[] = [95, 80, 85] ; 
scores.push(100) ; // OK 
scores.push("A+") ; // Error 
```

## Primitives 

- Primitive = basic single value 

- In JavaScript/TypeScript, primitives are: 

| Primitive | Example         |
| --------- | --------------- |
| number    | `10`, `3.14`    |
| string    | `"hello"`       |
| boolean   | `true`, `false` |
| null      | `null`          |
| undefined | `undefined`     |
| symbol    | `Symbol()`      |
| bigint    | `100n`          |


- Primitive = one simple value. Not an object. 

    No properties like `.name`, `.age`

- Primitives are basic data types like string, number, and boolean 

## Union Type 

- A union type allows this value ccan be one of multiple types. 

    `let id: number | string`

    This means, id can be a number, OR id can be a string. 

**Why this exists**

APIs often return: 

- number in one case 
- string in another 

Without union: 

- `let id: number;`

With union: 

- `let id: number | string`

- Union type allows a variable to accept multiple possible types safely. 


## Primitve Combinations 

- Primitive combination = union of primitive types 

`let status: "loading" | "success" | "error" ;` 

    All are strings (primitve). Combined using union. 

## `any`, `unknown` and `never` types

- any: no type checking. Not safe

- unknown: safer, forces valiation.

    unknown is safer than any because it enforces type checks.


## null Vs. undefined 

- `undefined` means a variable has been declared but not assigned a value. 

- `null` is an explicit value meaning no value. 


## Difference between interfaces and type aliases in TS


## Union and Intersection types in TS

1. **Union (|)**

- OR - value can be one of multiple types 

    `type ID = number | string ;` 

- Union types allow flexibility by accepting multiple types. 

2. **Intersection &**

- AND - value must satisfy all types. 

```ts
type User = {name: string} ;
type Admin = {role: string} ; 

type AdminUser = User & Admin ; 
```

    Must be employee AND manager. 

- Intersection types combine multiple types into one. 