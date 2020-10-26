var browser = chrome || browser
$( document ).ready(function() {
    browser.storage.local.get(['active', 'exp', 'expirationDate', 'correctDate', 'wrongDate', 'left'], function(result) {
   
        let todaysDate = new Date();
        let toNum1 = todaysDate.toDateString()
        console.log(toNum1)
        let test = result.expirationDate;
        console.log(test)
        let newDate = new Date(+test); 
        console.log(test);
        let toNum2  = newDate.toDateString()
        console.log(toNum2)
        const date1 = new Date(`${toNum1}`);
        const date2 = new Date(`${toNum2}`);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffTime + " milliseconds");
        let daysLeft = "(" +  diffDays + ' ' +"days left)";

        if(result.active === 'true' && result.correctDate === 'true'){
            console.log('works...')      
                    $('.inactive-page-status').text('Active')
                    $('.inactive-page-status').css('color', 'green')
                    $('.inactive-status-container').css('width', '99px') 
                    $('.activation-date-add').css('display', 'flex')
                    let expirationDate = $(`<div class="active-expDate"> Expiration Date: ${toNum2 }      ${  daysLeft} </div>`)
                    $(expirationDate).css('color', '#686d76')
                    $('.inactive-main-div').append(expirationDate)
                    $('.active-expDate').nextAll('div').remove();
                    $('.licence-key').css('display', 'none')
                    $('.inactive-page-input').prop('disabled', true);
                    $('.inactive-page-input').val('') 
                    $('.inactive-page-input').css('background', 'gainsboro');
                    $('.inactive-button').css('background', '#686d76')
                    $('.inactive-licence-key-container').removeClass('hideDiv')
                    $('.inactive-button').removeClass('hideDiv')
                    $('.active-expDate').removeClass('hideDiv')
                    $('.inactive-page-status').css('color', 'green')
            }else if(result.exp === 'over' && result.wrongDate === 'false'){ 
                $('.licence-key').text('Your license key has expired, contact us to buy new License')
                $('.licence-key').css('color', 'red')
             }
        
         

           
    })
    $(".inactive-button" ).click(function() {
        if($('.inactive-page-input').val().length > 1){
            let value = $('.inactive-page-input').val();
            browser.runtime.sendMessage({messageRequest: value}, function(response) {
            if(response.answer === 'activeMode'){    
            let inactiveDiv = $('<div class="inactive-status-container">' +
            '<div class="inactive-status-title">Status:</div>'+
            '<div class="inactive-page-status">active</div>'+
            '</div>')
            $('.inactive-main-div').html(inactiveDiv)
            $('.inactive-page-status').css('color', 'green')
            $('.licence-key').css('display', 'none')
            $('.inactive-page-input').prop('disabled', true);
            $('.inactive-page-input').val('') 
            $('.inactive-button').css('background', 'grey')
            browser.storage.local.set({active: 'true', exp : 'over'});
            } else if(response.answer === 'problem'){
            console.log('activation problem')
            $('.licence-key').text('Your Key is not valid, Please try again')
            $('.licence-key').css('color', 'red')
            $('.inactive-page-input').val('')
            }
            });
        }
        else{
            console.log('empty input')
        } 
    });
});
