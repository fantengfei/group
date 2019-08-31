const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const statusBarHeight = () => {
    return wx.getSystemInfoSync().statusBarHeight
}

const menuMargin = () => {
    let rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null
    let gap = rect.top - statusBarHeight()
    return gap
}

const menuHeight = () => {
    let rect = wx.getMenuButtonBoundingClientRect ? wx.getMenuButtonBoundingClientRect() : null
    return rect.height
}


module.exports = {
  formatTime: formatTime,
  statusBarHeight: statusBarHeight(),
  menuMargin: menuMargin(),
  menuHeight: menuHeight()
}
