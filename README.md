# 📸 Photo Blog Frontend

This is the React frontend for the Photo Blog project. It connects to the Go + Fiber backend API to fetch and display blog posts and photography.

## Related Repositories

- [Photo Blog Backend (Go + Fiber)](https://github.com/rosscondie/super-guac) — The backend API serving blog posts and photos

## Folder Structure
```txt
.
├── components.json
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public/
│   └── vite.svg
├── README.md
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── assets/
│   ├── components/
│   ├── index.css
│   ├── lib/
│   ├── main.tsx
│   └── vite-env.d.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
## Features

- Displays blog posts in a clean, minimal card grid layout
- Responsive masonry-style photo gallery with lightbox support
- Light and dark theme toggle with smooth transitions
- Built with React, TypeScript, and Tailwind CSS for styling
- Accessible design following best practices

## Technologies Used

- React + TypeScript
- Tailwind CSS
- Vite as the development and build tool
- yet-another-react-lightbox for photo viewing
- Shadcn components for consistent components
