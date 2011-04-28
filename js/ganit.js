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

    $("mrow").click(showNodeTypes);
    
    $(".choices li").click(function(){
        var choice = $(this).text();
        
        $(currentNode).unbind('click', showNodeTypes);
        $(currentNode).empty();
        
        if (choice == 'Addition'){
            var left = createMathElement("mrow");
            var mo = createMathElement("mo");
            var right = createMathElement("mrow");
            $(left).text("Begin").click(showNodeTypes).appendTo(currentNode);
            $(mo).text("+").click(showNodeTypes).appendTo(currentNode);
            $(right).text("Begin").click(showNodeTypes).appendTo(currentNode);
        }else if (choice == 'Division'){
            var mfrac = createMathElement("mfrac");
            var mrow1 = createMathElement("mrow");
            var mrow2 = createMathElement("mrow");
            $(mrow1).text("Begin").click(showNodeTypes).appendTo(mfrac);
            $(mrow2).text("Begin").click(showNodeTypes).appendTo(mfrac);
            $(currentNode).append(mfrac);
        }else if (choice == 'Subtraction'){
            var left = createMathElement("mrow");
            var mo = createMathElement("mo");
            var right = createMathElement("mrow");
            $(left).text("Begin").click(showNodeTypes).appendTo(currentNode);
            $(mo).text("-").click(showNodeTypes).appendTo(currentNode);
            $(right).text("Begin").click(showNodeTypes).appendTo(currentNode);
        }else if (choice == 'Cross Product'){
            var left = createMathElement("mrow");
            var mo = createMathElement("mo");
            var right = createMathElement("mrow");
            $(left).text("Begin").click(showNodeTypes).appendTo(currentNode);
            $(mo).text("×").click(showNodeTypes).appendTo(currentNode);
            $(right).text("Begin").click(showNodeTypes).appendTo(currentNode);
        }else if (choice == 'Number'){
            $(".numberDialog").swoopIn();
        }
        
        $(".nodeTypeDialog").swoopOut();
    });
    
    $(".numberDialog .ok").click(function(){
        var mn = createMathElement("mn");
        var num = $(".numberDialog .number").val();
        $(mn).text(num).appendTo(currentNode);
        $(".numberDialog").swoopOut();
    });
    
    $(".numberDialog, .nodeTypeDialog").swoopOut();
});
