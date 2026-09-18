const WHATSAPP_NUMBER="351929479736"; // SUBSTITUIR pelo número WhatsApp da TRAÇO
const products=[
{id:1,name:"T-Shirt Essential",cat:"T-shirts",brand:"BOSS",price:49.90,img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85"},
{id:2,name:"T-Shirt Logo",cat:"T-shirts",brand:"Calvin Klein",price:54.90,img:"https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=900&q=85"},
{id:3,name:"Sweatshirt Premium",cat:"Sweatshirts",brand:"Tommy Hilfiger",price:99.90,img:"https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85"},
{id:4,name:"Sweatshirt Essential",cat:"Sweatshirts",brand:"Lacoste",price:109.90,img:"https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=85"},
{id:5,name:"Casaco Urban",cat:"Casacos",brand:"Boss",price:189.90,img:"https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=900&q=85"},
{id:6,name:"Casaco Minimal",cat:"Casacos",brand:"Emporio Armani",price:219.90,img:"https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85"},
{id:7,name:"Calças Slim",cat:"Calças",brand:"Calvin Klein",price:89.90,img:"https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=900&q=85"},
{id:8,name:"Calças Casual",cat:"Calças",brand:"Tommy Hilfiger",price:94.90,img:"https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=900&q=85"}];
let cart=JSON.parse(localStorage.getItem("tracoCart")||"[]");
const eur=n=>n.toLocaleString("pt-PT",{style:"currency",currency:"EUR"});
function render(cat="Todos"){let a=cat==="Todos"?products:products.filter(p=>p.cat===cat);document.querySelector("#products").innerHTML=a.map(p=>`<article class="product"><div class="photo"><img src="${p.img}" alt="${p.name}"></div><div class="info"><h3>${p.name}</h3><p>${p.brand} · ${eur(p.price)}</p><button onclick="add(${p.id})">ADICIONAR AO CARRINHO</button></div></article>`).join("")}
function add(id){let p=products.find(x=>x.id===id),i=cart.find(x=>x.id===id);i?i.qty++:cart.push({...p,qty:1});save();openCart()}
function save(){localStorage.setItem("tracoCart",JSON.stringify(cart));renderCart()}
function renderCart(){document.querySelector("#count").textContent=cart.reduce((a,x)=>a+x.qty,0);let el=document.querySelector("#items");if(!cart.length){el.innerHTML='<p class="empty">O carrinho está vazio.</p>'}else{el.innerHTML=cart.map(x=>`<div class="item"><img src="${x.img}"><div><h4>${x.name}</h4><p>${x.qty} × ${eur(x.price)}</p><button class="remove" onclick="removeItem(${x.id})">Remover</button></div></div>`).join("")}document.querySelector("#total").textContent=eur(cart.reduce((a,x)=>a+x.price*x.qty,0))}
function removeItem(id){cart=cart.filter(x=>x.id!==id);save()}
function openCart(){document.querySelector("#drawer").classList.add("open");document.querySelector("#veil").classList.add("open")}
function toggleCart(){document.querySelector("#drawer").classList.toggle("open");document.querySelector("#veil").classList.toggle("open");renderCart()}
function sendWhatsApp(){if(!cart.length)return alert("O carrinho está vazio.");if(WHATSAPP_NUMBER.includes("X"))return alert("Falta configurar o número de WhatsApp da TRAÇO no ficheiro script.js.");let msg="Olá TRAÇO! Quero fazer esta encomenda:%0A%0A"+cart.map(x=>`• ${x.name} — ${x.qty}x — ${eur(x.price*x.qty)}`).join("%0A")+"%0A%0ATotal: "+eur(cart.reduce((a,x)=>a+x.price*x.qty,0))+"%0A%0AQuero pagar por MB WAY.";window.open("https://wa.me/"+WHATSAPP_NUMBER+"?text="+msg,"_blank")}
function openWhatsApp(){if(WHATSAPP_NUMBER.includes("X"))return alert("Falta configurar o número de WhatsApp da TRAÇO.");window.open("https://wa.me/"+WHATSAPP_NUMBER,"_blank")}
document.querySelectorAll(".filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.cat)});
render();renderCart();
