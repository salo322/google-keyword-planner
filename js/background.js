
chrome.runtime.onMessage.addListener(
  function({messageRequest}, sender, sendResponse) {
   
    if (messageRequest){

     fetch('http://localhost:5000')
      .then(
        function(response) {
            let maxRandom = Math.floor(Math.random() * 2) + 1;
            console.log(maxRandom)
          if (maxRandom === 2) {
            console.log('success:' +
            response.status)
            let todaysDate = new Date();
            tDate = new Date(todaysDate.getFullYear(), todaysDate.getMonth()+1, 1);
            console.log(tDate)
            nowDate = tDate.toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"})
            stringDate = nowDate.toString()
            chrome.storage.local.set({actDate: stringDate});
            console.log(nowDate)
            sendResponse({answer: "activeMode"})


            chrome.contextMenus.create({
              id: "copyContextMenu",
              title: `Copy keyword && Avg. Monthly Searches`,
              contexts: ["all"]
            });
            
            chrome.contextMenus.create({
              id: "openLink",
              title: "Google Ads Training (free)",
              contexts: ["all"]
            });
            
            chrome.contextMenus.create({
              id: "googleAdsTutorials",
              title: "Google Ads Tutorials on Youtube",
              contexts: ["all"]
            });
            
            chrome.contextMenus.create({
              id: "community",
              title: "Google Ads Indonesia Community",
              contexts: ["all"]
            });
            chrome.contextMenus.create({
              id: "contact",
              title: "Contact Me",
              contexts: ["all"]
            });
            
            chrome.contextMenus.onClicked.addListener(function(info, tab) {
              if (tab) {
                  if (info.menuItemId === "copyContextMenu"){
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                      chrome.tabs.sendMessage(tabs[0].id, {message: "getInfo"})
                      chrome.runtime.onMessage.addListener(
                        function({message, data}, sender, sendResponse) {
                            if (message === "processing"){
                      chrome.notifications.create(
                        'start_copy_' + Math.random(), {
                             type: 'basic',
                             iconUrl: 'img/copy64.png',
                             title: "Processing",
                             message: "Processing data, Please wait until ends"
                         }
                     )
                        }
                      })
            
                      });
                  }
                  if (info.menuItemId === "openLink"){
                    var newURL = "https://renrasedoya.com/lp/google-ads-training/";
                    chrome.tabs.create({ url: newURL });
                  }
                  if (info.menuItemId === "googleAdsTutorials"){
                    var newURL = "https://www.youtube.com/renrasedoya?sub_confirmation=1";
                    chrome.tabs.create({ url: newURL });
                  }
                  if (info.menuItemId === "community"){
                    var newURL = "https://www.facebook.com/groups/2052296024827476";
                    chrome.tabs.create({ url: newURL });
                  }
                  if (info.menuItemId === "contact"){
                    var newURL = "https://renrasedoya.com/contact-me/?utm_source=keyword_planner_extension&utm_medium=backlink";
                    chrome.tabs.create({ url: newURL });
                  }
              }
            });
            
            chrome.runtime.onMessage.addListener(
                function({message, data}, sender, sendResponse) {
                    if (message === "copy"){
                        let  table = document.createElement('table');
                        table.className = "tableForCopy";
            
                        $('body').append(table);
            
                        chrome.notifications.create(
                           'text_copy_' + Math.random(), {
                                type: 'basic',
                                iconUrl: 'img/copy64.png',
                                title: "Success",
                                message: "Successfully copied"
                            }
                        )
            
                        for (let d = 0; d < data.length; d++) {
                            console.log(data[d][0]);
                            console.log(data[d][1])
                            let tr = document.createElement('tr');
                            for (let j = 0; j < 2; j++) {
                                let td = document.createElement('td');
                                if(j === 0){
                                    td.appendChild(document.createTextNode(`${data[d][0]}`));
                                }
                                else if(j === 1){
                                    td.appendChild(document.createTextNode(`${data[d][1]}`));
                                }
                                tr.appendChild(td);
                            }
            
                            table.appendChild(tr);
                        }
            
                        let urlField = document.querySelector('.tableForCopy');
                        selectElementContents(urlField)
            
                    }
            });
            
            function selectElementContents(el) {
                let body = document.body, range, sel;
                if (document.createRange && window.getSelection) {
                    range = document.createRange();
                    sel = window.getSelection();
                    sel.removeAllRanges();
                    try {
                        range.selectNodeContents(el);
                        sel.addRange(range);
                    } catch (e) {
                        range.selectNode(el);
                        sel.addRange(range);
                    }
            
                } else if (body.createTextRange) {
                    range = body.createTextRange();
                    range.moveToElementText(el);
                    range.select();
                }
            
                document.execCommand('copy');
                document.querySelector('.tableForCopy')
                let elem = document.querySelector('.tableForCopy');
                elem.parentNode.removeChild( document.querySelector('.tableForCopy'));
            
            }
            

          }
          else{
              console.log('not true key')
              sendResponse({answer: "problem"})
          }

    })
      .catch(function(err) {
        console.log('Fetch Error :-S', err);
      });

      return true; 
    }
     
});

