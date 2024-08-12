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
- [Express](https://expressjs.com/)
- [Socket.io](https://socket.io/)
- [Drizzle ORM](https://orm.drizzle.team/)

# How to run this project locally

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js (v18.17.0 or higher).
- You have a Git client installed (v2.30.0 or higher).
- You have npm installed (v10.8.1 or higher).
- you have wrangler installed (v10.7.0 or higher)
  
## Start by cloning the repository with:

```sh
git clone https://github.com/kassi-bertrand/code-mentor.git
```

## Frontend Setup

### Install the necessary dependencies

To run the frontend, enter the `frontend` folder, then install the packages with:

```sh
cd frontend
npm install
```

### Setup User authentication using `Clerk`

Those steps are important to be able to test the Sign-In/Sign-Up functionalities.

1. For this, head over to [Clerk](https://clerk.com), and create an account.

2. Create a new application, give it the name you want 💁‍♂️🙃.

3. Ensure that **only** `Email` and `username` are activated. You're selecting the option that will be made available to the user, when they try to authenticate on the website. On the side, you can immediately the form they'll be presented.

4. Tap the `Create Application` button.

5. You'll be given two API keys `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY`. Copy their values into your `.env` file (Create one if not already). For reference, an example environment file `env.example` is provided in the `frontend` folder.

## Backend Setup

Our backend consists of [Cloudflare `Workers`](https://developers.cloudflare.com/workers/get-started/). Each `Worker` has a different responsibility.

Read the documentation:
- [Cloudflare Workers](https://developers.cloudflare.com/workers/) to learn about `Workers` and how to create/use one yourself.
- [D1 database](https://developers.cloudflare.com/d1/get-started/) to learn how to setup a `D1` database, and interact with it using a Cloudflare `Worker`.

The steps described below are derived from this documentation ☝️.

### Setup the `Database` Worker

The `Database` Worker is responsible for handling database requests. It exposes different `API` routes and interact with a D1 database.

#### Install dependencies

```sh
cd backend/database
npm install
```

#### Generate the database schema

In the `backend/database` folder run:

```sh
npm run generate
```

It generate the schema to be used when creating the database a couple of steps later. After running this command, you should see a new `.sql` file appear in the `drizzle` folder. You can open the file and see what's inside! It's just raw SQL commands. The file describes the schema of the database that will created later. 💁‍♂️

#### Create a local D1 database 

Inside your `backend/database` folder, create a new `D1` database with the following command:

```sh
npx wrangler d1 create <database-name>
```

This command will output something like this:

```txt
✅ Successfully create DB '<database-name>'

[[d1_databases]]
binding = "DB"
database_name = "<database-name>"
database_id = "<unique-ID-for-your-database>"
```

This output is the binding configuration needed in the next step. Keep it.

#### Update the `wrangler.toml` file

`wrangler.toml` is the configuration file used to customize the development and deployment setup for a Cloudflare `Worker`. The `Database` Worker is no exception. If you're following this tutorial for the first time, you do not have a `wrangler.toml` file, so a `wrangler.example.toml` is provided as an example. You can rename this file, or copy its content to a file named `wrangler.toml`.

Using the output of the previous step, assign `database_name` and `database_id` their corresponding values.

#### Configure your `D1` database

With the `wrangler.toml` configured properly, we can initialize the database to run and test locally, first. Bootstrap your new D1 database by running:

```sh
npx wrangler d1 execute <database-name> --local --file=<path-to-the-sql-file>
```

#### Deploy the `Database` Worker locally

```sh
npx wrangler dev
```

After deploying the Worker locally, the command will give you a URL (most likely `localhost:8787`) where your Worker is running. Assign the provided Worker URL to the `NEXT_PUBLIC_DATABASE_WORKER_URL` variable located in your `frontend/.env` file.

Choose a super duper secret password, and assign it to the `NEXT_PUBLIC_WORKERS_KEY` variable in the `frontend/.env` file. Assign the very same password to the `AUTH_KEY` variable located inside your `backend/database/wrangler.toml`.


### Setup the `Storage` Worker

The `Storage` Worker is a serverless function that exposes an interface for interacting with large amounts of unstructured data. Behind the scenes, this Worker rests on Cloudflare's `R2` service, which is an AWS S3-compatible bucket.

The setup process of this worker is similar to the `Database` Worker. The process described here follows the tutorial on How to [Use R2 from Workers](https://developers.cloudflare.com/r2/api/workers/workers-api-usage/).

#### Install the dependencies

Assuming you're at the root of the project, install the Worker's dependencies with:

```sh
cd backend/storage
npm install
```

#### Create an `R2` bucket

Before proceeding, create a local R2 bucket if you haven't already. Assuming you're in the `backend/storage` folder issue the following command:

```sh
npx wrangler r2 bucket create <YOUR_BUCKET_NAME>
```

For this tutorial use, use the name `code-mentor-bucket`.

To ensure your bucket was created, do:

```sh
npx wrangler r2 bucket list
```

#### Create/Update your `wrangler.toml`

Assuming you're in the `backend/storage` folder, create a new file called `wrangler.toml`. There is already an example inside the `wrangler.example.toml` file, copy its content over to your new `wrangler.toml` file.

In your `wrangler.toml`, provide the values for the following variables

```toml
[[r2_buckets]]
binding = 'R2'
bucket_name = 'code-mentor-bucket'

# AUTH_KEY is the same value as in the Database Worker.
[vars]
AUTH_KEY = ''
```

#### Deploy the `Storage` Worker locally

To deploy your Worker locally, run:

```sh
npx wrangler dev
```

Now, just like the `Database` Worker, this Worker will also be deployed.

### Setup `Server`

`Server` is a NodeJS application which acts as a websocket server for the project.

Install dependencies with:

```sh
npm install
```

run the server with:

```sh
npx ts-node src/index.ts
```

After that, visit file like:

- `frontend/.env`
- `backend/database/.wrangler.toml`
- `backend/storage/.wrangler.toml`
- `backend/server/.env`

Ensure that all the variables have their values assigned.

## Run the CodeMentor application on your computer

Launch the development server:

```sh
npm run dev
```

This command will give you a URL (most likely `localhost:3000`) where CodeMentor is running. Copy and paste this URL in your web browser. You can try to register/login on the platform.

# Project Structure

```txt
.
├── backend
│   ├── database
│   ├── server
│   └── storage
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
| `backend/database` | API for interfacing with the D1 database (SQLite).

# How to contribute Code to the repository?

## Ensure you're on the `main` branch

Before proceeding, ensure that you're on the `main` branch, and have the latest changes with:

```sh
git checkout main
git pull origin main
```

The first command will switch you to the `main` branch if you're not already on it. If you're already on the `main` branch, it will simply tell you that you're already there. The second updates your local repository with the latest changes from the remote repository. It fetches the latest changes from the `main` branch on GitHub and merges them into the local branch you currently on.

## Create a new branch and switch to it

To implement your feature, bug fix, or documentation update, create a new branch and switch to it. When naming your branch, use a descriptive name that indicate the purpose of the changes. In this example, let's create a branch called `feature/short-description` and switch to it.

```sh
# Create a new branch and switch to the newly created branch
git checkout -b feature/short-description
```
Examples of Branch Names:

- `feature/add-login-page`

- `fix/issue-42-user-auth`

- `docs/update-readme`

- `refactor/code-cleanup`

At this point, you're no longer on the `main` branch, but on the `feature/short-description` branch.

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
