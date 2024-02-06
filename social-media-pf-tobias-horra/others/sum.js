#!/usr/bin/env node

// Get command-line arguments
const args = process.argv.slice(2);

// Ensure that two arguments are provided
if (args.length !== 2) {
  console.error('Error: Please provide exactly two numbers as arguments.');
  process.exit(1); // Exit with an error code
}

// Parse the arguments as numbers
const num1 = parseFloat(args[0]);
const num2 = parseFloat(args[1]);

// Check if the provided arguments are valid numbers
if (isNaN(num1) || isNaN(num2)) {
  console.error('Error: Please provide valid numbers as arguments.');
  process.exit(1); // Exit with an error code
}

// Calculate and output the sum
const sum = num1 + num2;
console.log("The sum of " + num1 + " and " + num2 + " is: " + sum);
