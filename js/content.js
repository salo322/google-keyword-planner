var browser = chrome || browser

browser.runtime.onMessage.addListener(
  function({message}, sender, sendResponse) {
    if (message === 'getInfo'){
      let hostName = window.location.href;
      console.log(hostName)
       if(hostName.includes('https://ads.google.com/aw/')){
 
        browser.runtime.sendMessage({message: "processing"});
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
         
          let x = 0;
          let myVar = setInterval(myTimer, 3000, true);
          
          function myTimer() {
           x++;
           if(x === ceiledNumber){
             setTimeout(()=>{
              browser.runtime.sendMessage({message: "copy", data: array});
             },7000)
             console.log('clear interval', 21312)
             clearInterval(myVar);
           
          }
           console.log(x)

           $(scrollDiv).animate({scrollTop:scrollDiv.scrollHeight}, 3000);
           scrollDiv.scrollTop = 0;
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
           },5000)
          }

      }else{
        alert('This feature only works on google keyword planner page')
    }
  }
  else{
      console.error('something wrong')
  }
});

