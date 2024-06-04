import io from'socket.io-client';

export const socket=io('http://localhost:3000');

socket.onAny((event,message)=>{console.log(event,message)});

export const sendMessage=(text:string)=>{
    socket.emit('client-message',text);
    console.log(`sendMessage invoked with ${text}`)
}   

export const proccessMessages=(cb:{(err:boolean,data:string):void})=>{
    if(!socket) return true;
    socket.on('server-message',msg=>{
        console.log('called');
        return cb( false,msg);
    });
};