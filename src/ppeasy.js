function showModal(id,maskColor) {
    closeAllModal();
    let model = document.querySelector(`#${id}`);
    model.style.display = 'block';
    let back = document.createElement("div");
    back.className = 'ppmodal-back';
    back.style.backgroundColor = maskColor;
    back.addEventListener("click",function () {
        closeModal(id)
    })
    document.querySelector("body").appendChild(back);
}

function closeModal(id) {
    let model = document.querySelector(`#${id}`);
    model.style.display = 'none';
    document.querySelector(".ppmodal-back").remove();
}

function closeAllModal() {
    let modals = document.querySelectorAll(".ppmodal");
    if (!modals) {
        return
    }
    for (let i = 0; i < modals.length; i++) {
        modals[i].style.display = 'none';
    }
    let back = document.querySelector(".ppmodal-back");
    if (back) {
        back.remove();
    }
}

function PpEasy() {
    this.defaultOptions = new Map();
    this.defaultOptions.set('left','calc((100% - 30%)/2 - 30px)');
    this.defaultOptions.set('top','30%');
    this.defaultOptions.set('width','30%');
    this.defaultOptions.set('placeholder','输入搜索内容，回车搜索');
    this.defaultOptions.set('maskColor','rgba(0, 0, 0, 0.5)');
    this.defaultOptions.set('backgroundColor','white');
    this.defaultOptions.set('fontColor','#090910');
    this.defaultOptions.set('fontSize','18px');
}

PpEasy.prototype.onSearch = function (searchDom, fun){
    searchDom.onkeydown = function (e) {
        if (e.keyCode==13) {
            let input = document.getElementById(`${searchDom.id}-search-input`);
            let searchText = input.value;
            if (searchText) {
                fun(searchText);
                input.value = '';
                closeModal(`${searchDom.id}`)
            }else {
                input.setAttribute('placeholder','请输入搜索内容');
            }
        }
    }
}

PpEasy.prototype.onInput = function (searchDom, fun){
    searchDom.oninput = function (e) {
        let value = e.data;
        if (value) {
            fun(value);
        }
    }
}

PpEasy.prototype.setSearchCandidates = function (searchDom, dataList){
    let searchDomId = searchDom.id;
    let conDom = document.getElementById(`${searchDomId}-search-candidates`);
    conDom.innerHTML = '';
    if (dataList.length>0) {
        conDom.innerHTML = '';
        for (let i = 0; i < dataList.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = dataList[i];
            conDom.appendChild(li);
        }
    }
}
PpEasy.prototype.clearSearchCandidates = function (searchDom){
    let searchDomId = searchDom.id;
    let conDom = document.getElementById(`${searchDomId}-search-candidates`);
    conDom.innerHTML = '';
}


PpEasy.prototype.createSearcher = function (options){
    let componentOptions = {}
    if (options) {
        componentOptions['left'] = options['left'] || this.defaultOptions.get('left');
        componentOptions['top'] = options['top'] || this.defaultOptions.get('top');
        componentOptions['width'] = options['width'] || this.defaultOptions.get('width');
        componentOptions['placeholder'] = options['placeholder'] || this.defaultOptions.get('placeholder');
        componentOptions['maskColor'] = options['maskColor'] || this.defaultOptions.get('maskColor');
        componentOptions['backgroundColor'] = options['backgroundColor'] || this.defaultOptions.get('backgroundColor');
        componentOptions['fontColor'] = options['fontColor'] || this.defaultOptions.get('fontColor');
        componentOptions['fontSize'] = options['fontSize'] || this.defaultOptions.get('fontSize');
    }else {
        this.defaultOptions.forEach(function (v,k) {
            componentOptions[k] = v;
        })
    }
    let searchDom = document.createElement('div');
    searchDom.className = 'ppmodal ppmodal-search';
    searchDom.style.background = `${componentOptions['backgroundColor']}`;
    searchDom.style.left = `${componentOptions['left']}`;
    searchDom.style.top = `${componentOptions['top']}`;
    searchDom.style.width = `${componentOptions['width']}`;
    let id = guid();
    searchDom.id = id;
    searchDom.innerHTML = `<div class="ppmodal-line">
        <input id="${id}-search-input" style="background-color: ${componentOptions['backgroundColor']};color: ${componentOptions['fontColor']};font-size: ${componentOptions['fontSize']}"  class="search-input" type="search" placeholder="${componentOptions['placeholder']}" oninput="listCandidates('${id}',this.value)"/>
    </div>
    <div class="ppmodal-line">
       <ul id="${id}-search-candidates" class="search-candidates">
       </ul>
    </div>`;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(searchDom);
    showModal(id,componentOptions['maskColor']);
    return searchDom;
}


PpEasy.prototype.createContactMe = function (options){
    let componentOptions = {}
    if (options) {
        componentOptions['left'] = options['left'] || 'calc((100% - 20%)/2 - 30px)';
        componentOptions['top'] = options['top'] || this.defaultOptions.get('top');
        componentOptions['width'] = options['width'] || '20%';
        componentOptions['placeholder'] = options['placeholder'] || this.defaultOptions.get('placeholder');
        componentOptions['maskColor'] = options['maskColor'] || this.defaultOptions.get('maskColor');
        componentOptions['backgroundColor'] = options['backgroundColor'] || this.defaultOptions.get('backgroundColor');
        componentOptions['fontColor'] = options['fontColor'] || this.defaultOptions.get('fontColor');
        componentOptions['fontSize'] = options['fontSize'] || '16px';
    }else {
        this.defaultOptions.forEach(function (v,k) {
            componentOptions[k] = v;
        })
    }
    let searchDom = document.createElement('div');
    searchDom.className = 'ppmodal ppmodal-contact';
    searchDom.style.background = `${componentOptions['backgroundColor']}`;
    searchDom.style.left = `${componentOptions['left']}`;
    searchDom.style.top = `${componentOptions['top']}`;
    searchDom.style.width = `${componentOptions['width']}`;
    let id = guid();
    searchDom.id = id;
    searchDom.innerHTML = ` <div class="ppmodal-line">
        <textarea required  id="${id}-contact-area"  class="message-area" placeholder="请描述内容（必填）" style="color: ${componentOptions['fontColor']};font-size: ${componentOptions['fontSize']}"></textarea>
    </div>
    <div class="ppmodal-line">
        <select  id="${id}-contact-type" class="message-input"  style="color: ${componentOptions['fontColor']};font-size: ${componentOptions['fontSize']}">
            <option>--业务类别--</option>
        </select>
    </div>
    <div class="ppmodal-line">
        <input  id="${id}-contact-phone" class="message-input" type="search" placeholder="联系方式（必填）" style="color: ${componentOptions['fontColor']};font-size: ${componentOptions['fontSize']}"/>
    </div>
    <div class="ppmodal-line">
        <button id="${id}-contact-button" class="message-button">确定</button>
    </div>`;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(searchDom);
    showModal(id,componentOptions['maskColor']);
    return searchDom;
}

PpEasy.prototype.setContactMeTypes = function (dom, dataList){
    let searchDomId = dom.id;
    let conDom = document.getElementById(`${searchDomId}-contact-type`);
    conDom.innerHTML = '';
    if (dataList.length>0) {
        conDom.innerHTML = '';
        for (let i = 0; i < dataList.length; i++) {
            let li = document.createElement('option');
            li.innerHTML = dataList[i];
            conDom.appendChild(li);
        }
    }
}

PpEasy.prototype.setContactMeNumber = function (dom, data){
    let searchDomId = dom.id;
    let conDom = document.getElementById(`${searchDomId}-contact-phone`);
    conDom.value = data;
}

PpEasy.prototype.setContactMeDescription = function (dom, data){
    let searchDomId = dom.id;
    let conDom = document.getElementById(`${searchDomId}-contact-area`);
    conDom.value = data;
}

PpEasy.prototype.onSubmit = function (dom, fun){
    let buttonId = `${dom.id}-contact-button`;
    let buttonDom = document.getElementById(buttonId);
    buttonDom.addEventListener("click",function () {
        let desDom = document.getElementById(`${dom.id}-contact-area`);
        if (!desDom.value) {
            desDom.setAttribute('placeholder','请输入内容');
            return
        }
        let typeDom = document.getElementById(`${dom.id}-contact-type`);

        let phoneDom = document.getElementById(`${dom.id}-contact-phone`);
        if (!phoneDom.value) {
            phoneDom.setAttribute('placeholder','请输入联系方式');
            return
        }
        fun(desDom.value,typeDom.value,phoneDom.value);
        closeModal(`${dom.id}`)
    });
}

function listCandidates(domId,value){
    let dom = document.getElementById(domId);
    let conDom = document.getElementById(`${domId}-search-candidates`);
    if (!value) {
        conDom.innerHTML = '';
        return;
    }

}

function guid() {
    return Date.now().toString(36);
}
