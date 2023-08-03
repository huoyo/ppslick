function showModal(id, maskColor) {
    closeAllModal();
    let model = document.querySelector(`#${id}`);
    model.style.display = 'block';
    let back = document.createElement("div");
    back.className = 'ppmodal-back';
    back.style.backgroundColor = maskColor;
    back.addEventListener("click", function () {
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

function PPEasy() {
    this.defaultOptions = new Map();
    this.defaultOptions.set('left', 'calc((100% - 30%)/2 - 30px)');
    this.defaultOptions.set('top', '30%');
    this.defaultOptions.set('width', '30%');
    this.defaultOptions.set('placeholder', '输入搜索内容，回车搜索');
    this.defaultOptions.set('maskColor', 'rgba(0, 0, 0, 0.5)');
    this.defaultOptions.set('backgroundColor', 'white');
    this.defaultOptions.set('fontColor', '#090910');
    this.defaultOptions.set('fontSize', '18px');
    appendStyle();
}

function appendStyle() {
    let styleDom = document.getElementsByTagName("style")[0];
    if (styleDom != undefined) {
        styleDom.innerHTML += '.ppmodal{position:fixed;height:auto;background-color:white;text-align:center;border-radius:10px;top:30%;box-shadow:rgb(67,70,69) 1px 1px 7px;display:none;z-index:10;padding:30px;animation:ppmodal-appear 1s}@keyframes ppmodal-appear{from{opacity:0}to{opacity:1;}}.ppmodal-seacrh{width:30%;left:calc((100% - 30%)/2 - 30px);}.ppmodal-contact{width:20%;left:calc((100% - 20%)/2 - 30px);}.ppmodal-back{position:fixed;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,0.5);opacity:0.9;}.ppmodal-line{display:flex;margin-top:20px;}.message-button{width:100%;height:45px;border-radius:5px;border:1px solid #2108dd;background-color:#2108dd;font-size:18px;font-weight:bold;color:#f7f7fc;cursor:pointer;}.message-button:hover{box-shadow:#08051f 1px 1px 1px;}.message-input{width:100%;height:40px;outline-style:none;border-radius:5px;border:1px solid #e8e8f4;font-size:16px;color:#090910;padding-left:10px;}.message-area{width:100%;height:200px;outline-style:none;border-radius:5px;border:1px solid #e8e8f4;font-size:18px;color:#090910;padding:10px;resize:none;}.search-input{width:100%;height:40px;outline-style:none;border:none;border-bottom:1px solid #2108dd;font-size:18px;color:#090910;padding-left:10px;}.search-button{width:15%;height:45px;outline-style:none;border-radius:0 5px 5px 0;border:1px solid #9cd59c;font-size:18px;font-weight:bold;color:#090910;padding-left:10px;padding-right:10px;cursor:pointer;background-color:#239f40;color:white;}.search-candidates{margin:0;width:99%;text-align:left;list-style-type:none;padding-left:10px;max-height:200px;height:auto;overflow-y:auto;}.search-candidates li{border-bottom:1px solid #dbe7db;height:30px;font-size:18px;padding-top:5px;}';
    } else {
        let style = document.createElement('style');
        style.type = 'text/css';
        style.rel = 'stylesheet';
        style.appendChild(document.createTextNode(".ppmodal{position:fixed;height:auto;background-color:white;text-align:center;border-radius:10px;top:30%;box-shadow:rgb(67,70,69) 1px 1px 7px;display:none;z-index:10;padding:30px;animation:ppmodal-appear 1s}@keyframes ppmodal-appear{from{opacity:0}to{opacity:1;}}.ppmodal-seacrh{width:30%;left:calc((100% - 30%)/2 - 30px);}.ppmodal-contact{width:20%;left:calc((100% - 20%)/2 - 30px);}.ppmodal-back{position:fixed;top:0;right:0;bottom:0;left:0;background-color:rgba(0,0,0,0.5);opacity:0.9;}.ppmodal-line{display:flex;margin-top:20px;}.message-button{width:100%;height:45px;border-radius:5px;border:1px solid #2108dd;background-color:#2108dd;font-size:18px;font-weight:bold;color:#f7f7fc;cursor:pointer;}.message-button:hover{box-shadow:#08051f 1px 1px 1px;}.message-input{width:100%;height:40px;outline-style:none;border-radius:5px;border:1px solid #e8e8f4;font-size:16px;color:#090910;padding-left:10px;}.message-area{width:100%;height:200px;outline-style:none;border-radius:5px;border:1px solid #e8e8f4;font-size:18px;color:#090910;padding:10px;resize:none;}.search-input{width:100%;height:40px;outline-style:none;border:none;border-bottom:1px solid #2108dd;font-size:18px;color:#090910;padding-left:10px;}.search-button{width:15%;height:45px;outline-style:none;border-radius:0 5px 5px 0;border:1px solid #9cd59c;font-size:18px;font-weight:bold;color:#090910;padding-left:10px;padding-right:10px;cursor:pointer;background-color:#239f40;color:white;}.search-candidates{margin:0;width:99%;text-align:left;list-style-type:none;padding-left:10px;max-height:200px;height:auto;overflow-y:auto;}.search-candidates li{border-bottom:1px solid #dbe7db;height:30px;font-size:18px;padding-top:5px;}"));
        let head = document.getElementsByTagName('head')[0];
        head.appendChild(style);
    }
}


PPEasy.prototype.createSearcher = function (options) {
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
    } else {
        this.defaultOptions.forEach(function (v, k) {
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
        <input id="${id}-search-input" style="background-color: ${componentOptions['backgroundColor']};color: ${componentOptions['fontColor']};font-size: ${componentOptions['fontSize']}"  class="search-input  ${id}-index-0" type="search" placeholder="${componentOptions['placeholder']}" oninput="listCandidates('${id}',this.value)"/>
    </div>
    <div class="ppmodal-line">
       <ul id="${id}-search-candidates" class="search-candidates">
       </ul>
    </div>`;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(searchDom);
    showModal(id, componentOptions['maskColor']);
    return new SearchComponent(searchDom);
}

function SearchComponent(e) {
    this.element = e;
}

SearchComponent.prototype.getElement = function () {
    return this.element;
}
SearchComponent.prototype.setElement = function (e) {
    this.element = e;
}

SearchComponent.prototype.setAttribute = function (index, property, value) {
    let element = this.getElement();
    let inputs = document.getElementsByClassName(`${element.id}-index-${index}`);
    if ("html" == property) {
        inputs[0].innerHTML = value;
    } else {
        inputs[0].setAttribute(property, value);
    }
}


SearchComponent.prototype.onSearch = function (fun) {
    let dom = this.getElement();
    dom.onkeydown = function (e) {
        if (e.keyCode == 13) {
            let input = document.getElementById(`${dom.id}-search-input`);
            let searchText = input.value;
            if (searchText) {
                fun(searchText);
                input.value = '';
                closeModal(`${dom.id}`)
            } else {
                input.setAttribute('placeholder', '请输入搜索内容');
            }
        }
    }
}

SearchComponent.prototype.onSubmit = function (fun) {
    this.onSearch(fun);
}

SearchComponent.prototype.onInput = function (fun) {
    this.getElement().oninput = function (e) {
        let value = e.data;
        if (value) {
            fun(value);
        }
    }
}

SearchComponent.prototype.setSearchCandidates = function (dataList) {
    let searchDomId = this.getElement().id;
    let conDom = document.getElementById(`${searchDomId}-search-candidates`);
    conDom.innerHTML = '';
    if (dataList.length > 0) {
        conDom.innerHTML = '';
        for (let i = 0; i < dataList.length; i++) {
            let li = document.createElement('li');
            li.innerHTML = dataList[i];
            conDom.appendChild(li);
        }
    }
}

SearchComponent.prototype.clearSearchCandidates = function () {
    let searchDomId = this.getElement().id;
    let conDom = document.getElementById(`${searchDomId}-search-candidates`);
    conDom.innerHTML = '';
}

SearchComponent.prototype.setPlaceholder = function (text) {
    let dom = this.getElement();
    let input = document.getElementById(`${dom.id}-search-input`);
    input.setAttribute('placeholder', text);
}

SearchComponent.prototype.setValue = function (text) {
    let dom = this.getElement();
    let input = document.getElementById(`${dom.id}-search-input`);
    input.value = text;
}

function ContactMeComponent(e) {
    this.element = e;
}

ContactMeComponent.prototype.getElement = function () {
    return this.element;
}

ContactMeComponent.prototype.setElement = function (e) {
    this.element = e;
}

ContactMeComponent.prototype.setDescription = function (text) {
    let element = this.getElement();
    let desDom = document.getElementById(`${element.id}-contact-area`);
    desDom.value = text;
}

ContactMeComponent.prototype.setDescriptionPlaceholder = function (text) {
    let searchDomId = this.getElement().id;
    let conDom = document.getElementById(`${searchDomId}-contact-area`);
    conDom.setAttribute("placeholder", text);
}

ContactMeComponent.prototype.setTypeList = function (dataList) {
    let element = this.getElement();
    let conDom = document.getElementById(`${element.id}-contact-type`);
    conDom.innerHTML = '';
    if (dataList.length > 0) {
        conDom.innerHTML = '';
        for (let i = 0; i < dataList.length; i++) {
            let li = document.createElement('option');
            li.innerHTML = dataList[i];
            conDom.appendChild(li);
        }
    }
}


ContactMeComponent.prototype.disableType = function () {
    let searchDomId = this.getElement().id;
    let conDom = document.getElementById(`${searchDomId}-contact-type`);
    conDom.style.display = 'none';
}

ContactMeComponent.prototype.setNumber = function (data) {
    let searchDomId = this.getElement().id;
    let conDom = document.getElementById(`${searchDomId}-contact-phone`);
    conDom.value = data;
}

ContactMeComponent.prototype.setNumberPlaceholder = function (text) {
    let searchDomId = this.getElement().id;
    let conDom = document.getElementById(`${searchDomId}-contact-phone`);
    conDom.setAttribute("placeholder", text);
}

ContactMeComponent.prototype.disableNumber = function () {
    let searchDomId = this.getElement().id;
    let conDom = document.getElementById(`${searchDomId}-contact-phone`);
    conDom.style.display = 'none';
}

ContactMeComponent.prototype.setAttribute = function (index, property, value) {
    let element = this.getElement();
    let inputs = document.getElementsByClassName(`${element.id}-index-${index}`);
    if ("html" == property) {
        inputs[0].innerHTML = value;
    } else {
        inputs[0].setAttribute(property, value);
    }
}


ContactMeComponent.prototype.onSubmit = function (fun) {
    let dom = this.getElement();
    let buttonId = `${dom.id}-contact-button`;
    let buttonDom = document.getElementById(buttonId);
    buttonDom.addEventListener("click", function () {
        let desDom = document.getElementById(`${dom.id}-contact-area`);
        if (!desDom.value) {
            desDom.setAttribute('placeholder', '请输入内容');
            return
        }
        let typeDom = document.getElementById(`${dom.id}-contact-type`);

        let phoneDom = document.getElementById(`${dom.id}-contact-phone`);
        if (!phoneDom.value) {
            phoneDom.setAttribute('placeholder', '请输入联系方式');
            return
        }
        fun(desDom.value, typeDom.value, phoneDom.value);
        closeModal(`${dom.id}`)
    });
}

PPEasy.prototype.createContactMe = function (options) {
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
    } else {
        this.defaultOptions.forEach(function (v, k) {
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
        <textarea required  id="${id}-contact-area"  class="message-area ${id}-index-0" placeholder="请描述内容（必填）" style="color: ${componentOptions['fontColor']};font-size: ${componentOptions['fontSize']}"></textarea>
    </div>
    <div class="ppmodal-line">
        <select  id="${id}-contact-type" class="message-input  ${id}-index-1"  style="color: ${componentOptions['fontColor']};font-size: ${componentOptions['fontSize']}">
            <option>--业务类别--</option>
        </select>
    </div>
    <div class="ppmodal-line">
        <input  id="${id}-contact-phone" class="message-input ${id}-index-2" type="search" placeholder="联系方式（必填）" style="color: ${componentOptions['fontColor']};font-size: ${componentOptions['fontSize']}"/>
    </div>
    <div class="ppmodal-line">
        <button id="${id}-contact-button" class="message-button  ${id}-index-3">确定</button>
    </div>`;
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(searchDom);
    showModal(id, componentOptions['maskColor']);
    return new ContactMeComponent(searchDom);
}


PPEasy.prototype.onSubmit = function (component, fun) {
    component.onSubmit(fun);
}

function listCandidates(domId, value) {
    let conDom = document.getElementById(`${domId}-search-candidates`);
    if (!value) {
        conDom.innerHTML = '';
        return;
    }

}

function guid() {
    return Date.now().toString(36);
}
