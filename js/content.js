
const copyTextToClipboard = () =>{
  alert('65456')
  let urlField = document.querySelector('.tableForCopy');
  selectElementContents(urlField)
}

function selectElementContents(el) {
  var body = document.body, range, sel;
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
      
      document.execCommand("copy");

  } else if (body.createTextRange) {
      range = body.createTextRange();
      range.moveToElementText(el);
      range.select();
      range.execCommand("Copy");
  }
}

chrome.runtime.onMessage.addListener(
  function({message}, sender, sendResponse) {
    if (message === 'getInfo'){
      let hostName = window.location.href;
      console.log(hostName) 
       if(hostName.includes('https://ads.google.com/aw/')){
         
          let scrollDiv = document.querySelector(".main-container");
          
          let array = [];       
          let numberMin = document.querySelector('.button[aria-label]').innerText;
          console.log(numberMin)
          let minNumber = numberMin.replace(/\D/g, "");
          console.log(minNumber)
          let minNum = Number(minNumber);
          let maxNumber = document.querySelector('entity-count-item').innerText;
          let maxNum;
          let words;
          if(maxNumber.includes("Showing")){
            words = maxNumber.split(' ');
            maxNum = Number(words[1]);
          }
          else{
            words = maxNumber.split(' ');
            maxNum = Number(words[0]);
          }
          console.log(maxNumber)
  
          let createMaxNum = Number(maxNum);
          console.log(createMaxNum);
          let divided = createMaxNum/minNum;
          let ceiledNumber = Math.ceil(divided);
          console.log(ceiledNumber)
          
          let  table = document.createElement('table');
          table.className = "tableForCopy";
          let x = 0;	
          let myVar = setInterval(myTimer, 4000);	
          function myTimer() {
           x++;
           if(x === ceiledNumber){

             setTimeout(()=>{
              
              let prevButton = document.querySelector('.first .content material-icon');
              console.log(prevButton)
              $([prevButton]).trigger('click');
              
              $('body').append(table);

              for (let d = 0; d < array.length; d++) {
                console.log(array[d][0]);
                console.log(array[d][1])
                let tr = document.createElement('tr');
                for (let j = 0; j < 2; j++) {
                     let td = document.createElement('td');
                     if(j === 0){
                       td.appendChild(document.createTextNode(`${array[d][0]}`));
                     }
                     else if(j === 1){
                       td.appendChild(document.createTextNode(`${array[d][1]}`));
                     }
                     tr.appendChild(td);
                }
                
                 table.appendChild(tr);
              }

              let btn = document.createElement('button');
              btn.className = "btnZnd";
              btn.style.width = "1px";
              btn.style.height = "1px";
    
             // $('body').append(btn)
              
            //  btn.addEventListener('click', myFunc);
             // myFunc();
              console.log('setimeout appen values', 21312)
              copyTextToClipboard();

                // $('.tableForCopy').eq(0).remove()
             
              
             },5000)
             
             console.log('clear interval', 21312)
             clearInterval(myVar);
            
            
          }
           console.log(x)
          $(scrollDiv).animate({scrollTop:scrollDiv.scrollHeight}, 2000);
           setTimeout(()=>{
            scrollDiv.scrollTop = 0;
           },2500)
           let nextButton = $('.next div material-icon');
           setTimeout(()=>{
            let lng = document.querySelectorAll('.ess-table-canvas div.particle-table-row .resizable keyword-text').length
            console.log(lng)
            for (let i = 0; i < lng; i++) {
            let rowTitles = document.querySelectorAll('.ess-table-canvas div.particle-table-row .resizable keyword-text')[i];
            let titleText = rowTitles.textContent;
            console.log(titleText)
            let avg = document.querySelectorAll('.ess-table-canvas div.particle-table-row .resizable .value-text ')[i];
            let avgText = avg.textContent
            console.log(avgText)
            let arr = [titleText, avgText]
            array.push(arr)
            console.log(array)
           }

            $(nextButton).trigger('click');
           },4000)
           
        
          }    
      
           
         

      }else{
        alert('This feature only works on google keyword planner page')
    }
  }
  else{
      console.error('something wrong')
  }     
});



    //  let lng = document.querySelectorAll('.ess-table-canvas div.particle-table-row .resizable keyword-text').length
        //  console.log(lng)
        //  let  table = document.createElement('table');
        //  table.className = "tableForCopy";
        //  //get keyword titles
        //  for (let i = 0; i < lng; i++) {
        //  let rowTitles = document.querySelectorAll('.ess-table-canvas div.particle-table-row .resizable keyword-text')[i];
        //  let titleText = rowTitles.textContent
        //  console.log(titleText)
        //  let avg = document.querySelectorAll('.ess-table-canvas div.particle-table-row .resizable .value-text ')[i];
        //  let avgText = avg.textContent
        //  console.log(avgText)
        //  let arr = [titleText, avgText]
        //  array.push(arr)
        //  console.log(array)
        //  }
        
          