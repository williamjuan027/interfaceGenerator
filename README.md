# InterfaceGenerator

### What's this?
A simple tool that converts JSON input to a Typescript interface, built with angular.
The app is hosted on github pages and can be accessed [here](https://williamjuan027.github.io/interfaceGenerator/).

### Usage
**Input**
```
"maths": {
    "q1": {
        "question": "5 + 7 = ?",
        "options": [
            "10",
            "11",
            "12",
            "13"
        ],
        "answer": "12"
    },
    "q2": {
        "question": "12 - 8 = ?",
        "options": [
            "1",
            "2",
            "3",
            "4"
        ],
        "answer": "4"
    }
}
```  
**Output**
```ts
export interface Maths { 
  q1 : Q1 
  q2 : Q1 
}
export interface Q1 { 
  question : string 
  options : number[] 
  answer : string 
}
```
