const $=id=>document.getElementById(id);
const intro=$("intro"), flowersStart=$("flowersStart"), picker=$("picker"), edit=$("edit"), flowersEnd=$("flowersEnd");
function flowerField(el){
 el.innerHTML="";
 for(let i=0;i<30;i++){
  const f=document.createElement("div"); f.className="flower";
  f.style.left=(2+Math.random()*96)+"%"; f.style.setProperty("--h",(70+Math.random()*180)+"px");
  f.style.setProperty("--d",(Math.random()*2.2)+"s");
  f.innerHTML='<div class="stem"></div><div class="bloom"><i class="p"></i><i class="p"></i><i class="p"></i><i class="p"></i><i class="p"></i><b class="c"></b></div>';
  el.appendChild(f);
 }
}
function show(a){[intro,flowersStart,picker,edit,flowersEnd].forEach(x=>x.classList.add("hidden"));a.classList.remove("hidden")}
setTimeout(()=>{show(flowersStart);flowerField($("startField"))},2850);

$("toPhotos").onclick=()=>show(picker);
let selected=[];
$("photoInput").onchange=e=>{
 selected=[...e.target.files].filter(f=>f.type.startsWith("image/"));
 const preview=$("preview"); preview.innerHTML="";
 selected.forEach(f=>{const im=document.createElement("img");im.src=URL.createObjectURL(f);preview.appendChild(im)});
 $("startEdit").disabled=selected.length===0;
};
let i=0;
function beginEdit(){
 if(!selected.length)return;
 show(edit); i=0; renderPhoto();
 const audio=$("music");
 audio.src="audio/made-in-japan.mp3";
 audio.play().catch(()=>{});
}
function renderPhoto(){
 document.querySelectorAll(".photo").forEach(x=>x.remove());
 const im=document.createElement("img"); im.className="photo show"; im.src=URL.createObjectURL(selected[i]); $("photoStage").appendChild(im);
}
function next(){
 i++;
 if(i<selected.length){renderPhoto()}else{
  const a=$("music");a.pause();show(flowersEnd);flowerField($("endField"));
 }
}
$("startEdit").onclick=beginEdit;
$("nextPhoto").onclick=next;
edit.onclick=e=>{if(e.target.id!=="nextPhoto")next()};
$("again").onclick=()=>show(flowersStart);
