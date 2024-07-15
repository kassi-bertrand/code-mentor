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

### Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js (v18.17.0 or higher, or v20.5.0 or higher).
- You have a Git client installed (v2.30.0 or higher).
- You have npm installed (v10.8.1 or higher).

### Start by cloning the repsitory with:

```sh
git clone https://github.com/kassi-bertrand/code-mentor.git
```

### Frontend Setup

#### Install the necessary dependencies

To run the frontend, enter the `frontend` folder, then install the packages with:

```sh
cd frontend
npm install
```

#### Setup User authentication using `Clerk`

Those steps are important to be able to test the Sign-In/Sign-Up functionalities.

1. For this, head over to [Clerk](https://clerk.com), and create an account.

2. Create a new application, give it the name you want 💁‍♂️🙃.

3. Ensure that **only** `Email` and `username` are activated. You're selecting the option that will be made available to the user, when they try to authenticate on the website. On the side, you can immediately the form they'll be presented.

4. Tap the `Create Application` button.

5. You'll be given two API keys `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`. Copy their values into your `.env` file (Create one if not already). For reference, an example environment file `env.example` is provided in the `frontend` folder.

#### Run the frontend application on your computer

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

# How to contribute Code to the repository?

## Ensure you're on the `main` branch

Before proceeding, ensure that you're on the `main` branch with:

```sh
git checkout main
```
This command will switch you to the `main` branch if you're not already on it. If you're already on the `main` branch, it will simply tell you that you're already there.

## Create a new branch

To create a new branch for your feature, bug fix, or documentation update. Use a descriptive name for your branch that indicates the purpose of the changes. In this example, we'll create a branch called `feature/short-description`.

```sh
# Create a new branch
git checkout -b feature/short-description
```
Examples of Branch Names:

- `feature/add-login-page`

- `fix/issue-42-user-auth`

- `docs/update-readme`

- `refactor/code-cleanup`

## Make your changes

Edit the files and make your changes to implement your feature, bug fix, or documentation update, etc. Follow any existing coding standards and guidelines for the project.

## Commit your changes

Before committing, ensure your commit message follows the [Conventional Commits format](https://www.conventionalcommits.org/en/v1.0.0/)

Ensure that your commit messages follow the format: **category(scope or module): message**. The categories and their purposes are:

- `feat` or `feature`: Introducing new features or code.

- `fix`: Fixing bugs (referencing an issue if applicable).

- `refactor`: Refactoring code that isn’t a feature or a fix.

- `docs`: Changes to documentation files.

- `chore`: Other changes that don't fit the above categories.

- If not listed, come up with a short but descriptive category name.

Here is an example to perform one commit on your branch:

```sh
# Add changes to the staging area
git add <files-you-modified>

# Example commit with a meaningful message following following format.
git commit -m "feat(login): add user authentication"
```

**Note**: If you're making changes in more than two files, you do not want all those changes to be in just one commit. Instead, spread your changes across multiple commits with meaningful commit messages so that it's easy to follow your steps to implement/fix/update something.

## Push Your Local Branch to GitHub

So, far all the work you've conducted happened on your local machine. So, all the changes you made are only visible to you and are not present on GitHub. In this step, you're pushing your branch with your changes to GitHub.

Push your local branch to the repository on GitHub with:

```sh
# Push your branch to the main repository
git push origin feature/short-description
```

**NOTE: Make sure you can run the code with your changes, before submitting a pull request.**

## Create a Pull Request

After the previous step, you should see the branch you created on computer also appear our github. Now, you can create a new pull request from the branch you created (i.e. `feature/short-description`) into the `main` branch.

- Go to the repository on GitHub.

- Navigate to the "Pull Requests" tab.

- Click on "New Pull Request".

- Select your branch and provide a detailed description of the changes.

Ensure your pull request includes:

- A clear and concise title.

- A description of what the changes do.

- Links to any relevant issues (if applicable).

- Mention Kassi as reviewer to your pull request.

## Respond to Feedback

Once your pull request is submitted, team members will review your changes, and provide feedback. Be sure to check for comments and suggestions, and make any necessary updates to your branch.

Commands for updating the branch are:

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

## Merge the Pull Request

After your pull request is approved, it can be merged into the `main` branch. A team member with the necessary permissions will handle this.

**Note**: Once the pull request is merged, the branch should be deleted to keep the repository clean.

## Clean Up Your Local Repository

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
