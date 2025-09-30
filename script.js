/* === Songlines generator === */
(function(){
  const svg=document.getElementById('bg');
  function r(a,b){return Math.random()*(b-a)+a}
  function build(w,h,segs,y,amp,v){
    const step=w/(segs-1);
    const pts=Array.from({length:segs},(_,i)=>[i*step+r(-8,8),y+Math.sin(i*r(.6,.95))*amp+r(-v,v)]);
    let d=`M ${pts[0][0]},${pts[0][1]}`;
    for(let i=0;i<pts.length-1;i++){
      const p0=pts[Math.max(0,i-1)],p1=pts[i],p2=pts[i+1],p3=pts[Math.min(pts.length-1,i+2)];
      const c1=[p1[0]+(p2[0]-p0[0])/6,p1[1]+(p2[1]-p0[1])/6],c2=[p2[0]-(p3[0]-p1[0])/6,p2[1]-(p3[1]-p1[1])/6];
      d+=` C ${c1[0]},${c1[1]} ${c2[0]},${c2[1]} ${p2[0]},${p2[1]}`;
    }
    return d;
  }
  function mk(stroke){
    const p=document.createElementNS('http://www.w3.org/2000/svg','path');
    p.setAttribute('class','sl');p.setAttribute('stroke',stroke);
    p.style.strokeDasharray=`1 ${Math.round(r(11,16))}`;
    p.style.animation=`sl-drift ${Math.round(r(25,50))}s linear infinite`;
    return p;
  }
  function regen(){
    while(svg.firstChild) svg.removeChild(svg.firstChild);
    const defs=document.createElementNS('http://www.w3.org/2000/svg','defs');
    defs.innerHTML='<filter id="sl-glow"><feGaussianBlur stdDeviation="1.6" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>';
    svg.appendChild(defs);
    const w=1440,h=900,ys=[h*.3,h*.5,h*.7],amps=[80,60,40];
    const colors=['#5a9cff','#c55410','rgba(0,0,0,.6)'];
    ys.forEach((y,i)=>{const p=mk(colors[i]);p.setAttribute('d',build(w,h,7,y,amps[i],h*.06));svg.appendChild(p)});
  }
  regen();window.addEventListener('resize',regen);
})();