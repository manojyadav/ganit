$.fn.swoopIn = function(){
    this.css({
        "left": "100px",
        "position": "fixed",
        "top": "100px",
        "-moz-transition": "all .25s ease-out",
        "-o-transition": "all .25s ease-out",
    });
    return this;
};

$.fn.swoopOut = function(){
    this.css({
        "left": "2000px",
        "position": "fixed",
        "top": "100px",
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
            case 'Subtration':
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
                break;
            case 'Identifier':
                $(".identifierDialog").swoopIn();
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
                var mfenced = createMathElement("mfenced");
                $(createRecursiveNode()).appendTo(mfenced);
                $(mfenced).insertAfter(currentNode);
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
        }
        
        $(".nodeTypeDialog").swoopOut();
    });
    
    $(".numberDialog .ok").click(function(){
        var mn = createMathElement("mn");
        var num = $(".numberDialog .number").val();
        $(mn).text(num).click(showNodeTypes).insertAfter(currentNode);
        $(currentNode).remove();
        $(".numberDialog").swoopOut();
        updateMarkup();
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
});
