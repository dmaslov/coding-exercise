(function($){
    var options = {
        frequency: 15,
        limit: 5
    };
    var $table = $('.board').find('table');
    var $tBody = $table.find('tbody');
    var content;
    var formatNumber = function(number) {
        /* adds the commas in the number */
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    var poller = new window.massrel.Poller(options, function(bands){
        if(!$.isEmptyObject(bands)){
            content = '';
            /* creating inner tbody structure */
            $.each(bands, function(index, bandInfo){
                content += '<tr>';
                content += '<td>';
                content += bandInfo.name;
                content += '</td>';
                content += '<td>';
                content += formatNumber(bandInfo.count);
                content += '<span>Mentions</span>';
                content += '</td>';
                content += '</tr>';
            });
            if(content !== ''){
                /* show results with simple animation */
                $tBody.fadeOut(2000).promise().done(function(){
                    $table.css('display', 'block');
                    $(this).html(content).fadeIn(2000);
                });

            }else{
                /* hide the whole table if no results */
                $table.css('display', 'none');
            }
        }
    });
    poller.start();
})(jQuery);

