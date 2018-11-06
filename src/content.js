import xlsx from './lib/xlsx'
import moment from './lib/moment'
let data = {}
function ajax() {
    let xhr = new XMLHttpRequest()
    xhr.open('get', location.protocol + '//' + location.host +'/sheet/searchByUid?type=s')
    xhr.onreadystatechange = () => {
        if(xhr.status === 200 && xhr.readyState === 4){
            data = JSON.parse(xhr.responseText)
            let headers = ['文件夹名称', '聚合任务名称', '创建时间', '更新时间']
            let data_arr = []
            data.data.forEach(item => {
                let name = item.name
                item.jobs.forEach(job => {
                    let arr = [name, job.name, moment(job.createdTime).format('YYYY-MM-DD HH:mm:SS'), moment(job.updatedTime).format('YYYY-MM-DD HH:mm:SS')]
                    data_arr.push(arr)
                })
            })
            let wh = xlsx.utils.aoa_to_sheet([
                headers
            ].concat(data_arr))
            let wb = xlsx.utils.book_new()
            xlsx.utils.book_append_sheet(wb, wh, '测试')
            xlsx.writeFile(wb, moment().format('YYYY-MM-DD HH:mm:SS') + '.xlsx')
        }
    }
    xhr.send()
}
chrome.runtime.onMessage.addListener((message) => {
    if(message.download){
        ajax()
    }
})
