import _  from 'underscore'


function pagination2(data,obj){
    var data=data
    console.log(obj)
    if(obj?.sortBy&&obj?.sortBy !=""){
        console.log(obj.sortBy)
        data=_.sortBy(data,obj.sortBy)
    }
    if(obj?.order&&obj?.order=="desc"){
        data=data.reverse()
    }


    
    if (obj.page&&obj.size&&obj.page!=0 && obj.size!=0){
        let startRange=(obj.page-1)*obj.size
        let endRange=obj.page*obj.size
        let totalElement=data.length
        let x={}

        console.log(startRange,endRange,totalElement)
        if (startRange<totalElement){
            data=data.slice(startRange,endRange)
             x ={
                "page":obj.page,
                "size":obj.size,
                "totalElement":totalElement,
                "totalPage":Math.ceil(totalElement/obj.size),
                "data":data
             }
    
        }else{
             x ={
                "page":1,
                "size":5,
                "totalElement":totalElement,
                "totalPage":Math.ceil(totalElement/5),
                "data":data.slice(0,5)
             }
            
        }
        
        
        return x
    }
    return data
   
}
export default pagination2
