#!/usr/bin/env node

import { Command } from 'commander';
// const {PrismaClient}=require('@prisma/client');

const program = new Command();
// const prisma = new PrismaClient();


program
.name(' Code Snippet CLI')
.description('My Code Snippet CLI program')
.version('1.0.0');

program
.command('hi <name>')
.description('Says hi to the user')
.option('-f')
.action(() =>{ console.log('Hello User, Welcome to the CLI');});

program
.name('add snippet <name>')
.description('Add your code snippet in the language of your choice')
.option('-l,--lang<language>','specify the programming language')
.option('-d,--desc<description>','describe the code snippet')
.option('-f,--file<path>','Path to the file containting the snippet')
.option('--tags <tags>', 'Comma-separated tags', val => val.split(','))
.action((name,option) =>{ 
    console.log('Name: ',name);
    console.log('Language: ', option.lang);
    console.log('Description: ', option.desc);
    console.log('File Path: ', option.file);
    console.log('Tags: ', option.tags);
});

program.parse(process.argvs);