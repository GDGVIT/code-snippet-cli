#!/usr/bin/env node
import { Command } from "commander";
import fs from "fs";
import path from "path";
import readline from "readline";
import clipboardy from "clipboardy";
import prisma from "./lib/prisma.js";

const program = new Command();

program
  .name("snippet-cli")
  .description("My Code Snippet CLI program")
  .version("1.0.0");

// Add snippet
program
  .command("add-snippet <name>")
  .description("Add a code snippet")
  .option("-l, --lang <language>", "Programming language")
  .option("-d, --desc <description>", "Snippet description")
  .option("-f, --file <path>", "Path to the file containing the snippet")
  .option("--tags <tags>", "Comma-separated tags", (val) => val.split(","))
  .action(async (name, options) => {
    try {
      if (!options.file || !fs.existsSync(options.file)) {
        console.error("❌ File path is required and must exist.");
        process.exit(1);
      }

      const code = fs.readFileSync(options.file, "utf-8");

      await prisma.snippet.create({
        data: {
          name,
          lang: options.lang || "",
          desc: options.desc || "",
          file: options.file,
          tags: options.tags || [],
          code,
        },
      });

      console.log(`✅ Snippet "${name}" saved to DB.`);
    } catch (err) {
      console.error(`❌ Failed to save snippet: ${err.message}`);
    }
  });

// Delete snippet
program
  .command("delete-snippet <name>")
  .description("Delete a snippet from the database")
  .action(async (name) => {
    try {
      await prisma.snippet.delete({
        where: { name },
      });
      console.log(`🗑️ Snippet "${name}" deleted.`);
    } catch (err) {
      console.error(`❌ Failed to delete: ${err.message}`);
    }
  });

// Edit snippet
program
  .command("edit-snippet <name>")
  .description("Edit an existing snippet")
  .option("-l, --lang <language>", "New programming language")
  .option("-d, --desc <description>", "New description")
  .option("-f, --file <path>", "New file path")
  .option("--tags <tags>", "New comma-separated tags", (val) => val.split(","))
  .action(async (name, options) => {
    try {
      const updates = {};

      if (options.lang) updates.lang = options.lang;
      if (options.desc) updates.desc = options.desc;
      if (options.tags) updates.tags = options.tags;

      if (options.file) {
        if (!fs.existsSync(options.file)) {
          console.error("❌ Provided file does not exist.");
          process.exit(1);
        }
        updates.file = options.file;
        updates.code = fs.readFileSync(options.file, "utf-8");
      }

      await prisma.snippet.update({
        where: { name },
        data: updates,
      });

      console.log(`✏️ Snippet "${name}" updated.`);
    } catch (err) {
      console.error(`❌ Failed to update: ${err.message}`);
    }
  });

// List snippets
program
  .command("list-snippet")
  .description("List all snippets")
  .action(async () => {
    const snippets = await prisma.snippet.findMany();

    if (snippets.length === 0) {
      console.log("📭 No snippets found.");
      return;
    }

    snippets.forEach((s, i) => {
      console.log(`\n${i + 1}. ${s.name} [${s.lang}]`);
      console.log(`📄 ${s.desc}`);
      console.log(`📁 ${s.file}`);
      console.log(`🏷️ ${s.tags?.join(", ")}`);
    });
  });

// View a snippet
program
  .command("view-snippet <name>")
  .description("View a specific snippet")
  .action(async (name) => {
    const snippet = await prisma.snippet.findUnique({ where: { name } });

    if (!snippet) {
      console.log("❌ Snippet not found.");
      return;
    }

    console.log(`\n📌 Name: ${snippet.name}`);
    console.log(`🖋️ Language: ${snippet.lang}`);
    console.log(`📝 Description: ${snippet.desc}`);
    console.log(`📁 File: ${snippet.file}`);
    console.log(`🏷️ Tags: ${snippet.tags?.join(", ")}`);
    console.log(`\n📄 Code:\n${snippet.code}`);

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question("📋 Copy to clipboard? (y/n): ", (answer) => {
      if (answer.toLowerCase() === "y") {
        clipboardy.writeSync(snippet.code);
        console.log("✅ Copied to clipboard.");
      }
      rl.close();
    });
  });

// Search snippet (basic)
program
  .command("search-snippet")
  .description("Search snippets by keyword or tag")
  .option("-k, --key <keyword>", "Search in name/desc/code")
  .option("--tag <tag>", "Search by tag")
  .action(async (options) => {
    const snippets = await prisma.snippet.findMany();

    const results = snippets.filter((s) => {
      const keywordMatch = options.key
        ? [s.name, s.desc, s.code].some((field) =>
            field?.toLowerCase().includes(options.key.toLowerCase())
          )
        : true;

      const tagMatch = options.tag
        ? s.tags?.includes(options.tag)
        : true;

      return keywordMatch && tagMatch;
    });

    if (!results.length) {
      console.log("🔍 No matching snippets.");
      return;
    }

    results.forEach((s, i) => {
      console.log(`\n${i + 1}. ${s.name} [${s.lang}]`);
      console.log(`Tags: ${s.tags?.join(", ")}`);
      console.log(`File: ${s.file}`);
    });
  });

program.parse(process.argv);
