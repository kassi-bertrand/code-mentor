export const LANGUAGE_VERSIONS = {
  typescript: '5.0.3',
  javascript: '18.15.0',
    python : '3.10.0',
    java: '15.0.2',
  ruby: '3.0.1',
    php: '8.2.3',
    csharp: '6.12.0',
    cpp: '10.2.0',
    go: '1.16.2',
    rust: '1.68.2',
    kotlin: '1.8.20',
    swift: '5.3.3',
    scala: '3.2.2',
    sqlite3:'3.36.0',
    perl:'5.36.0',
  rscript: '4.1.1',
    dart: '2.19.6',
    lua: '5.4.4',
    groovy: '3.0.7',
    haskell: '9.0.1',
    erlang: '23.0.0',
    elixir: '1.11.3',
    clojure: '1.10.3',
    coffeescript: '2.5.1',
    ocaml: '4.12.0',
    powershell: '7.1.4',
    matl:'22.7.4',
  bash: '5.2.0'
};

export const USER_LEVEL = [
  "Beginner",
  "Intermediate",
  "Expert"
];

export const CODE_SNIPPETS = {
        javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Alex");\n`,
        typescript: `\ntype Params = {\n\tname: string;\n}\n\nfunction greet(data: Params) {\n\tconsole.log("Hello, " + data.name + "!");\n}\n\ngreet({ name: "Alex" });\n`,
        python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Alex")\n`,
        java: `\npublic class HelloWorld {\n\tpublic static void main(String[] args) {\n\t\tSystem.out.println("Hello World");\n\t}\n}\n`,
        csharp:
          'using System;\n\nnamespace HelloWorld\n{\n\tclass Hello { \n\t\tstatic void Main(string[] args) {\n\t\t\tConsole.WriteLine("Hello World in C#");\n\t\t}\n\t}\n}\n',
        php: "<?php\n\n$name = 'Alex';\necho $name;\n",
};
