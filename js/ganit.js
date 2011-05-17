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
        var left = createMathElement("mrow");
        var mo = createMathElement("mo");
        var right = createMathElement("mrow");
        var parent = createMathElement("mrow");
        $(left).text("Begin").click(showNodeTypes).appendTo(parent);
        $(mo).text(operation).click(showNodeTypes).appendTo(parent);
        $(right).text("Begin").click(showNodeTypes).appendTo(parent);
        return parent;
    };
    
    var updateMarkup = function(){
        $("#markup").text($("#code").html());
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
                var mrow1 = createMathElement("mrow");
                var mrow2 = createMathElement("mrow");
                $(mrow1).text("Begin").click(showNodeTypes).appendTo(mfrac);
                $(mrow2).text("Begin").click(showNodeTypes).appendTo(mfrac);
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
    
    $(".numberDialog, .nodeTypeDialog").swoopOut();
});
