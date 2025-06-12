#!/usr/bin/env node

const {Command} = require('commander');
const {PrismaClient}=require('@prisma/client');

const program = new Command();
const prisma = new PrismaClient();


program
.name(' Code Snippet CLI')
.description ('My Code Snippet CLI program')
.version('1.0.0');

program
.command('hi')
.description('Says hi to the user')
.action(() =>{ console.log ('Hello User, Welcome to the CLI');

});

program
.command('add <name>')
.description('lets you add the code snippet');
.requiredOption ('-l,--language<lang>','specify the programming language')