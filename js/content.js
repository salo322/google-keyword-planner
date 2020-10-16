chrome.runtime.onMessage.addListener(
  function({message}, sender, sendResponse) {
    if (message === 'getInfo'){
      let scrollDiv = document.querySelector(".main-container");
      scrollDiv.scrollTop = scrollDiv.scrollHeight;
      setTimeout(()=>{
         let array = [];
         let lng = document.querySelectorAll('.ess-table-canvas div.particle-table-row .resizable keyword-text').length
         console.log(lng)
         let  table = document.createElement('table');
         table.className = "tableForCopy";
     
         //get keyword titles
         for (let i = 0; i < lng; i++) {
         let rowTitles = document.querySelectorAll('.ess-table-canvas div.particle-table-row .resizable keyword-text')[i];
         let titleText = rowTitles.textContent
         console.log(titleText)
         //get avg.
         let avg = document.querySelectorAll('.ess-table-canvas div.particle-table-row .resizable .value-text ')[i];
         let avgText = avg.textContent
         console.log(avgText)
         let tr = document.createElement('tr');
         for (let j = 0; j < 2; j++) {
              let td = document.createElement('td');
              if(j === 0){
                td.appendChild(document.createTextNode(`${titleText}`));
              }
              else if(j === 1){
                td.appendChild(document.createTextNode(`${avgText}`));
              }
              tr.appendChild(td);
         }
         
         table.appendChild(tr);
      }
          $('body').append(table);
          let btn = document.createElement('button');
          btn.className = "btnZnd";
          btn.style.width = "1px";
          btn.style.height = "1px";

          $('body').append(btn)
         
          btn.addEventListener('click', function(){
          let urlField = document.querySelector('.tableForCopy');
           
          selection = window.getSelection();  
          range = document.createRange();
          range.selectNodeContents(urlField);
          selection.removeAllRanges();         
          selection.addRange(range);
          document.execCommand('copy');
          }, false)
          $(btn).trigger('click');
          setTimeout(()=>{
            $('.tableForCopy').eq(0).remove()
          },2000)
          
    }, 1000)
  }
  else{
      console.error('something wrong')
  }     
});