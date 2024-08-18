## Getting Started

```bash
nvm use
npm install
npm run dev
npm run storybook


Open http://localhost:5173 with your browser to see the result.

## File structure

task1/
├── public/
│   └── goods4you.svg         # Favicon
├── src/
│   ├── assets/               # Static assets like images, fonts, etc.
│   ├── components/           # Reusable components (e.g., Header, Footer)
│   ├── pages/                # Pages of the application
│   │   ├── Home.tsx          # Home page component
│   │   ├── One product.tsx   # One product page component
│   │   ├── Cart.tsx          # Cart page component
│   │   └── notFound.tsx      # 404 page component (Server Component)
│   ├── styles/
│   │   ├── notFound.css      # Not found CSS file
│   │   └── main.css          # Main CSS file
│   ├── store/                # Redux store configuration
│   │   ├── store.ts          # Redux store configuration file
│   │   └── slices/           # Redux slices (e.g., productSlice.ts)
│   ├── ui/                   # UI components and icons
│   │   └── components/       # Reusable UI components (e.g., Card, Button)
│   ├── types/                # Global types
│   └── hooks/                # Custom React hooks
│   ├── App.tsx               # Main App component
│   ├── main.tsx              # Main entry point
│   └── vite-env.d.ts         # Vite environment types
├── index.html                # Main HTML file
├── .gitignore                # Git ignore file
├── vite.config.mjs           # Vite configuration
├── package.json              # Project metadata and dependencies
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Project documentation
```
