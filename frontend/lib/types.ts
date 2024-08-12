// DB Types

export type User = {
  id: string;
  name: string;
  email: string;
  generations: number;
  playground: Playground[];
  // usersToSandboxes: UsersToSandboxes[];
};

export type Playground = {
  id: string;
  name: string;
  language:
    | "typescript"
    | "javascript"
    | "python"
    | "java"
    | "ruby"
    | "php"
    | "csharp"
    | "cpp"
    | "go"
    | "rust"
    | "kotlin"
    | "swift"
    | "objective-c"
    | "scala"
    | "shell"
    | "sql"
    | "perl"
    | "r"
    | "dart"
    | "lua"
    | "groovy"
    | "haskell"
    | "erlang"
    | "elixir"
    | "clojure"
    | "coffeescript"
    | "ocaml"
    | "fsharp"
    | "scheme"
    | "vbscript"
    | "powershell"
    | "matlab"
    | "json"
    | "xml"
    | "yaml"
    | "toml"
    | "ini"
    | "markdown"
    | "html"
    | "css"
    | "scss"
    | "less"
    | "svg"
    | "plaintext";
  visibility: "public" | "private";
  createdAt: Date;
  userId: string;
};

export type R2Files = {
  objects: R2FileData[];
  truncated: boolean;
  delimitedPrefixes: any[];
};

export type R2FileData = {
  storageClass: string;
  uploaded: string;
  checksums: any;
  httpEtag: string;
  etag: string;
  size: number;
  version: string;
  key: string;
};

export type TFolder = {
  id: string;
  type: "folder";
  name: string;
  children: (TFile | TFolder)[];
};

export type TFile = {
  id: string;
  type: "file";
  name: string;
};

export type TTab = TFile & {
  saved: boolean;
};

export type TFileData = {
  id: string;
  data: string;
};
// TODO: Define a "UsersToPlaygrounds" type
