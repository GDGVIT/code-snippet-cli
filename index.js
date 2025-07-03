#!/usr/bin/env node

import { Command } from 'commander';
import readline from 'readline'; 
import fs from 'fs';
import path, { resolve } from 'path';
import { json } from 'stream/consumers';
// const {PrismaClient}=require(`@prisma/client`);
const DATA_FILE=path.resolve('./snippet.json');

const program = new Command();
// const prisma = new PrismaClient();

//for loading snippet from JSON file
function loadSnippets(){
  if(!fs.existsSync(DATA_FILE)){
    return[];
  }
  const data =fs.readFileSync(DATA_FILE,'utf-8');
  return JSON.parse(data);
}

//save snippets to JSON file
function savedSnippets(snippets){
  fs.writeFileSync(DATA_FILE,JSON.stringify(snippets,null,2),'utf-8')
}


//cli code starts here
program
.name('snippet-cli')
.description('My Code Snippet CLI program')
.version('1.0.0');


//greeting snippet
program
.command(`hi <name>`)
.description(`Says hi to the user`) 
.action((name) => {
  console.log(`Hello ${name}, Welcome to the CLI: what are we here for today:`);
});

//add snippet
program
  .command(`add-snippet <name>`)
  .description(`Add your code snippet in the language of your choice`)
  .option(`-l, --lang <language>`, `Specify the programming language`)
  .option(`-d, --desc <description>`, `Describe the code snippet`)
  .option(`-f, --file <path>`, `Path to the file containing the snippet`)
  .option(`--tags <tags>`, `Comma-separated tags`, val => val.split(`,`))
  .action((name, options) => {
    console.log(`Name:`, name);
    console.log(`Language:`, options.lang);
    console.log(`Description:`, options.desc);
    console.log(`File Path:`, options.file);
    console.log(`Tags:`, options.tags);
  });


//delete snippet
program
  .command(`delete-snippet <name>`)
  .description(`Delete the snippet that you would like to discard`)
  .option(`-f, --file <path>`, `Path to the file containing the snippet`)
  .action((name, options) => {
    if (!options.file) {
      console.error(`Please provide a file path using -f or --file`);
      process.exit(1);
    }

    const filePath = path.resolve(options.file);

    // Confirm with user before deleting
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`Are you sure you want to delete "${name}" at ${filePath}? (y/n): `, (answer) => {
      rl.close();

      if (answer.toLowerCase() === `y` || answer.toLowerCase() === `yes`) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Failed to delete file: ${filePath}`);
            console.error(err.message);
          } else {
            console.log(`Snippet "${name}" deleted from ${filePath}`);
          }
        });
      } else {
        console.log(`Deletion cancelled.`);
      }
    });
  });



//edit-snippet
program
.command(`edit-snippet <name>`)
.description(`Edit an existing snippet`)
.option(`-l, --lang <language>`, `New programming language`)
.option(`-d, --desc <description>`, `New description`)
.option(`-f, --file <path>`, `Path to the file to overwrite`) // ✅ Fix is here
.option(`--tags <tags>`, `New comma-separated tags`, val => val.split(`,`))
.action((name, options) => {
    if (!options.file) {
      console.error(`Please provide the file path using -f or --file`);
      process.exit(1);
    }

    const filePath = path.resolve(options.file);

    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      process.exit(1);
    }

    console.log(`Editing snippet "${name}" at ${filePath}`);
    
    if (options.lang) {
      console.log(`Language updated to: ${options.lang}`);
    }
    if (options.desc) {
      console.log(`Description updated to: ${options.desc}`);
    }
    if (options.tags) {
      console.log(`Tags updated to: ${options.tags.join(`, `)}`);
    }

    console.log(` Edit command completed (metadata displayed, file not changed)`);
});

//list snippet
program
.command(`list-snippet`)
.description(`List all your snippets`)
.action(() => {
  const snippets = loadSnippets();
  if (snippets.length===0){
    console.log(`No snippets saved yet`);
    return;
  }
console.log(`Saved snippets`);
snippets.forEach((snip,index) =>{
  console.log(`Snippet- ${index + 1}`);
  console.log(` Name: ${snip.name}`);
  console.log(`language: ${snip.lang}`);
  console.log(`Description: ${snip.desc}`);
  console.log(`File path: ${snip.filepath}`);
  console.log(`Tags: ${snip.tags?.join(`, `)}`);
});
});


//view snippet pending
program.parse(process.argv);