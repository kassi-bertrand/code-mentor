# Code Mentor

Code Mentor is an AI-Powered Interactive coding playground that integrates LLM capabilities to provide practice, assessment, provide contextual help, and feedback for coding skills.

# Tech Stack 🛠️

### Frontend

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Clerk](https://clerk.com/)
- [Monaco](https://microsoft.github.io/monaco-editor/)
- [Liveblocks](https://liveblocks.io/)

### Backend

- [Cloudflare Workers](https://developers.cloudflare.com/workers/)
  - [D1 database](https://developers.cloudflare.com/d1/)
  - [R2 storage](https://developers.cloudflare.com/r2/)
  - [Workers AI](https://developers.cloudflare.com/workers-ai/)
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [Drizzle ORM](https://orm.drizzle.team/)
- [E2B](https://e2b.dev/)

# How to run this project locally

1. Start by cloning the repsitory with:

```sh
git clone https://github.com/kassi-bertrand/code-mentor.git
```

### Frontend

To run the frontend, enter the `frontend` folder, then install the packages with:

```sh
cd frontend
npm install
```
Launch the development server:

```sh
npm run dev
```

### Backend

The project has no backend, yet. Will populate this section once we start building it 🤣.

# Project Structure

```txt
.
├── backend
└── frontend
    ├── app
    ├── assets
    ├── components
    ├── lib
    └── public
```
| Path               | Description                                                                |
| ------------------ | -------------------------------------------------------------------------- |
| `frontend`         | The Next.js application for the frontend.                                  |

# How to contribute?

1. Create a new branch for your feature, bug fix, or documentation update. Use a descriptive name for your branch that indicates the purpose of the changes. In this example, we'll create a branch called `feature/short-description`.

```sh
# Create a new branch
git checkout -b feature/short-description
```
Examples of Branch Names:

- `feature/add-login-page`

- `fix/issue-42-user-auth`

- `docs/update-readme`

- `refactor/code-cleanup`

2. Make your changes

Edit the files and make your changes. Follow any existing coding standards and guidelines for the project.

3. Commit your changes

Before committing, ensure your commit message follows the [Conventional Commits format](https://www.conventionalcommits.org/en/v1.0.0/)

#### Commit Message Format

Use the format category(scope or module): message. The categories and their purposes are:

- `feat` or `feature`: Introducing new features or code.

- `fix`: Fixing bugs (referencing an issue if applicable).

- `refactor`: Refactoring code that isn’t a feature or a fix.

- `docs`: Changes to documentation files.

- `chore`: Other changes that don't fit the above categories.

Example:

```sh
# Add changes to the staging area
git add .

# Commit with a meaningful message
git commit -m "feat(login): add user authentication"
```

5. Push Your Branch

Push your branch to the main repository on GitHub

```sh
# Push your branch to the main repository
git push origin feature/short-description
```

6. Create a Pull Request

**NOTE: Make sure you can run the code with your changes, before submitting a pull request.**

- Go to the repository on GitHub.

- Navigate to the "Pull Requests" tab.

- Click on "New Pull Request".

- Select your branch and provide a detailed description of the changes.

Ensure your pull request includes:

- A clear and concise title.

- A description of what the changes do.

- Links to any relevant issues (if applicable).

7. Respond to Feedback

Once your pull request is submitted, team members will review your changes. Be sure to check for comments and suggestions, and make any necessary updates to your branch.

#### Commands for updating the branch:

```sh
# Pull the latest changes from the main branch, first
git pull origin main

# Merge the main branch into your feature branch
git checkout feature/short-description
git merge main

# Resolve any conflicts, add, and commit the changes
git add .
git commit -m "fix: resolve merge conflicts"

# Push the updated branch
git push origin feature/short-description
```

8. Merge the Pull Request

After your pull request is approved, it can be merged into the main branch. A team member with the necessary permissions will handle this.

Note: Once the pull request is merged, the branch should be deleted to keep the repository clean.

9. Clean Up Your Local Repository

After your changes are merged, you should delete the local branch to avoid clutter.

```sh
# Switch to the main branch
git checkout main

# Pull the latest changes
git pull origin main

# Delete the branch locally
git branch -d feature/short-description

# Delete the branch from the main respository on GitHub
git push origin --delete feature/short-description
```
