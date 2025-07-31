<p align="center">
<a href="https://dscvit.com">
	<img width="400" src="https://user-images.githubusercontent.com/56252312/159312411-58410727-3933-4224-b43e-4e9b627838a3.png#gh-light-mode-only" alt="GDSC VIT"/>
</a>
	<h2 align="center"> Code Snippet CLI </h2>
	<h4 align="center"> This project is a custom Command Line Interface (CLI) tool** for managing code snippets efficiently. It allows users to add, view, search, and copy snippets categorized by language, tags, or keywords. The tool supports fuzzy search and integrates with **Prisma + PostgreSQL for persistent storage. Designed for developers, it streamlines snippet reuse and organization directly from the terminal.<h4>
</p>

---
[![Join Us](https://img.shields.io/badge/Join%20Us-Developer%20Student%20Clubs-red)](https://dsc.community.dev/vellore-institute-of-technology/)
[![Discord Chat](https://img.shields.io/discord/760928671698649098.svg)](https://discord.gg/498KVdSKWR)

[![DOCS](https://img.shields.io/badge/Documentation-see%20docs-green?style=flat-square&logo=appveyor)](INSERT_LINK_FOR_DOCS_HERE) 
  [![UI ](https://img.shields.io/badge/User%20Interface-Link%20to%20UI-orange?style=flat-square&logo=appveyor)](INSERT_UI_LINK_HERE)


## Features
- [ ] Add & Store Snippets – Save code snippets with metadata like name, language, tags, and file path. 
- [ ] Search & Fuzzy Matching – Find snippets using exact or partial keyword, language, or tag matches. 
- [ ] Clipboard Integration – View snippets and instantly copy them to your clipboard for quick reuse.
- [ ] Persistent Storage with Prisma + PostgreSQL – Store and retrieve snippets from a reliable database backend.

<br>

## 🧩 Dependencies

* `commander` – for creating CLI commands
* `clipboardy` – to copy snippets to the clipboard
* `fuse.js` – enables fuzzy search functionality
* `inquirer` – for interactive prompts
* `chalk` – for colorful terminal output
* `dotenv` – to manage environment variables
* `@prisma/client` – Prisma’s runtime client for database access
* `prisma` – Prisma CLI for DB setup and migrations (`devDependency`)
* `pg` – PostgreSQL client for Node.js

---

## 🚀 Running the Project

### 🔧 Install Dependencies

```bash
npm install
npm install -D prisma
npm install pg
```

### ⚙️ Initialize Prisma

```bash
npx prisma init
```

Edit the `.env` file to point to your PostgreSQL database:

```
DATABASE_URL="postgresql://username:password@localhost:5432/your-db-name"
```

## ▶️ Execute CLI

### Example usage:

```bash
mycli add-snippet
mycli search-snippet -l python
```

---


## Contributors

<table>
	<tr align="center">
		<td>
		Samridh Suresh
		<p align="center">
			<img src = "https://dscvit.com/images/dsc-logo-square.svg" width="150" height="150" alt="Your Name Here (Insert Your Image Link In Src">
		</p>
			<p align="center">
				<a href = "https://github.com/person1">
					<img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36" alt="GitHub"/>
				</a>
				<a href = "https://www.linkedin.com/in/person1">
					<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" alt="LinkedIn"/>
				</a>
			</p>
		</td>
	</tr>
</table>

<p align="center">
	Made with ❤ by <a href="https://dscvit.com">GDSC-VIT</a>
</p>
