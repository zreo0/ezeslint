const path = require('path');
const fs = require('fs-extra');

const { fileExist } = require('./utils');
const pwd = process.cwd();

/**
 * ESLint 配置
 * @author at74
 * @date 2021-11-17 21:34:51
 * @param {*} promptAnswers 控制台问题收集的回答
 * @returns {Promise}
 */
const eslintConfig = (promptAnswers) => {
    return Promise.resolve()
        .then(() => {
            // 检查本地配置文件
            const hasRcFile = fileExist(path.join(pwd, '.eslintrc.js'));
            if (hasRcFile) return Promise.reject(new Error('本地已经存在配置文件。请先删除本地配置文件后再进行配置！'));
            return Promise.resolve();
        })
        .then(() => {
            // 配置文件的 extends
            const extendsConfig = ['eslint-config-ay'];
            // 是否启用了 import 规则
            if (promptAnswers.useImport) extendsConfig.push('eslint-config-ay/import');
            // 使用的什么框架
            if (promptAnswers.framework) extendsConfig.push(`eslint-config-ay/${promptAnswers.framework}`);
            // 是否使用 typeScript
            if (promptAnswers.useTypescript) extendsConfig.push('eslint-config-ay/typescript');
            // 生成配置文件
            const eslintConfig = {
                root: true,
                extends: extendsConfig,
            };
            return eslintConfig;
        })
        .then((eslintConfig) => {
            const rcFileName = '.eslintrc.js';
            // 写入文件
            fs.writeFileSync(
                path.join(pwd, rcFileName),
                `module.exports = ${JSON.stringify(eslintConfig, null, 4)}\n`,
                { encoding: 'utf8' }
            );
        });
};

module.exports = eslintConfig;
