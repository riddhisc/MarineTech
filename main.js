(function(){
var f=document.getElementById("cf");
if(f){
var btn=f.querySelector("button[type=submit]");
function show(ok,title,msg){
var o=document.createElement("div");o.className="modal";
o.innerHTML='<div class="box '+(ok?"ok":"err")+'" role="dialog" aria-modal="true"><div class="ic">'+(ok?"✓":"!")+'</div><h3></h3><p></p><button class="btn" type="button">Close</button></div>';
o.querySelector("h3").textContent=title;o.querySelector("p").textContent=msg;
function close(){o.remove();document.removeEventListener("keydown",esc)}
function esc(e){if(e.key==="Escape")close()}
o.querySelector("button").onclick=close;o.onclick=function(e){if(e.target===o)close()};
document.addEventListener("keydown",esc);document.body.appendChild(o);o.querySelector("button").focus()}
f.addEventListener("submit",function(e){
e.preventDefault();
var obj={};new FormData(f).forEach(function(v,k){obj[k]=v});
btn.disabled=true;btn.textContent="Sending…";
fetch(f.action,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(obj)})
.then(function(r){return r.json()})
.then(function(j){if(j.success){f.reset();show(true,"Message sent","Thank you! We have received your message and will get back to you soon.")}else{show(false,"Could not send",(j.message||"Something went wrong.")+" Please email us at services@marinetech.co.in.")}})
.catch(function(){show(false,"Network error","Please check your connection or email us at services@marinetech.co.in.")})
.then(function(){btn.disabled=false;btn.textContent="Send message"})})}
var q=document.getElementById("q");
if(q)q.addEventListener("input",function(){var v=q.value.toLowerCase(),n=0;document.querySelectorAll(".grid li").forEach(function(li){var m=li.textContent.toLowerCase().indexOf(v)>-1;li.hidden=!m;if(m)n++});document.getElementById("none").hidden=n>0})})();
