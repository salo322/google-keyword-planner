$( document ).ready(function() {
    chrome.storage.local.get(['active', 'exp', 'expirationDate'], function(result) {
        console.log(result.actDate)
        console.log(result.expirationDate)
        let todaysDate = new Date();
        let now = todaysDate.toDateString()
        console.log(now)
        console.log(result.expirationDate)
        let toNum1 = todaysDate.toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"})
        console.log(toNum1)

        let toNum2 = result.expirationDate;
        console.log(toNum2)
        const date1 = new Date(`${toNum1}`);
        const date2 = new Date(`${toNum2}`);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        console.log(diffTime + " milliseconds");
        let daysLeft = diffDays + "  (days left)";
       
        if(toNum2 !== toNum1){
            if(result.active === 'true'){
                    $('.inactive-page-status').text('Active')
                    $('.inactive-page-status').css('color', 'green')
                    $('.inactive-status-container').css('width', '99px') 
                    $('.activation-date-add').css('display', 'flex')
                    let expirationDate = $(`<div class="active-expDate"> Expiration Date: ${result.expirationDate}      ${  daysLeft} </div>`)
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
            }
        }else{
            if(result.exp === 'over'){
                console.log('true')
                console.log('equal')
                chrome.storage.local.remove(['active']);
                $('.licence-key').text('Your license key has expired, contact us to buy new License')
                $('.licence-key').css('color', 'red')
            }
            console.log('false')
        }      
    })
    $(".inactive-button" ).click(function() {
        if($('.inactive-page-input').val().length > 1){
            let value = $('.inactive-page-input').val();
            chrome.runtime.sendMessage({messageRequest: value}, function(response) {
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
            chrome.storage.local.set({active: 'true', exp : 'over'});
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
