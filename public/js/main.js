/*global $*/ 
(function(){
    $(function(){
        setTimeout(removeMessage, 1000);
    });
    
    function removeMessage() {
        let $alert = $("div[role='alert']");
        $alert.fadeOut(2000);
    }
})();