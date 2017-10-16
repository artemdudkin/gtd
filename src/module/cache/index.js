//import hash   from 'object-hash';
const hash = JSON.stringify;
import Eternal from './cache_eternal';
import Aged    from './cache_aged';
import Clear   from './cache_clear';

/**
  Кэш объектов. 
  Кэшируется далеко не всё - а только то, что перечисленно ниже.
  На данный момент это работает так:
    1. есть список запросов, которые кэшируются до закрытия страницы браузера (eternal)
    2. есть список запросов, которые кэшируются на ttl секунд (aged)
    3. есть список запросов, которые сбрасывают весь кэш при удачном завершении запроса (clear)

  Есть четыре публичных метода: 
    register(id, type, opt) = зарегистрировать запрос
                   (type : eternal | clear | aged, default 'aged')
                   (opt  : opt.ttl   = время жизни для cacheType == 'aged', default 300 sec)

    get(id, qs) = взять данные по составному ключу (type,qs) 
                   (id это "string", qs это "Object". Ключом будет строка, так что от qs будем брать хэш)
                   Обычно, id = url и qs = json с данными запроса

    put(id, qs) = положить данные по составному ключу [для типа Clear в этот момент происходит очистка всего кэша]

    hash(x)      = хэш от аргумента (для упрощения отладки сейчас hash=JSON.stringify )
*/ 

var types = []
types.find = function(id){
    for (var i in types) 
        if (typeof types[i] === 'object' && typeof id === 'string' && id === types[i].id) 
            return types[i];
}

var cache = {
    register : function( id, type, opt){
	let store;
	if (type=='eternal') {
		store = new Eternal() 
	} else if (type=='aged') {
		store = new Aged((opt ? opt.ttl : 0) || 300) //caching for 5 min
	} else {
		store = new Clear(cache)  //invalidate all cache
	}
	types.push({id:id, store:store});
    },

    hash : function(x){
         x = sortObjFieldsAlphabetically(x || {}); // сортируем поля в алфавитном порядке
         delete x.sessionId;
         delete x.webAppData;
         return hash(x);
    },

    invalidateAll : function() {
        for (var i in types)
            if (typeof types[i] == 'object')
                types[i].store.invalidate();
    },

    get : function( id, qs){
         qs = cache.hash(qs);

         var t = types.find(id);
         var s;
         if (t) s = t.store.get(qs);
         
         if (s) 
             return s.data;
    },
    
    put : function( id, qs, data){
	qs = cache.hash(qs);
	var t = types.find(id);
	if (t) {
		t.store.put(qs, data);
	}
    },
}

//сортируем поля объекта в алфавитном порядке
function sortObjFieldsAlphabetically(data) {
	if (data) {
		var sorted = {};
		Object.keys(data).sort(function(a, b){
			return a < b ? -1 : 1
		}).forEach(function(key){
			sorted[key] = data[key];
			if (typeof sorted[key] == 'object' && !(sorted[key] instanceof Array))
				sorted[key] = helper.sortObjFieldsAlphabetically(sorted[key]);
		});
		return sorted;
	}
}

export default cache;
