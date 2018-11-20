import xlsx from 'xlsx'
document.addEventListener('DOMContentLoaded', () => {
  // 导出任务
  document.getElementById('export').addEventListener('click', () => {
    chrome.windows.getCurrent(window => {
      chrome.tabs.query({
        active: true,
        windowId: window.id
      }, (tabs) => {
        let tab_id = tabs[0] && tabs[0].id || ''
        chrome.tabs.sendMessage(tab_id, {
          download: true
        })
      })
    })
  })

  // txt to csv
  document.getElementById('transform').addEventListener('click', () => {
    let file = document.getElementById('file')
    file.addEventListener('change', () => {

      let files = file.files || []
      files = Array.from(files)
      files.forEach(file_item => {
        let fr = new FileReader()
        fr.onload = (e) => {
          let result = e.target.result
          let arr = result.split(/\s/)
          let new_arr = arr.map(arr_item => [arr_item])
          let wh = xlsx.utils.aoa_to_sheet(new_arr)
          let wb = xlsx.utils.book_new()
          xlsx.utils.book_append_sheet(wb, wh, 'file_name')
          xlsx.writeFile(wb, file_item.name + '.csv')
        }
        fr.readAsText(file_item)
      })
    })
    file.click()
  })
})
