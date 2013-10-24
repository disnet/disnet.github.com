requirejs.config({
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

require(["./sweet"], function(sweet) {
    $('pre.example').each(function() {
        var editor = $("<textarea class='editor'></textarea>");
        var output = $("<textarea class='output'></textarea>");

        editor.text($(this).text());
        editor.keyup(function(e) {
            if (e.keyCode === 13 && e.ctrlKey) {
                var code = editor.val();
                try {
                    var compiled = sweet.compile(code);
                    output.text(compiled);
                } catch (e) {
                    output.text("" + e);
                }
            }
        });

        $(this).hide();
        $(this).after(output);
        $(this).after(editor);

    });
    
});

