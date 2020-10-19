$( document ).ready(function() {
    chrome.storage.local.get(['active', 'actDate', 'exp'], function(result) {
        console.log(result.actDate)
      

        let todaysDate = new Date();
        let now = todaysDate.toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"})
        

        let afterMonth = new Date(`${result.actDate}`);
        dt = new Date(afterMonth.setMonth(afterMonth.getMonth() + 1));
        let nextM = dt.toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"})

        if(nextM >= now){
            if(result.active === 'true'){
                
                $('.active-page-tool').css('color', 'blue')
                $('.inactive-menu-Activation span').css('color','#686d76')
                $('.inactive-page-status').text('Active')
                $('.inactive-page-status').css('color', 'green')
                $('.inactive-licence-key-container').addClass('hideDiv')
                $('.inactive-button').addClass('hideDiv')
                $('.inactive-status-container').text('Extension Works Successfully')
                $('.inactive-status-container').css('color', 'green')
                $('.inactive-status-container').css('width', '300px')

                

    
                $('.inactive-menu-Activation').click(()=>{
                    $('.inactive-menu-Activation span').css('color', 'blue')
                    $('.active-page-tool').css('color','#686d76')
                    $('.inactive-page-status').text('Active')
                    $('.inactive-page-status').css('color', 'green')
                    $('.inactive-status-container').css('width', '99px') 
                    let activationDate = $(`<div class="active-activeDate">Activation Date: ${result.actDate} </div>`)
                    $('.activation-date-add').css('display', 'flex')
                    $(activationDate).css('color', '#686d76')
                    let d = new Date(`${result.actDate}`);
                    dt = new Date(d.setMonth(d.getMonth() + 1));
                    let nextMonth = dt.toLocaleDateString("en", {year:"numeric", day:"2-digit", month:"2-digit"})
                    let expirationDate = $(`<div class="active-expDate"> Expiration Date: ${nextMonth} </div>`)
                    $(expirationDate).css('color', '#686d76')
                    $('.inactive-main-div').append(expirationDate)
                    $('.active-expDate').nextAll('div').remove();
                    $('.licence-key').css('display', 'none')
                    $('.inactive-page-input').prop('disabled', true);
                    $('.inactive-page-input').val('') 
                    $('.inactive-page-input').css('background', 'gainsboro');
                    $('.inactive-button').css('background', '#686d76')
                    let inactiveDiv = $('<div class="inactive-status-container">' +
                    '<div class="inactive-status-title">Status:</div>'+
                    '<div class="inactive-page-status">active</div>'+
                    '</div>')
                    $('.inactive-main-div').html(inactiveDiv)
                    $('.inactive-licence-key-container').removeClass('hideDiv')
                    $('.inactive-button').removeClass('hideDiv')
                    $('.active-expDate').removeClass('hideDiv')
                    $('.inactive-page-status').css('color', 'green')
               })
               $('.active-page-tool').click(()=>{
                     
                $('.active-page-tool').css('color', 'blue')
                $('.inactive-menu-Activation span').css('color','#686d76')
                $('.inactive-page-status').text('Active')
                $('.inactive-page-status').css('color', 'green')
                $('.inactive-licence-key-container').addClass('hideDiv')
                $('.inactive-button').addClass('hideDiv')
                $('.inactive-status-container').text('Extension Works Successfully')
                $('.inactive-status-container').css('color', 'green')
                $('.inactive-status-container').css('width', '300px')
                
               })
            }
           
     
        }else if(nextM < now){

            if(result.exp === 'over'){
                console.log('true')
                console.log('equal')
                chrome.storage.local.remove(['active', 'actDate']);
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
                
            $('.inactive-page-status').text('Active')
            $('.inactive-page-status').css('color', 'green')
            $('.active-page-tool').click(()=>{
            $('.inactive-licence-key-container').addClass('hideDiv')
            $('.inactive-button').addClass('hideDiv')
            $('.inactive-status-container').text('Extension Works Successfully')
            $('.inactive-status-container').css('color', 'green')
            $('.inactive-status-container').css('width', '300px')
            $('.active-page-tool').css('color','blue')
            $('.inactive-menu-Activation span').css('color', '#686d76')
            chrome.storage.local.set({active: 'true', exp : 'over'});
            })
            $('.active-page-tool').trigger('click')

            
        $('.inactive-menu-Activation').click(()=>{
            let inactiveDiv = $('<div class="inactive-status-container">' +
            '<div class="inactive-status-title">Status:</div>'+
            '<div class="inactive-page-status">active</div>'+
            '</div>')
            $('.inactive-main-div').html(inactiveDiv)
            $('.inactive-page-status').css('color', 'green')
            $('.inactive-licence-key-container').removeClass('hideDiv')
            $('.inactive-button').removeClass('hideDiv')
            $('.active-expDate').removeClass('hideDiv')
            $('.licence-key').css('display', 'none')
            $('.inactive-page-input').prop('disabled', true);
            $('.inactive-page-input').val('') 
            $('.inactive-button').css('background', 'grey')
            $('.inactive-menu-Activation span').css('color', 'blue')
            $('.active-page-tool').css('color', '#686d76')
           })
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
