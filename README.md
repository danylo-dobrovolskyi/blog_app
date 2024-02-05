## Installation

1. Clone the repository
2. Navigate to the project directory

```bash
# Install Dependencies
$ npm install
```

# 🚀 Getting started with Strapi

### `start`

Start your Strapi application

```
npm run start
# or
yarn start
```

# 🚀 Getting started with Next.js

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## Creating a Data Model for a Blog Post In the Strapi admin panel, go to "Content-Types Builder."

- Click "Create new collection type."

- Enter a name for your model, e.g., "Post."

- Add fields that you want to include in your Post model. Typical fields can include:

- Title - Type: Text.
- Content - Type: Rich Text(Markdown).
- Author - Type: Relation (usually, a "many-to-one" relation with the built-in Users model to specify the post's author).
Save your changes.

Click "Save" and then "Publish" to publish the model.
