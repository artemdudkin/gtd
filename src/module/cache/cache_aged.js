/**
  Объекты этого типа хранятся в кэше ttl секунд
*/
const Aged = function( ttl) // ttl = время жизни объекта (в секундах), 30 сек by default
{
    this.ttl  = (ttl || 30) * 1000; 
    this.data = [];
}
Aged.prototype.invalidate = function(){
    this.data = [];
}
Aged.prototype.get = function(qs){
    for (var i in this.data) {
        if (typeof this.data[i] === 'object' && this.data[i].qs === qs) {
            if (Date.now() - this.ttl > this.data[i].timestamp) {
                this.data.splice(i, 1); // ttl превышен, удаляем
            } else {
                return this.data[i];
            }
        }
    }
}
Aged.prototype.put = function(qs, data){
    var d = Object.freeze({ // (раньше я не морозил объект и делал копию в get, но это давало 200ms задержку на больших формах)
        qs : qs, 
        data : data,
        timestamp : Date.now()
    });
    
    var index;
    for (var i in this.data)
        if (typeof this.data[i] === 'object' && this.data[i].qs === qs) 
            index = i;

    if (index) {
        this.data[index] = d;
    } else {
        this.data.push(d);
    }
}

export default Aged;