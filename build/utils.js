const path=require('path');
module.exports={
    reslove:(dir)=>{
        return path.join(__dirname,'..',dir)
    }
}