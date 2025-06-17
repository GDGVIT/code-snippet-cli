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

program.parse();