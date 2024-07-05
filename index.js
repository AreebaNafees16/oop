#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Base class representing a generic Person
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet() {
        console.log(chalk.cyanBright(`Hello, my name is ${this.name} and I am ${this.age} years old.`));
    }
}
// Derived class representing a Student, extending the Person class
class Student extends Person {
    grade;
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    greet() {
        super.greet();
        console.log(chalk.cyanBright(`I am in grade ${this.grade}.`));
    }
}
// Function to ask user for input
async function getUserInput() {
    const answers = await inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: chalk.magentaBright("What is your name?"),
        },
        {
            type: "number",
            name: "age",
            message: chalk.magentaBright("How old are you?"),
        },
        {
            type: "confirm",
            name: "isStudent",
            message: chalk.magentaBright("Are you a student?"),
        },
        {
            type: "number",
            name: "grade",
            message: chalk.magentaBright("What grade are you in?"),
            when: (answers) => answers.isStudent,
        },
    ]);
    if (answers.isStudent) {
        return new Student(answers.name, answers.age, answers.grade);
    }
    else {
        return new Person(answers.name, answers.age);
    }
}
// Main function to run the program
async function main() {
    const person = await getUserInput();
    person.greet();
}
main();
