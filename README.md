# Debug Dungeon

The frontend of a project for listing, creating and commenting on educational programming mini-projects.

## Setup
Make sure to install dependencies:
```bash
# npm
npm install
# pnpm
pnpm install
# yarn
yarn install
# bun
bun install
```
## Development Server
Start the development server on `http://localhost:3000`:
```bash
# npm
npm run dev
# pnpm
pnpm dev
# yarn
yarn dev
# bun
bun run dev
```
## Production
Build the application for production:
```bash
# npm
npm run build
# pnpm
pnpm build
# yarn
yarn build
# bun
bun run build
```
Locally preview production build:
```bash
# npm
npm run preview
# pnpm
pnpm preview
# yarn
yarn preview
# bun
bun run preview
```

## TODO
### Visual
- [x] Navbar
- [x] Home page view
    - [x] Project list link
    - [x] Create project link
    - [x] Login/Register/User settings link
- [x] Projects list view
    - [x] Filter by user
    - [x] Search
    - [x] List
    - [x] Pagination
- [x] Project detail view
    - [x] Project details
    - [x] Comments
        - [x] Comments list
        - [x] Delete button for own comment
        - [x] Create comment form
    - [x] Edit/Delete Project redirects
- [x] Create Project form
- [x] Edit Project form
- [x] Auth
    - [x] Login form
    - [x] Register form
- [x] User details view
    - [x] List user projects
    - [x] List user comments
### Logic
- [ ] Auth
  - [x] <span style="color:red">Sessions</span>
  - [ ] <span style="color:red">Redirect to login if unauthorized</span>
  - [ ] Login
    - [x] <span style="color:red">General</span>.
    - [x] <span style="color:green">Initial validation logic</span>
    - [ ] <span style="color:blue">Proper value validation logic</span>
    - [ ] <span style="color:blue">Error handling</span>
  - [ ] Logout functionality
    - [x] <span style="color:red">General</span>
    - [ ] <span style="color:green">Fix issues with not logging out</span>
  - [ ] Register
    - [x] <span style="color:red">General</span>
    - [x] <span style="color:green">Initial validation logic</span>
    - [ ] <span style="color:blue">Proper value validation logic</span>.
    - [ ] <span style="color:blue">Error handling</span>
- [x] Navbar
  - [x] <span style="color:red">Responsive design based on if user is logged in</span>
  - [x] <span style="color:red">New Project button visibility based on if user is logged in</span>
- [x] Home page view
  - [x] <span style="color:red">Responsive design based on if user is logged in</span>
  - [ ] <span style="color:blue">Fix initial UI flickering to guest page when user is logged in</span>
- [ ] Projects list view
  - [x] <span style="color:red">List of projects</span>
  - [ ] Filter
    - [ ] <span style="color:red">Shirt size filter functionality</span>
    - [ ] <span style="color:red">Tag filter functionality</span>
    - [ ] <span style="color:red">User filter functionality</span>
  - [ ] <span style="color:red">Search functionality</span>
  - [ ] <span style="color:green">Pagination functionality</span>
  - [x] <span style="color:red">Proper project id functionality</span>
- [ ] Project detail view
  - [x] <span style="color:red">General details view</span>
  - [x] <span style="color:red">Responsiveness to session and owner of project along with the edit/delete buttons</span>
  - [x] <span style="color:red">Edit button functionality</span>
  - [x] <span style="color:red">Delete functionality</span>
  - [ ] Comments
    - [x] <span style="color:red">Comments list</span>
    - [x] <span style="color:green">Responsiveness to whether user owns comment along with the delete button</span>
    - [x] <span style="color:green">Delete functionality</span>
    - [ ] CommentForm
      - [x] <span style="color:red">Create comment functionality</span>
      - [ ] <span style="color:green">Validation</span>
      - [ ] <span style="color:green">Error handling</span>
- [ ] ProjectForm (create/edit project)
  - [x] <span style="color:red">Edit project</span>
  - [x] <span style="color:red">Create project</span>
  - [ ] <span style="color:green">Validation</span>
  - [ ] <span style="color:green">Error handling</span>
- [x] User details
  - [x] <span style="color:red">List user projects</span>
  - [x] <span style="color:red">List user comments</span>
