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
        | 'typescript'
        | 'javascript'
        | 'python'
        | 'java'
        | 'ruby'
        | 'php'
        | 'csharp'
        | 'cpp'
        | 'go'
        | 'rust'
        | 'kotlin'
        | 'swift'
        | 'objective-c'
        | 'scala'
        | 'shell'
        | 'sql'
        | 'perl'
        | 'r'
        | 'dart'
        | 'lua'
        | 'groovy'
        | 'haskell'
        | 'erlang'
        | 'elixir'
        | 'clojure'
        | 'coffeescript'
        | 'ocaml'
        | 'fsharp'
        | 'scheme'
        | 'vbscript'
        | 'powershell'
        | 'matlab'
        | 'json'
        | 'xml'
        | 'yaml'
        | 'toml'
        | 'ini'
        | 'markdown'
        | 'html'
        | 'css'
        | 'scss'
        | 'less'
        | 'svg'
        | 'plaintext';
    visibility: "public" | "private";
    createdAt: Date;
    userId: string;
  };
  
// TODO: Define a "UsersToPlaygrounds" type