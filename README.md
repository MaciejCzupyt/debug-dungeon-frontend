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
- [x] Auth
  - [x] <span style="color:red">Sessions</span>
  - [x] <span style="color:red">Redirect to login if unauthorized</span>
  - [ ] Login
    - [x] <span style="color:red">General</span>.
    - [x] <span style="color:green">Initial validation logic</span>
    - [x] <span style="color:blue">Proper value validation logic</span>
    - [x] <span style="color:blue">Error handling</span>
  - [x] Logout functionality
    - [x] <span style="color:red">General</span>
  - [x] Register
    - [x] <span style="color:red">General</span>
    - [x] <span style="color:green">Initial validation logic</span>
    - [x] <span style="color:blue">Proper value validation logic</span>.
    - [x] <span style="color:blue">Error handling</span>
- [x] Navbar
  - [x] <span style="color:red">Responsive design based on if user is logged in</span>
  - [x] <span style="color:red">New Project button visibility based on if user is logged in</span>
- [x] Home page view
  - [x] <span style="color:red">Responsive design based on if user is logged in</span>
- [x] Projects list view
  - [x] <span style="color:red">List of projects</span>
  - [x] Filter
    - [x] <span style="color:green">Router query</span>
    - [x] <span style="color:red">Shirt size filter functionality</span>
    - [x] <span style="color:red">Tag filter functionality</span>
    - [x] <span style="color:red">User filter functionality</span>
    - [x] <span style="color:red">Search functionality</span>
  - [x] <span style="color:green">Pagination functionality</span>
  - [x] <span style="color:red">Proper project id functionality</span>
- [ ] Project detail view
  - [x] <span style="color:red">General details view</span>
  - [x] <span style="color:red">Responsiveness to session and owner of project along with the edit/delete buttons</span>
  - [x] <span style="color:red">Edit button functionality</span>
  - [x] <span style="color:red">Delete functionality</span>
  - [x] Comments
    - [x] <span style="color:red">Comments list</span>
    - [x] <span style="color:green">Responsiveness to whether user owns comment along with the delete button</span>
    - [x] <span style="color:green">Delete functionality</span>
    - [x] CommentForm
      - [x] <span style="color:red">Create comment functionality</span>
      - [x] <span style="color:green">Validation</span>
      - [x] <span style="color:green">Error handling</span>
- [x] ProjectForm (create/edit project)
  - [x] <span style="color:red">Edit project</span>
  - [x] <span style="color:red">Create project</span>
  - [x] <span style="color:green">Validation</span>
  - [x] <span style="color:green">Error handling</span>
- [x] User details
  - [x] <span style="color:red">List user projects</span>
  - [x] <span style="color:red">List user comments</span>
- [ ] Tags
  - [ ] <span style="color:blue">Suggest existing tags on user input</span>

### Fixes
- [x] Home page flickering from guest page to user page
- [x] (Haven't happened in a while ¯\_(ツ)_/¯ ) Not logging out sometimes, even after restarting server
- [x] (Fixed itself??) FOUC after implementing pagination
- [ ] CSS issues with text going out of bound in project detail view, comments etc
- [x] Filter not being applied when scrolling through pages