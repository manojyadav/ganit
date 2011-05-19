$.fn.swoopIn = function(){
    this.setPopupPosition();
    this.css({"-moz-transition": "all .25s ease-out", "-o-transition": "all .25s ease-out"});
    return this;
};

$.fn.swoopOut = function(){
    this.css({
        "left": "2000px",
        "-moz-transition": "all .25s ease-out",
        "-o-transition": "all .25s ease-out",
    });
    return this;
};

$(function(){
    var currentNode;

    var createMathElement = function(tag){
        return document.createElementNS("http://www.w3.org/1998/Math/MathML", tag);
    };
    
    var showNodeTypes = function(){
        currentNode = this;
        $(".nodeTypeDialog").swoopIn();
    };
    
    var createBinaryStructure = function(operation){
        var parent = createMathElement("mrow");
        $(createRecursiveNode()).appendTo(parent);
        $(createRecursiveNode(operation)).appendTo(parent);
        $(createRecursiveNode()).appendTo(parent);
        return parent;
    };
    
    var createFenceStructure = function(type){
        var mfenced = createMathElement("mfenced");
        var open, close;
        switch (type){
            case 'square':
                open = "[";
                close = "]";
                break;
            case 'curly':
                open = "{";
                close = "}";
                break;
            default:
            case 'round':
                open = "(";
                close = ")";
                break;
        }
        $(mfenced).attr("open", open).attr("close", close);
        $(createRecursiveNode()).appendTo(mfenced);
        return mfenced;
    };
    
    var updateMarkup = function(){
        $("#markup").text($("#code").html());
    };
    
    var createRecursiveNode = function(txt){
        var node = createMathElement("mrow");
        var t = (txt) ? txt : "Begin";
        $(node).text(t).click(showNodeTypes);
        return node;
    };
    
    $("mrow").click(showNodeTypes);
    
    $(".choices li").click(function(){
        var choice = $(this).text();
        
        switch (choice){
            case 'Addition':
                $(createBinaryStructure("+")).insertAfter(currentNode);
                $(currentNode).remove();
                updateMarkup();
                break;
            case 'Division':
                var mfrac = createMathElement("mfrac");
                $(createRecursiveNode()).appendTo(mfrac);
                $(createRecursiveNode()).appendTo(mfrac);
                $(mfrac).insertAfter(currentNode);
                $(currentNode).remove();
                updateMarkup();
                break;
            case 'Subtraction':
                $(createBinaryStructure("-")).insertAfter(currentNode);
                $(currentNode).remove();
                updateMarkup();
                break;
            case 'Cross Product':
                $(createBinaryStructure("×")).insertAfter(currentNode);
                $(currentNode).remove();
                updateMarkup();
                break;
            case 'Number':
                $(".numberDialog").swoopIn();
                $(".numberDialog .number").val('').focus();
                break;
            case 'Identifier':
                $(".identifierDialog").swoopIn();
                $(".identifierDialog input").val('').focus();
                break;
            case 'Equality':
                $(createBinaryStructure("=")).insertAfter(currentNode);
                $(currentNode).remove();
                updateMarkup();
                break;
            case 'Square Root':
                var msqrt = createMathElement("msqrt");
                $(createRecursiveNode()).appendTo(msqrt);
                $(msqrt).insertAfter(currentNode);
                $(currentNode).remove();
                updateMarkup();
                break;
            case 'Power':
                var msup = createMathElement("msup");
                $(createRecursiveNode()).appendTo(msup);
                $(createRecursiveNode()).appendTo(msup);
                $(msup).insertAfter(currentNode);
                $(currentNode).remove();
                updateMarkup();
                break;
            case 'Round Brackets':
                $(createFenceStructure("round")).insertAfter(currentNode);
                $(currentNode).remove();
                updateMarkup();
                break;
            case 'Root':
                var mroot = createMathElement("mroot");
                $(createRecursiveNode()).appendTo(mroot);
                $(createRecursiveNode()).appendTo(mroot);
                $(mroot).insertAfter(currentNode);
                $(currentNode).remove();
                updateMarkup();
                break;
            case 'Square Brackets':
                $(createFenceStructure("square")).insertAfter(currentNode);
                $(currentNode).remove();
                updateMarkup();
                break;
            case 'Curly Brackets':
                $(createFenceStructure("curly")).insertAfter(currentNode);
                $(currentNode).remove();
                updateMarkup();
                break;
                break;
        }
        
        $(".nodeTypeDialog").swoopOut();
    });
    
    $(".numberDialog .ok").click(function(){
        var mn = createMathElement("mn");
        var num = $(".numberDialog .number").val();
        if (!isNaN(num)){
            $(mn).text(num).click(showNodeTypes).insertAfter(currentNode);
            $(currentNode).remove();
            $(".numberDialog").swoopOut();
            updateMarkup();
        }else{
            alert("Sorry, thats not a number!");
        }
    });
    
    $(".identifierDialog .ok").click(function(){
        var mi = createMathElement("mi");
        var identifier = $(".identifierDialog input").val();
        $(mi).text(identifier).click(showNodeTypes).insertAfter(currentNode);
        $(currentNode).remove();
        $(".identifierDialog").swoopOut();
        updateMarkup();
    });
    
    $(".nodeTypeDialog .cancel").click(function(){
        $(".nodeTypeDialog").swoopOut();
    });
    
    $(".dialog").swoopOut();
    
    $('span.close').click(function() {
        $(this).parent().parent().swoopOut();
    });
});

$.fn.setPopupPosition = function () {
    var left = ($(window).width() - this.width()) / 2 + $(window).scrollLeft() - 22;
    var top = ($(window).height() - this.height()) / 2 + $(window).scrollTop() - 22;
    if (left < 0)
    {
        left = 0;
    }
    if (top < 0)
    {
        top = 0;
    }
    this.css({"left": left + "px", "top": top + "px"});
    return this;
}