import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


/**
 * Determines the file type based on the file extension.
 *
 * This function takes a file name as input and returns the file type as a string.
 * It handles a wide range of programming languages and common file types.
 *
 * @param {string} file - The name of the file, including the extension.
 * @returns {string} The file type as a string. If the file type is unknown, it returns "plaintext".
 *
 * Usage:
 * ```
 * const fileType = determineFileType("example.ts");
 * console.log(fileType); // Output: "typescript"
 * ```
 */
 export function determineFileType(file: string): string {
   // Extract the file extension
   const ending = file.split(".").pop()

   // Determine the file type based on the extension
   switch (ending) {
     case "ts":
     case "tsx":
       return "typescript"
     case "js":
     case "jsx":
       return "javascript"
     case "py":
       return "python"
     case "java":
       return "java"
     case "rb":
       return "ruby"
     case "php":
       return "php"
     case "cs":
       return "csharp"
     case "cpp":
     case "cxx":
     case "cc":
     case "c":
       return "cpp"
     case "go":
       return "go"
     case "rs":
       return "rust"
     case "kt":
     case "kts":
       return "kotlin"
     case "swift":
       return "swift"
     case "m":
     case "mm":
       return "objective-c"
     case "scala":
       return "scala"
     case "sh":
       return "shell"
     case "sql":
       return "sql"
     case "pl":
     case "pm":
       return "perl"
     case "r":
       return "r"
     case "dart":
       return "dart"
     case "lua":
       return "lua"
     case "groovy":
       return "groovy"
     case "hs":
       return "haskell"
     case "erl":
     case "hrl":
       return "erlang"
     case "ex":
     case "exs":
       return "elixir"
     case "clj":
     case "cljs":
     case "cljc":
       return "clojure"
     case "coffee":
       return "coffeescript"
     case "ml":
     case "mli":
       return "ocaml"
     case "fs":
     case "fsi":
     case "fsx":
     case "fsscript":
       return "fsharp"
     case "scm":
     case "ss":
       return "scheme"
     case "vb":
     case "vbs":
       return "vbscript"
     case "ps1":
       return "powershell"
     case "mat":
       return "matlab"
     case "h":
     case "hpp":
       return "cpp" // Headers typically belong to C/C++
     case "json":
       return "json"
     case "xml":
       return "xml"
     case "yaml":
     case "yml":
       return "yaml"
     case "toml":
       return "toml"
     case "ini":
       return "ini"
     case "md":
       return "markdown"
     case "html":
     case "htm":
       return "html"
     case "css":
       return "css"
     case "scss":
       return "scss"
     case "less":
       return "less"
     case "svg":
       return "svg"
     default:
       return "plaintext"
  }
}
