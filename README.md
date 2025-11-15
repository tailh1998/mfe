# 📦 Single-SPA Micro Frontend — Monorepo Setup

This project is built using **single-spa** with a **micro-frontend** architecture and managed as a **monorepo**.

## 📁 Project Structure

```bash
/
├── _runner/          # Automatically runs all micro-frontends
├── root-config/      # Root config registering microfrontends
└── apps/
     ├── dashboard/   # Dashboard app
     ├── product/     # Product app
     └── utility/     # Shared components
```

## 🧩 Micro Frontend Included

| App             | Port | Description             |
| --------------- | ---- | ----------------------- |
| **root-config** | 3000 | Root orchestrator       |
| **dashboard**   | 3001 | Dashboard microfrontend |
| **product**     | 3002 | Product microfrontend   |
| **utility**     | 3003 | Shared UI components    |

---

## 📌 Requirements

Please use the following Node.js and npm versions:

```bash
Node.js:    v22.20.0
npm:        v10.9.3
```

Check with:

```bash
node -v
npm -v
```

---

## 🚀 How to Run (Start the whole system)

Simply run the command in the `_runner` folder:

```bash
cd _runner
npm start
```

That's all — no need to enter each app folder.

---

This will automatically start:

* root-config
* dashboard
* product
* utility

---

## 🌐 Access Applications

| App           | URL                                                            |
| ------------- | -------------------------------------------------------------- |
| **Dashboard** | [http://localhost:3000](http://localhost:3000)                 |
| **Product**   | [http://localhost:3000/product](http://localhost:3000/product) |

> ⚠️ Note: All micro-apps are mounted through **root-config**, no direct port access.

---

## 📚 Shared Components (Utility)

The `apps/utility` folder contains shared UI components:

```bash
utility/src/components/button
utility/src/components/title
```

Other apps can import like this:

```ts
import { Button } from "@app/utility";
```

To use shared components in another app, simply go to its `webpack.config.js` file and set `externals: ["@app/utility"]`. For example:

```ts
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa-react-ts");

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: "app",
    projectName: "product",
    webpackConfigEnv,
    argv,
    outputSystemJS: false,
  });

  return merge(defaultConfig, {
    // ----------UPDATE THIS CONFIG TO ENABLE SHARED UTILITY COMPONENTS---------- //
    // modify the webpack config however you'd like to by adding to this object
    externals: ["@app/utility"],
  });
};
```

This ensures the microfrontend uses the shared utility components from the utility app.

---

## 🛠 Development Notes

* This is a **monorepo** using a single Git repository.
* No need for separate git repos for each micro-app.
* `_runner` runs all micro-frontends in parallel using `concurrently`.

> 💡 When adding a new app, just add a new entry to **`_runner/apps.json`** with its `name`, `path`, `script`, and `color`.

### **`_runner`** will automatically pick it up

---

## 📦 Build Each App

If you want to build an individual microfrontend:

```bash
cd apps/dashboard
npm run build
```

Do the same for `product` or `utility` if needed.

---

## 📄 License

MIT
