// .prettierrc.js
module.exports = {
  // 字符串使用单引号
  singleQuote: true,
  // 每行末尾自动添加分号
  semi: true,
  // tab缩进大小,默认为2
  tabWidth: 2,
  // 使用tab缩进，默认false
  useTabs: false,
  // 对象中打印空格 默认true
  bracketSpacing: true,
  // 换行长度，默认80
  printWidth: 80,
  // 去除行尾逗号
  trailingComma: 'none',
  importOrder: ['^@formily/(.*)', '^@(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderParserPlugins: ['typescript', 'decorators-legacy']
};
