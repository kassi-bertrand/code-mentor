"use server";

import { revalidatePath } from "next/cache";

export async function createPlayground(body: {
  name: string;
  description: string;
  visibility: string;
  language: string;
  userId: string;
}) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DATABASE_WORKER_URL}/api/playground`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.NEXT_PUBLIC_WORKERS_KEY}`,
      },
      body: JSON.stringify(body),
    }
  );

  return await res.text();
}

// Define the interface for a language object
interface LanguageInfo {
  language: string;
  version: string;
  aliases: string[];
  runtime?: string;
}

// Create the dictionary type
type LanguageDictionary = Record<string, LanguageInfo>;

export async function executeCode(editorLanguage: string, sourceCode: string) {
  // NOTE: I Acquired the list of languages and versions Piston supports using the following command:
  // "curl https://emkc.org/api/v2/piston/runtimes | jq"
  // With this information I created the following dictionary

  const languageDictionary: LanguageDictionary = {
    matl: {
      language: "matl",
      version: "22.7.4",
      aliases: [],
    },
    bash: {
      language: "bash",
      version: "5.2.0",
      aliases: ["sh"],
    },
    befunge93: {
      language: "befunge93",
      version: "0.2.0",
      aliases: ["b93"],
    },
    bqn: {
      language: "bqn",
      version: "1.0.0",
      aliases: [],
    },
    brachylog: {
      language: "brachylog",
      version: "1.0.0",
      aliases: [],
    },
    brainfuck: {
      language: "brainfuck",
      version: "2.7.3",
      aliases: ["bf"],
    },
    cjam: {
      language: "cjam",
      version: "0.6.5",
      aliases: [],
    },
    clojure: {
      language: "clojure",
      version: "1.10.3",
      aliases: ["clojure", "clj"],
    },
    cobol: {
      language: "cobol",
      version: "3.1.2",
      aliases: ["cob"],
    },
    coffeescript: {
      language: "coffeescript",
      version: "2.5.1",
      aliases: ["coffeescript", "coffee"],
    },
    cow: {
      language: "cow",
      version: "1.0.0",
      aliases: ["cow"],
    },
    crystal: {
      language: "crystal",
      version: "0.36.1",
      aliases: ["crystal", "cr"],
    },
    dart: {
      language: "dart",
      version: "2.19.6",
      aliases: [],
    },
    dash: {
      language: "dash",
      version: "0.5.11",
      aliases: ["dash"],
    },
    typescript_deno: {
      language: "typescript",
      version: "1.32.3",
      aliases: ["deno", "deno-ts"],
      runtime: "deno",
    },
    javascript_deno: {
      language: "javascript",
      version: "1.32.3",
      aliases: ["deno-js"],
      runtime: "deno",
    },
    basic_net: {
      language: "basic.net",
      version: "5.0.201",
      aliases: [
        "basic",
        "visual-basic",
        "visual-basic.net",
        "vb",
        "vb.net",
        "vb-dotnet",
        "dotnet-vb",
        "basic-dotnet",
        "dotnet-basic",
      ],
      runtime: "dotnet",
    },
    fsharp_net: {
      language: "fsharp.net",
      version: "5.0.201",
      aliases: [
        "fsharp",
        "fs",
        "f#",
        "fs.net",
        "f#.net",
        "fsharp-dotnet",
        "fs-dotnet",
        "f#-dotnet",
        "dotnet-fsharp",
        "dotnet-fs",
      ],
      runtime: "dotnet",
    },
    csharp_net: {
      language: "csharp.net",
      version: "5.0.201",
      aliases: [
        "csharp",
        "c#",
        "cs",
        "c#.net",
        "cs.net",
        "c#-dotnet",
        "cs-dotnet",
        "csharp-dotnet",
        "dotnet-c#",
        "dotnet-cs",
        "dotnet-csharp",
      ],
      runtime: "dotnet",
    },
    fsi: {
      language: "fsi",
      version: "5.0.201",
      aliases: [
        "fsx",
        "fsharp-interactive",
        "f#-interactive",
        "dotnet-fsi",
        "fsi-dotnet",
        "fsi.net",
      ],
      runtime: "dotnet",
    },
    dragon: {
      language: "dragon",
      version: "1.9.8",
      aliases: [],
    },
    elixir: {
      language: "elixir",
      version: "1.11.3",
      aliases: ["elixir", "exs"],
    },
    emacs: {
      language: "emacs",
      version: "27.1.0",
      aliases: ["emacs", "el", "elisp"],
    },
    emojicode: {
      language: "emojicode",
      version: "1.0.2",
      aliases: ["emojic"],
    },
    erlang: {
      language: "erlang",
      version: "23.0.0",
      aliases: ["erlang", "erl", "escript"],
    },
    file: {
      language: "file",
      version: "0.0.1",
      aliases: ["executable", "elf", "binary"],
    },
    forte: {
      language: "forte",
      version: "1.0.0",
      aliases: ["forter"],
    },
    forth: {
      language: "forth",
      version: "0.7.3",
      aliases: ["gforth"],
    },
    freebasic: {
      language: "freebasic",
      version: "1.9.0",
      aliases: ["bas", "fbc", "basic", "qbasic", "quickbasic"],
    },
    awk: {
      language: "awk",
      version: "5.1.0",
      aliases: ["gawk"],
      runtime: "gawk",
    },
    c: {
      language: "c",
      version: "10.2.0",
      aliases: ["gcc"],
      runtime: "gcc",
    },
    cpp: {
      language: "c++",
      version: "10.2.0",
      aliases: ["cpp", "g++"],
      runtime: "gcc",
    },
    d: {
      language: "d",
      version: "10.2.0",
      aliases: ["gdc"],
      runtime: "gcc",
    },
    fortran: {
      language: "fortran",
      version: "10.2.0",
      aliases: ["fortran", "f90"],
      runtime: "gcc",
    },
    go: {
      language: "go",
      version: "1.16.2",
      aliases: ["go", "golang"],
    },
    golfscript: {
      language: "golfscript",
      version: "1.0.0",
      aliases: ["golfscript"],
    },
    groovy: {
      language: "groovy",
      version: "3.0.7",
      aliases: ["groovy", "gvy"],
    },
    haskell: {
      language: "haskell",
      version: "9.0.1",
      aliases: ["haskell", "hs"],
    },
    husk: {
      language: "husk",
      version: "1.0.0",
      aliases: [],
    },
    iverilog: {
      language: "iverilog",
      version: "11.0.0",
      aliases: ["verilog", "vvp"],
    },
    japt: {
      language: "japt",
      version: "2.0.0",
      aliases: ["japt"],
    },
    java: {
      language: "java",
      version: "15.0.2",
      aliases: [],
    },
    jelly: {
      language: "jelly",
      version: "0.1.31",
      aliases: [],
    },
    julia: {
      language: "julia",
      version: "1.8.5",
      aliases: ["jl"],
    },
    kotlin: {
      language: "kotlin",
      version: "1.8.20",
      aliases: ["kt"],
    },
    lisp: {
      language: "lisp",
      version: "2.1.2",
      aliases: ["lisp", "cl", "sbcl", "commonlisp"],
    },
    llvm_ir: {
      language: "llvm_ir",
      version: "12.0.1",
      aliases: ["llvm", "llvm-ir", "ll"],
    },
    lolcode: {
      language: "lolcode",
      version: "0.11.2",
      aliases: ["lol", "lci"],
    },
    lua: {
      language: "lua",
      version: "5.4.4",
      aliases: [],
    },
    csharp_mono: {
      language: "csharp",
      version: "6.12.0",
      aliases: [
        "mono",
        "mono-csharp",
        "mono-c#",
        "mono-cs",
        "mono-csharp",
        "mono-csharp",
        "mono-dotnet",
      ],
      runtime: "mono",
    },
    nim: {
      language: "nim",
      version: "1.4.8",
      aliases: [],
    },
    node: {
      language: "javascript",
      version: "20.2.0",
      aliases: ["node-js", "node", "nodejs"],
      runtime: "node",
    },
    npm: {
      language: "javascript",
      version: "7.20.3",
      aliases: ["npm"],
      runtime: "node",
    },
    ocaml: {
      language: "ocaml",
      version: "4.14.0",
      aliases: ["ocaml", "ml"],
    },
    octave: {
      language: "octave",
      version: "5.2.0",
      aliases: [],
    },
    osabie: {
      language: "osabie",
      version: "0.4.7",
      aliases: [],
    },
    owo: {
      language: "owo",
      version: "1.2.3",
      aliases: [],
    },
    paradoc: {
      language: "paradoc",
      version: "1.1.2",
      aliases: [],
    },
    pascal: {
      language: "pascal",
      version: "3.2.2",
      aliases: ["ppc"],
    },
    perl: {
      language: "perl",
      version: "5.32.1",
      aliases: [],
    },
    php: {
      language: "php",
      version: "8.0.3",
      aliases: [],
    },
    prolog: {
      language: "prolog",
      version: "8.2.3",
      aliases: ["gprolog", "gnu-prolog", "gpl"],
    },
    powershell: {
      language: "powershell",
      version: "7.1.3",
      aliases: ["pwsh", "ps1", "powershell-core"],
    },
    // py2: {
    //   language: "python",
    //   version: "2.7.18",
    //   aliases: ["python2"],
    //   runtime: "cpython",
    // },
    python: {
      language: "python",
      version: "3.11.2",
      aliases: ["python3"],
      runtime: "cpython",
    },
    raku: {
      language: "raku",
      version: "6.d",
      aliases: ["raku", "rakudo", "perl6"],
    },
    r: {
      language: "r",
      version: "4.0.4",
      aliases: ["r"],
    },
    ruby: {
      language: "ruby",
      version: "3.0.0",
      aliases: ["rb"],
    },
    rust: {
      language: "rust",
      version: "1.50.0",
      aliases: ["rs"],
    },
    scala: {
      language: "scala",
      version: "2.13.5",
      aliases: [],
    },
    swift: {
      language: "swift",
      version: "5.3.3",
      aliases: [],
    },
    tcl: {
      language: "tcl",
      version: "8.6.11",
      aliases: ["tclsh"],
    },
    txr: {
      language: "txr",
      version: "267",
      aliases: [],
    },
    v: {
      language: "v",
      version: "0.2.2",
      aliases: [],
    },
    vala: {
      language: "vala",
      version: "0.48.16",
      aliases: ["vala"],
    },
    vim: {
      language: "vim",
      version: "8.2.3452",
      aliases: ["vim", "vimscript", "viml"],
    },
    csharp_vs: {
      language: "csharp",
      version: "2019.16",
      aliases: [
        "c#-vs2019",
        "vs2019",
        "vs2019-csharp",
        "vs2019-c#",
        "vs-csharp",
        "vs-c#",
        "vs-cs",
        "vs2019-cs",
      ],
      runtime: "vs",
    },
    vb_vs: {
      language: "visual-basic",
      version: "2019.16",
      aliases: ["vb-vs2019", "vs2019-vb", "vs2019-visual-basic", "vs-vb"],
      runtime: "vs",
    },
    whitespace: {
      language: "whitespace",
      version: "0.3.0",
      aliases: ["ws"],
    },
  };

  // Initiate API call to PISTON to run code
  const url = 'https://emkc.org/api/v2/piston/execute';
  const body = {
    language: editorLanguage,
    version: '*', // Latest version
    files: [
      {
        name: 'main',
        content: sourceCode
      }
    ]
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error executing code:", error);
    console.warn(error);
  }
}
