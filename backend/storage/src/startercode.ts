const startercode = {
	typescript: [
		{
			name: 'index.ts',
			body: `function greet(name: string): string {
    return 'Hello, ' + name + '!';
}

console.log(greet('World'));`,
		},
	],
	javascript: [
		{
			name: 'index.js',
			body: `function greet(name) {
    return 'Hello, ' + name + '!';
}

console.log(greet('World'));`,
		},
	],
	python: [
		{
			name: 'main.py',
			body: `def greet(name):
    return f'Hello, {name}!'

print(greet('World'))`,
		},
	],
	java: [
		{
			name: 'Main.java',
			body: `public class Main {
    public static void main(String[] args) {
        System.out.println(greet("World"));
    }

    public static String greet(String name) {
        return "Hello, " + name + "!";
    }
}`,
		},
	],
	ruby: [
		{
			name: 'main.rb',
			body: `def greet(name)
    "Hello, #{name}!"
end

puts greet('World')`,
		},
	],
	php: [
		{
			name: 'index.php',
			body: `<?php
function greet($name) {
    return "Hello, " . $name . "!";
}

echo greet("World");
?>`,
		},
	],
	csharp: [
		{
			name: 'Program.cs',
			body: `using System;

class Program {
    static void Main() {
        Console.WriteLine(Greet("World"));
    }

    static string Greet(string name) {
        return "Hello, " + name + "!";
    }
}`,
		},
	],
	cpp: [
		{
			name: 'main.cpp',
			body: `#include <iostream>
#include <string>

std::string greet(const std::string& name) {
    return "Hello, " + name + "!";
}

int main() {
    std::cout << greet("World") << std::endl;
    return 0;
}`,
		},
	],
	go: [
		{
			name: 'main.go',
			body: `package main

import "fmt"

func greet(name string) string {
    return "Hello, " + name + "!"
}

func main() {
    fmt.Println(greet("World"))
}`,
		},
	],
	rust: [
		{
			name: 'main.rs',
			body: `fn greet(name: &str) -> String {
    format!("Hello, {}!", name)
}

fn main() {
    println!("{}", greet("World"));
}`,
		},
	],
	kotlin: [
		{
			name: 'Main.kt',
			body: `fun greet(name: String): String {
    return "Hello, $name!"
}

fun main() {
    println(greet("World"))
}`,
		},
	],
	swift: [
		{
			name: 'main.swift',
			body: `func greet(name: String) -> String {
    return "Hello, " + name + "!"
}

print(greet(name: "World"))`,
		},
	],
	'objective-c': [
		{
			name: 'main.m',
			body: `#import <Foundation/Foundation.h>

NSString* greet(NSString* name) {
    return [NSString stringWithFormat:@"Hello, %@!", name];
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"%@", greet(@"World"));
    }
    return 0;
}`,
		},
	],
	scala: [
		{
			name: 'Main.scala',
			body: `object Main extends App {
    def greet(name: String): String = s"Hello, $name!"
    println(greet("World"))
}`,
		},
	],
	shell: [
		{
			name: 'script.sh',
			body: `#!/bin/bash

greet() {
    echo "Hello, $1!"
}

greet "World"`,
		},
	],
	sql: [
		{
			name: 'script.sql',
			body: `SELECT 'Hello, World!' AS greeting;`,
		},
	],
	perl: [
		{
			name: 'main.pl',
			body: `sub greet {
    my $name = shift;
    return "Hello, $name!";
}

print greet("World"), "\n";`,
		},
	],
	r: [
		{
			name: 'main.R',
			body: `greet <- function(name) {
    paste("Hello,", name, "!")
}

print(greet("World"))`,
		},
	],
	dart: [
		{
			name: 'main.dart',
			body: `String greet(String name) {
    return 'Hello, \$name!';
}

void main() {
    print(greet('World'));
}`,
		},
	],
	lua: [
		{
			name: 'main.lua',
			body: `function greet(name)
    return "Hello, " .. name .. "!"
end

print(greet("World"))`,
		},
	],
	groovy: [
		{
			name: 'main.groovy',
			body: `def greet(name) {
    "Hello, $name!"
}

println(greet("World"))`,
		},
	],
	haskell: [
		{
			name: 'Main.hs',
			body: `greet :: String -> String
greet name = "Hello, " ++ name ++ "!"

main = putStrLn (greet "World")`,
		},
	],
	erlang: [
		{
			name: 'main.erl',
			body: `-module(main).
-export([greet/1, main/0]).

greet(Name) ->
    "Hello, " ++ Name ++ "!".

main() ->
    io:format("~s~n", [greet("World")]).`,
		},
	],
	elixir: [
		{
			name: 'main.exs',
			body: `defmodule Greeter do
    def greet(name) do
        "Hello, \#{name}!"
    end
end

IO.puts Greeter.greet("World")`,
		},
	],
	clojure: [
		{
			name: 'main.clj',
			body: `(defn greet [name]
  (str "Hello, " name "!"))

(println (greet "World"))`,
		},
	],
	coffeescript: [
		{
			name: 'main.coffee',
			body: `greet = (name) ->
    "Hello, #{name}!"

console.log greet "World"`,
		},
	],
	ocaml: [
		{
			name: 'main.ml',
			body: `let greet name =
    "Hello, " ^ name ^ "!"

let () =
    print_endline (greet "World")`,
		},
	],
	fsharp: [
		{
			name: 'Program.fs',
			body: `let greet name =
    "Hello, " + name + "!"

[<EntryPoint>]
let main argv =
    printfn "%s" (greet "World")
    0`,
		},
	],
	scheme: [
		{
			name: 'main.scm',
			body: `(define (greet name)
    (string-append "Hello, " name "!"))

(display (greet "World"))
(newline)`,
		},
	],
	vbscript: [
		{
			name: 'main.vbs',
			body: `Function Greet(name)
    Greet = "Hello, " & name & "!"
End Function

WScript.Echo Greet("World")`,
		},
	],
	powershell: [
		{
			name: 'script.ps1',
			body: `function Greet {
    param([string]$name)
    return "Hello, $name!"
}

Write-Output (Greet "World")`,
		},
	],
	matlab: [
		{
			name: 'main.m',
			body: `function greeting = greet(name)
    greeting = ['Hello, ' name '!'];
end

disp(greet('World'))`,
		},
	],
	json: [
		{
			name: 'example.json',
			body: `{
    "greeting": "Hello, World!"
}`,
		},
	],
	xml: [
		{
			name: 'example.xml',
			body: `<greeting>Hello, World!</greeting>`,
		},
	],
	yaml: [
		{
			name: 'example.yaml',
			body: `greeting: "Hello, World!"`,
		},
	],
	toml: [
		{
			name: 'example.toml',
			body: `greeting = "Hello, World!"`,
		},
	],
	ini: [
		{
			name: 'example.ini',
			body: `[greeting]
message=Hello, World!`,
		},
	],
	markdown: [
		{
			name: 'README.md',
			body: `# Hello World

This is a simple "Hello, World!" example.`,
		},
	],
	html: [
		{
			name: 'index.html',
			body: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hello World</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
		},
	],
	css: [
		{
			name: 'styles.css',
			body: `body {
    font-family: Arial, sans-serif;
    text-align: center;
    margin-top: 50px;
}

h1 {
    color: #333;
}`,
		},
	],
	scss: [
		{
			name: 'styles.scss',
			body: `$font-stack: Arial, sans-serif;
$primary-color: #333;

body {
    font-family: $font-stack;
    text-align: center;
    margin-top: 50px;
}

h1 {
    color: $primary-color;
}`,
		},
	],
	less: [
		{
			name: 'styles.less',
			body: `@font-stack: Arial, sans-serif;
@primary-color: #333;

body {
    font-family: @font-stack;
    text-align: center;
    margin-top: 50px;
}

h1 {
    color: @primary-color;
}`,
		},
	],
	svg: [
		{
			name: 'example.svg',
			body: `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <text x="50%" y="50%" font-size="20" text-anchor="middle" fill="black">Hello, World!</text>
</svg>`,
		},
	],
	plaintext: [
		{
			name: 'hello.txt',
			body: `Hello, World!`,
		},
	],
};

export default startercode