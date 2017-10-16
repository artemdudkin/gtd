/**
  Объекты этого типа не хранятся в кэше, а при удачном выполнии запроса сбрасывают весь кэш
*/
var Clear = function(cache){
    this.cache = cache;
};
Clear.prototype.invalidate = function(){
}
Clear.prototype.get = function(){
}
Clear.prototype.put = function(){
    this.cache.invalidateAll();
}

export default Clear;