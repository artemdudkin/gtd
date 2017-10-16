import Aged from './cache_aged';

/**
  Объекты этого типа хранятся в кэше вечно (т.е. до закрытия текущей страницы браузера)
*/
const Eternal = function(){
    Aged.call(this, Number.POSITIVE_INFINITY);
};

//copy methods of Aged
const _keys = Object.keys(Aged.prototype);
for (let i=0; i<_keys.length; i++) if (typeof Aged.prototype[_keys[i]] === 'function') Eternal.prototype[_keys[i]] = Aged.prototype[_keys[i]];

//with one exception
Eternal.prototype.invalidate = function(){
	//noone (even Clear) cannot clear cached data
}

export default Eternal;