/**
 * 信息输出
 * @param title log的标题
 * @param description log的描述
 * @param color 颜色
 */
export function log(title, description, color) {
  if (title && description) {
    console.log(
      `%c ${title} %c ${description} %c`,
      `background:${color};border:1px solid ${color}; padding: 5px; border-radius: 4px 0 0 4px; color: #fff;`,
      `border:1px solid ${color}; padding: 5px; border-radius: 0 4px 4px 0; color: ${color};`,
      'background:transparent',
    );
  }
}

log('{pkg.name}', '{pkg.version}', '#1890ff');
