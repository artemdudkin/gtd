/**
 Модуль, который умеет (выборочно) сохранять и восстанавливать дерево состояния redux
*/
import cookie from 'react-cookie';

/**
 список нод (первого уровня) дерева состояний, которые нужно сохранять

 @param {string}   id
 @param {Any}      default = значение по-умолчанию (мы сеттим дерево до срабатывания значений по умолчанию из reducer'ов - получается дублирование, да)
 @param {boolean}  cookie  = сохраняем не в sessionStorage, а в куки
 @param {Object}   mapping
 @param {Function} mapping.save = (obj) функция маппинга при сохранении, returns {Object}
 @param {Function} mapping.load = (obj) функция маппинга при загрузке, returns {Object}

 Sample:
var _branch = [
    {id:'session',
        cookie : true, // это сохраняем не в sessionStorage, а в куки
        mapping:{
            "save":obj=>obj.id, 
            "load":id=>{return {id:id, logged:true}}
        }
    },
    {id:'settings', 
        default : DEFAULT_SETTINGS, 
        mapping:{
            "save":obj=>{
                const s = Object.assign({}, obj); 
                delete s.failed; 
                delete s.inited; 
                return s;
            }
        } 
    },
    {id:'language', default : 'en'},
    {id:'otp_mode', default : 'sms'},
    {id:'demo',     default : {
        non_demo_settings : Object.assign({}, DEFAULT_SETTINGS), 
        bank              : DEFAULT_SETTINGS.bank, 
        theme             : DEFAULT_SETTINGS.theme
    }},
    {id:'locale',   default:{
        id:'en', 
        messages:[], 
        changed:{}, 
        original:{}}
    }
]

*/
var _branch = []

/** текущие значения того, что будем сохранять */
var _branchValue = {};

/** стаб, который  подставляем, когда нет window.sessionStorage */
var _nullStorage = {getItem:()=>{}, setItem:()=>{}, removeItem:()=>{}, clear:()=>{}, keys:()=>{}}

/** хранилище, куда всё сохраняем (sessionStorage или _nullStorage) */
var _storage = (typeof window != 'undefined' && window.sessionStorage ? window.sessionStorage : _nullStorage)

var helper = {

    config : function(cfg){
	_branch = cfg;
    },

    clear : function() {
	_branch.forEach((itm) => {
            var id = itm.id;
            if (itm.cookie) {
                     cookie.remove(id);
            } else {
                     _storage.removeItem(id);
            }
	})
    },

    save : function(state){
	_branch.forEach((itm) => {
            var id = itm.id;
            if (_branchValue[id] !== state[id]) {
                _branchValue[id] = state[id];
                
                var value = itm.mapping && itm.mapping.save ? itm.mapping.save(state[id]) : state[id];
                if (itm.cookie) {
                     cookie.save(id, value, {path: '/'});
                } else {
                     _storage.setItem(id, JSON.stringify(value));
                }
            }
        })
    },
    
    load : function(dispatch){
        var ret = {}
	_branch.forEach((itm) => {
            var id = itm.id;
            var value;
            try{
                value = (itm.cookie ? cookie.load(id)  : JSON.parse(_storage.getItem(id)));
            } catch(ex){
                //nop
            }
            if (itm.mapping && itm.mapping.load) value = itm.mapping.load(value);

            if (typeof value === 'undefined' || value === null) value = itm.default;
            if (typeof value !== 'undefined' && value !== null) {
                _branchValue[id] = value; // prevent save immediatly after load
                ret[id] = value;
            }
        });
        return ret;
    }
};
for (var i in helper) if (typeof helper[i] === 'function') helper[i] = helper[i].bind(helper);

export default helper;
