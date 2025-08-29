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
- [ ] Edit Project form
- [ ] Auth
    - [ ] Login form
    - [ ] Register form
- [ ] User details view
    - [ ] List user projects
    - [ ] List user comments
### Logic
- [ ] Auth
    - [ ] Login
    - [ ] Register
    - [ ] Session functionality
- [ ] Navbar
  - [ ] Login/Register/Profile responsiveness based on if user is logged in
  - [ ] New Project button visibility based on if user is logged in
- [ ] Home page view
  - [ ] Responsiveness to if user is logged in
- [ ] Projects list view
  - [ ] Filter
    - [ ] Shirt size filter functionality
    - [ ] Tag filter functionality
    - [ ] User filter functionality
  - [ ] Search functionality
  - [ ] Pagination functionality
  - [ ] Proper project id functionality
- [ ] Project detail view
  - [ ] Responsiveness to session and owner of project along with the edit/delete buttons
  - [ ] Edit functionality
  - [ ] Delete functionality
  - [ ] Comments
    - [ ] Responsiveness to whether user owns comment along with the delete button
      - [ ] Delete functionality
    - [ ] Create comment functionality
- [ ] Create Project functionality
- [ ] Edit Project functionality
- [ ] User details
  - [ ] List user projects
  - [ ] List user comments
