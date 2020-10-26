var browser = chrome || browser

       browser.contextMenus.create({
         id: "copyContextMenu1",
         title: `Copy keyword && Avg. Monthly Searches`,
         contexts: ["all"]
        });

        browser.contextMenus.create({
          id: "openLink",
          title: "Google Ads Training (free)",
          contexts: ["all"]
        });
        
        browser.contextMenus.create({
          id: "googleAdsTutorials",
          title: "Google Ads Tutorials on Youtube",
          contexts: ["all"]
        });
        
        browser.contextMenus.create({
          id: "community",
          title: "Google Ads Indonesia Community",
          contexts: ["all"]
        });
        browser.contextMenus.create({
          id: "contact",
          title: "Contact Me",
          contexts: ["all"]
        });
        browser.contextMenus.onClicked.addListener(function(info, tab) {
          if (tab) {
              if (info.menuItemId === "copyContextMenu1"){
                browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
                  browser.notifications.create(
                    'start_copy_' + Math.random(), {
                         type: 'basic',
                         iconUrl: 'img/copy64.png',
                         title: "You have not Licence key",
                         message: "Contact us to buy License key"
                     })
                   });
              }
              if (info.menuItemId === "openLink"){
                var newURL = "https://renrasedoya.com/lp/google-ads-training/";
                browser.tabs.create({ url: newURL });
              }
              if (info.menuItemId === "googleAdsTutorials"){
                var newURL = "https://www.youtube.com/renrasedoya?sub_confirmation=1";
                browser.tabs.create({ url: newURL });
              }
              if (info.menuItemId === "community"){
                var newURL = "https://www.facebook.com/groups/2052296024827476";
                browser.tabs.create({ url: newURL });
              }
              if (info.menuItemId === "contact"){
                var newURL = "https://renrasedoya.com/contact-me/?utm_source=keyword_planner_extension&utm_medium=backlink";
                browser.tabs.create({ url: newURL });
              }
          }
        });
      
     browser.runtime.onMessage.addListener(
     function({messageRequest}, sender, sendResponse) {
      
      if (messageRequest){
        requestOptions = {
           method: 'GET',
           redirect: 'follow'
         };
         fetch(`http://54.216.102.117/key/check-key-valid?key=${messageRequest}`, requestOptions)
           .then(response =>{
               if(response.status === 200){            
              sendResponse({answer: "activeMode"})
               }
               else{
                   console.log('not true key')
                   sendResponse({answer: "problem"})
               }
               return response.json()
           })
           .then(result =>{
           
            const sucKey = result.key;
            console.log(sucKey)
            browser.storage.local.set({licenseKey:sucKey});
            const expD = result.expiration_date
            console.log(expD);

            browser.storage.local.set({expirationDate:expD});
            let todaysDate = new Date();
            let toNum1 = todaysDate.toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"})
            console.log(toNum1) 
            let date = new Date(+expD); 
            let toNum2 = date.toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"})
            console.log(toNum2)  
            console.log(toNum1)
            toNum1 = new Date(toNum1);
            toNum2 = new Date(toNum2);
            console.log(toNum1)
            console.log(toNum2)

            if(toNum2 >= toNum1){
                console.log('works')
                browser.storage.local.set({correctDate:"true"});
                

              browser.contextMenus.removeAll(function (){
                console.log('all removed')
                 })
                browser.contextMenus.create({
                id: "copyContextMenu",
                title: `Copy keyword && Avg. Monthly Searches`,
                contexts: ["all"]
                });
                browser.contextMenus.create({
                id: "openLink",
                title: "Google Ads Training (free)",
                contexts: ["all"]
                });
                browser.contextMenus.create({
                id: "googleAdsTutorials",
                title: "Google Ads Tutorials on Youtube",
                contexts: ["all"]
                });
               browser.contextMenus.create({
               id: "community",
               title: "Google Ads Indonesia Community",
               contexts: ["all"]
               });
               browser.contextMenus.create({
               id: "contact",
               title: "Contact Me",
               contexts: ["all"]
               });
              browser.contextMenus.onClicked.addListener(function(info, tab) {
              if (tab) {
              if (info.menuItemId === "copyContextMenu"){
              browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
              browser.tabs.sendMessage(tabs[0].id, {message: "getInfo"})
              browser.runtime.onMessage.addListener(
              function({message, data}, sender, sendResponse) {
              if (message === "processing"){
                     browser.notifications.create(
                    'start_copy_' + Math.random(), {
                     type: 'basic',
                     iconUrl: 'img/copy64.png',
                     title: "Processing",
                     message: "Processing data, Please wait until ends"
                 })
               }
              })
               });
              }
              }
              });
              
              browser.runtime.onMessage.addListener(
              function({message, data}, sender, sendResponse) {
              if (message === "copy"){
              let  table = document.createElement('table');
              table.className = "tableForCopy";
              $('body').append(table);
              browser.notifications.create(
                   'text_copy_' + Math.random(), {
                        type: 'basic',
                        iconUrl: 'img/copy64.png',
                        title: "Success",
                        message: "Successfully copied"
                    })
                    
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

                
            }else {
                console.log('not works')
                browser.storage.local.set({wrongDate:"false"});
                browser.storage.local.set({active:"false"});
                let secRequestOptions = {
                    method: 'GET',
                    redirect: 'follow'
                  };
                  fetch(`http://54.216.102.117/key/disable?key=${sucKey}`, secRequestOptions)
                    .then(response => response)
                    .catch(error => console.log('error', error));
            }
           }) 
           .catch(error => console.log('error'));
     }
     return true
});


const mainFunc =()=>{

  browser.storage.local.get(['expirationDate', 'licenseKey'], function(result) {
    
          let todaysDate = new Date();
          let toNum1 = todaysDate.toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"})
          let test = result.expirationDate;
          console.log(test)
          let newDate = new Date(+test); 
          console.log(test);
          let toNum2  = newDate.toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"})
          console.log(toNum1) 
          console.log(toNum2) 
          toNum1 = new Date(toNum1);
          toNum2 = new Date(toNum2); 
          if(toNum2 >= toNum1){
              console.log('works')
              browser.storage.local.set({correctDate:"true"});


              browser.contextMenus.removeAll(function (){
                console.log('all removed')
                 })
                browser.contextMenus.create({
                id: "copyContextMenu",
                title: `Copy keyword && Avg. Monthly Searches`,
                contexts: ["all"]
                });
                browser.contextMenus.create({
                id: "openLink",
                title: "Google Ads Training (free)",
                contexts: ["all"]
                });
                browser.contextMenus.create({
                id: "googleAdsTutorials",
                title: "Google Ads Tutorials on Youtube",
                contexts: ["all"]
                });
               browser.contextMenus.create({
               id: "community",
               title: "Google Ads Indonesia Community",
               contexts: ["all"]
               });
               browser.contextMenus.create({
               id: "contact",
               title: "Contact Me",
               contexts: ["all"]
               });
              browser.contextMenus.onClicked.addListener(function(info, tab) {
              if (tab) {
              if (info.menuItemId === "copyContextMenu"){
              browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
              browser.tabs.sendMessage(tabs[0].id, {message: "getInfo"})
              browser.runtime.onMessage.addListener(
              function({message, data}, sender, sendResponse) {
              if (message === "processing"){
                     browser.notifications.create(
                    'start_copy_' + Math.random(), {
                     type: 'basic',
                     iconUrl: 'img/copy64.png',
                     title: "Processing",
                     message: "Processing data, Please wait until ends"
                 })
               }
              })
               });
              }
              }
              });
              
              browser.runtime.onMessage.addListener(
              function({message, data}, sender, sendResponse) {
              if (message === "copy"){
              let  table = document.createElement('table');
              table.className = "tableForCopy";
              $('body').append(table);
              browser.notifications.create(
                   'text_copy_' + Math.random(), {
                        type: 'basic',
                        iconUrl: 'img/copy64.png',
                        title: "Success",
                        message: "Successfully copied"
                    })
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

              
          }else{
              console.log('not works')
              browser.storage.local.set({wrongDate:"false"});
              browser.storage.local.remove(['active', 'correctDate', 'licenseKey','expirationDate']);
              let secRequestOptions = {
                  method: 'GET',
                  redirect: 'follow'
                };
                fetch(`http://54.216.102.117/key/disable?key=${result.licenseKey}`, secRequestOptions)
                  .then(response => response)
                  .catch(error => console.log('error', error));
                  clearInterval(func)
          }
      
  
  });
  }
  mainFunc();
  
  let dayInMilliseconds = 1000 * 60 * 60 * 24;
 
  let func = setInterval(interval, dayInMilliseconds, true);
  function interval(){
    
  mainFunc();
  
  }
   
  
  




















   