const fs = require('fs-extra');
/**
 * 判断文件或者文件夹是否存在
 * @author at74
 * @date 2021-11-17 21:44:21
 * @param {*} file
 * @returns {boolean}
 */
const fileExist = (file) => {
    return fs.existsSync(file) && (fs.statSync(file).isFile() || fs.statSync(file).isDirectory());
};

module.exports = {
    fileExist,
};
