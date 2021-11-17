const ora = require('ora');
const chalk = require('chalk');
const inquirer = require('inquirer');
const spawn = require('cross-spawn');

/**
 * 自动安装相关的依赖包
 * @author at74
 * @date 2021-11-17 22:10:21
 * @param {*} promptAnswers 控制台输入的回答
 */
const installDependencies = (promptAnswers) => {
    const spinner = ora('正在确认需要安装的包...\n');
    return Promise.resolve()
        .then(() => {
            spinner.start();
            // 组合所需要的依赖
            let needModules = ['eslint@7.x', 'eslint-config-ay', 'eslint-plugin-require-jsdoc-except'];
            // import
            if (promptAnswers.useImport) needModules.push('eslint-plugin-import');
            // react
            if (promptAnswers.framework === 'react') {
                needModules.push('eslint-plugin-react');
            } else if (promptAnswers.framework === 'vue') {
                needModules.push('eslint-plugin-vue');
            }
            // typescript
            if (promptAnswers.useTypescript) {
                needModules = needModules.concat([
                    '@typescript-eslint/parser',
                    '@typescript-eslint/eslint-plugin',
                ]);
            }
            // 如果不需要自动安装，显示需要安装的包就结束
            if (!promptAnswers.autoInstall) {
                spinner.warn(chalk.green(`请手动安装以下依赖：\n${needModules.join(' ')}`));
                return Promise.resolve();
            }
            spinner.stop();
            // 选择安装工具
            return inquirer
                .prompt([{
                    type: 'list',
                    name: 'packageManager',
                    message: '选择包管理工具：',
                    default: 'cnpm',
                    choices: [
                        { name: 'cnpm', value: 'cnpm' },
                        { name: 'npm', value: 'npm' },
                    ]
                }])
                .then((answers) => {
                    spinner.start('开始安装依赖...');
                    spawn.sync(
                        answers.packageManager,
                        ['i', '--save-dev'].concat(needModules), { stdio: 'inherit' }
                    );
                    spinner.succeed(chalk.green('依赖安装结束'));
                });
        });
};

module.exports = installDependencies;
