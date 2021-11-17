#! /usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');

const eslintConfig = require('./eslintConfig');
const installDependencies = require('./installDependencies');

// 询问配置
const mainPromptQuestions = [
    {
        type: 'list',
        name: 'framework',
        message: '当前使用的框架是？',
        default: 'react',
        choices: [
            { name: 'React', value: 'react' },
            { name: 'Vue', value: 'vue' },
        ],
    },
    {
        type: 'confirm',
        name: 'useImport',
        message: '是否使用 import 规范？',
        default: true,
    },
    {
        type: 'confirm',
        name: 'useTypescript',
        message: '是否使用 typescript ？',
        default: true,
    },
    {
        type: 'confirm',
        name: 'autoInstall',
        message: '是否自动安装依赖？',
        default: true,
    },
];

// 主流程
function main() {
    console.log('欢迎使用');
    return inquirer
        .prompt(mainPromptQuestions)
        .then((answers) => {
            Promise.resolve()
                .then(() => eslintConfig(answers))
                .then(() => installDependencies(answers))
                .then(() => {
                    console.log(chalk.white(`配置结束`));
                })
                .catch((err) => {
                    console.log(chalk.white.bgRed(`\nERROR：${err.message}\n`));
                });
        });
}

main();
