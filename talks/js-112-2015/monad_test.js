
// unit :: a -> m a
// bind :: m a -> (a -> m b) -> m b


function id_monad() {

    function MONAD() {
        return function unit(value) {
            var monad = Object.create(null);
            monad.bind = function(func) {
                return func(value);
            };
            return monad;
        };
    }
    var id = MONAD();
    var monad = id("Hello, world");
    monad.bind(console.log);
}

function maybe_monad() {
    function MONAD(modifier) {
        var prototype = Object.create(null);
        function unit(value) {
            var monad = Object.create(prototype);
            monad.bind = function(func, args) {
                return func.apply(
                    undefined,
                    [value].concat(Array.prototype.slice.apply(args || []))
                );
            };

            if (typeof modifier === 'function') {
                value = modifier(monad, value);
            }
            return monad;
        }

        unit.lift = function(name, func) {
            prototype[name] = function () {
                var result = this.bind(func, arguments);
                return result && result.is_monad === true ? result : unit(result);
            };
            return unit;
        };
        return unit;
    }

}

id_monad();