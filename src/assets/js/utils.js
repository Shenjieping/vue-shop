/** 时间戳格式化方法
 * @param {any} timestamp 时间戳数字
 * @param {string} [type='unix'] 分为unix时间和js时间
 * @param {string} [format='yyyy-mm-dd hh:mm:ss'] 格式化形式
 * @returns 2017-03-03 15:00:00
 */
export const formatDate = function (timestamp, format = 'yyyy-mm-dd', type = 'js') {
    function fixZero(num, length) {
        let str = '' + num
        let len = str.length
        let s = ''
        for (let i = length; i-- > len;) {
            s += '0'
        }
        return s + str
    }

    let date
    type === 'unix' ? date = new Date(timestamp * 1000) : date = new Date(timestamp)
    let dateInfo = {
        fullYear: date.getFullYear(),
        month: fixZero(date.getMonth() + 1, 2),
        date: fixZero(date.getDate(), 2),
        hours: fixZero(date.getHours(), 2),
        minutes: fixZero(date.getMinutes(), 2),
        seconds: fixZero(date.getSeconds(), 2)
    }
    if (format === 'yyyy-mm-dd hh:mm:ss') {
        return dateInfo.fullYear + '-' + dateInfo.month + '-' + dateInfo.date + ' ' + dateInfo.hours + ':' + dateInfo.minutes + ':' + dateInfo.seconds
    } else if (format === 'mm-dd hh:mm') {
        return dateInfo.month + '-' + dateInfo.date + ' ' + dateInfo.hours + ':' + dateInfo.minutes
    } else if (format === 'mm.dd(cDay)') {
        return dateInfo.month + '.' + dateInfo.date + '(' + dateInfo.cDay + ')'
    } else if (format === 'yyyy-mm-dd') {
        return dateInfo.fullYear + '-' + dateInfo.month + '-' + dateInfo.date
    } else if (format === 'yyyy/mm/dd') {
        return dateInfo.fullYear + '/' + dateInfo.month + '/' + dateInfo.date
    }
}

export const dateFormat = function(time = Date.now(), format) {
    let zeroFill = function (num) {
      return num < 10 ? '0' + num : num
    }
    let formatStr = format || 'YYYY年MM月DD日'
    // Safari new Date('yyyy-mm-dd hh:mm:ss') => Invalid Date
    let date = new Date(time)
    let year = date.getFullYear()
    let month = zeroFill(date.getMonth() + 1)
    let day = zeroFill(date.getDate())
    let hour = zeroFill(date.getHours())
    let minute = zeroFill(date.getMinutes())
    let second = zeroFill(date.getSeconds())
    const formatArr = ['YYYY', 'MM', 'DD', 'H', 'M', 'S']
    const dateArr = [year, month, day, hour, minute, second]
    for (let i = 0; i < formatArr.length; i++) {
      formatStr = formatStr.replace(formatArr[i], dateArr[i])
    }
    return formatStr
}
