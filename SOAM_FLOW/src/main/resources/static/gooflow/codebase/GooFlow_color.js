/**
 * 设置各个节点对象颜色
 * @type {{main: string, node: string, line: string, mark: string, mix: string, font: string}}
 */
// GooFlow.prototype.color = {
//     main: "#00B4E1",
//     node: "#A1DCEB",   //节点背景色
//     line: "#3892D3",   //连接线颜色
//     mark: "#ff3300",
//     mix: "#B6F700",
//     font: "#15428B"    //字体颜色
// };

/**
 * 设置节点状态颜色
 * @type {{unstart: string, running: string, end: string, error: string}}
 */
GooFlow.prototype.status = {
    unstart: "#0074FD",   //未开始的
    running: "#46A1F7",  //正在运行的
    end: "#CECECE",    //已结束的
    error: "#FB0303"   //错误的
};
