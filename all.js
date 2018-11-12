let xhr = new XMLHttpRequest();
xhr.open('get', 'https://work1999.kcg.gov.tw/open1999/ServiceRequestsQuery.asmx/ServiceRequestsQuery');
xhr.send();
var data;
xhr.onload = () => {
    data = JSON.parse(xhr.responseText);
    let loc = document.querySelector('#loc');
    let tp = document.querySelector('#tp');
    let lst = document.querySelector('.lst');
    let loc_obj = {};
    let tp_obj = {};
    for (let i = 0; i < data.length;i++) {
        if (loc_obj[data[i].ZipName_] === undefined) {
            loc_obj[data[i].ZipName_] = 1;
        }
        else {
            loc_obj[data[i].ZipName_]++;
        }
        if (tp_obj[data[i].InformDesc_] === undefined) {
            tp_obj[data[i].InformDesc_] = 1;
        }
        else {
            tp_obj[data[i].InformDesc_]++;
        }
    }
    for (let ele in loc_obj) {
        loc.innerHTML += `<option value="${ele}">${ele}</option>`;
    }
    for (let ele in tp_obj) {
        tp.innerHTML += `<option value="${ele}">${ele}</option>`;
    }
    btn.addEventListener('click', () => {
        if (tp.value == 'none' && loc.value == 'none') {
            alert('選擇有誤');
            return;
        }
        let loc_count = 0;
        document.querySelector('.lst').innerHTML = '';
        let count = document.querySelector('.count');
        
        for (let i = 0; i < data.length; i++){
            if (data[i].ZipName_ == loc.value && data[i].InformDesc_ == tp.value) {
                document.querySelector('.lst').innerHTML += `<li><h4>地點：${data[i].address_}<h4><h5>報案狀況：${data[i].BeforeDesc_}</h5></li>`;
                loc_count++;
            }
        }
        count.innerHTML = `全部 ${tp.value} 有 ${tp_obj[tp.value]} 處 其中${loc.value}占了${loc_count}件`;
    })
};
