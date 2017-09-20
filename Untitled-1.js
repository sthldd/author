function f1(callback){
    setTimeout(function(){
        //做某件事，可能很久
        console.log('别急，开始执行f1')
        for(var i=0;i< 100000;i++){

        }
        console.log('f1执行完了')

        callback(aa)
    }, 0);
}
f1(function(value){
 console.log(value)
})