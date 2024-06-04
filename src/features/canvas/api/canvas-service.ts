// import { socket } from "../../../api/socketio-client";
export const setupCanvas = () => {
  const canvas = <HTMLCanvasElement>(
    document.getElementsByClassName("whiteboard")[0]
  );
  const context = canvas.getContext("2d");

  const current = {
    color: "black",
    x:0,
    y:0
  };

  let drawing = false;

  canvas.addEventListener("mousedown", onMouseDown, false);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseout", onMouseUp, false);
  canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

  window.addEventListener('resize',onResize,false);
  onResize();

  //socket.on("drawing", onDrawingEvent);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function drawLine({
    x0, y0, x1, y1, color, emit,
}: {
    x0: number;
    y0: number;
    x1: number;
    y1: number;
    color: string;
    emit: boolean;
}) {
    context?.beginPath();
    context?.moveTo(x0, y0);
    context?.lineTo(x1, y1);
    context!.strokeStyle = color;
    context!.lineWidth = 2;
    context?.stroke();
    context?.closePath();

    if (!emit) return;

    const w = canvas.width;
    const h = canvas.height;

    // socket.emit("drawing", {
    //   x0: x0 / w,
    //   y0: y0 / h,
    //   x1: x1 / w,
    //   y1: y1 / h,
    //   color: color,
    // });
  }
  function onMouseDown(e:MouseEvent){
    drawing=true;
    current.x=e.clientX;
    current.y=e.clientY;
console.log(current.x,current.y);
  }
  function onMouseUp(e:MouseEvent){
    if(!drawing)return;
    drawing=false;
    const drawParams={
        x0:current.x,
        y0:current.y,
        x1:e.clientX,
        y1:e.clientY,
        color:current.color,
        emit:true
    }

    drawLine(drawParams);
  }
  function onMouseMove(e:MouseEvent){
    if(!drawing)return;
    drawing=false;
    const drawParams={
        x0:current.x,
        y0:current.y,
        x1:e.clientX,
        y1:e.clientY,
        color:current.color,
        emit:true
    }
    drawLine(drawParams);
    current.x=e.clientX;
    current.y=e.clientY;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function throttle(callback:any,delay:any){
    let previousCall=new Date().getTime();
    return function(){
        const time=new Date().getTime();

        if((time-previousCall)>=delay){
            previousCall=time;
            // eslint-disable-next-line prefer-spread, prefer-rest-params
            callback.apply(null,arguments);
        }
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onDrawingEvent(data:any){
    const w=canvas.width;
    const h=canvas.height;
    const drawParams={
        x0:data.x0*w,
        y0:data.y0*h,
        x1:data.x1*w,
        y1:data.y1*h,
        color:data.color,
        emit:false,
    }
    drawLine(drawParams)
  }
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
};
