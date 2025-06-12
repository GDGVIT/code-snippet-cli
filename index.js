#!/usr/bin/env node
const {Command} = require('commander');
const program = new Command();

program
.name(' Code Snippet CLI')
.description ('My Code Snippet CLI program')
.version('1.0.0');



program
.command('hi')
.description('Says hi to the user')
.action(() =>{ console.log ('Hello User, Welcome to the CLI');

});


program.parse(process.argv);