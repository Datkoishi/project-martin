function showresult()
{
    $('.loadingresult').css('display', 'grid');

    setTimeout(function()
    {
        $('.thankyou-page').addClass('thankyou_show');
        $('section').css('display', 'none');

    },1000)
};

  