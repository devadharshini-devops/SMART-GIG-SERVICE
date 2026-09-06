import {useState,useEffect} from "react"
export default function App(){
const [page,setPage]=useState("login")
const [role,setRole]=useState("user")
const [uf,setUf]=useState({n:"",email:"",wId:"",phone:""})
const [profile,setProfile]=useState({name:"",email:"",wId:"",phone:""})
const [err,setErr]=useState("")
const [b,setB]=useState(()=>{try{return JSON.parse(localStorage.getItem("SMART_ZIG_FINAL"))}catch{return null}})
const [sel,setSel]=useState(null)
const [st,setSt]=useState("All")
const [emgType,setEmgType]=useState(null)
const [cs,setCs]=useState("idle")
const [otp,setOtp]=useState("")
const [bookForm,setBookForm]=useState({cName:"",cPhone:"",cAddress:""})
const [payMode,setPayMode]=useState("")
const [workStatus,setWorkStatus]=useState("")

const BG="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=900"
const BG2="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=900"
const BG3="https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900"
const PAINTING_IMG="https://images.pexels.com/photos/221027/pexels-photo-221027.jpeg?auto=compress&cs=tinysrgb&w=600"

const save=(x)=>{localStorage.setItem("SMART_ZIG_FINAL",JSON.stringify(x));setB(x)}
const goBack=()=>{window.speechSynthesis.cancel(); if(st!=="All"||emgType){if(st==="Emergency"&&emgType){setEmgType(null)}else{setSt("All");setEmgType(null)}}else if(page==="list"){setPage("home")}else if(page==="call"){setPage("list")}else{setPage("login")}}

useEffect(()=>{
  const sync=()=>{try{const r=localStorage.getItem("SMART_ZIG_FINAL"); if(r){const p=JSON.parse(r); if(JSON.stringify(p)!==JSON.stringify(b)) setB(p)}}catch{}}
  const t=setInterval(sync,700)
  window.addEventListener("storage",sync)
  return()=>{clearInterval(t);window.removeEventListener("storage",sync)}
},[b])

const HOUSEHOLD=[
{name:"Public Area Cleaning",cost:499,ec:999,img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600",worker:{n:"Lakshmi",id:"WK01"}},
{name:"Hostel Cleaning",cost:599,ec:1099,img:"https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=600",worker:{n:"Priya",id:"WK02"}},
{name:"Kitchen Cleaning",cost:699,ec:1199,img:"https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600",worker:{n:"Anu",id:"WK03"}},
{name:"Bathroom Cleaning",cost:499,ec:999,img:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",worker:{n:"Meena",id:"WK04"}},
{name:"Electrical Repair",cost:449,ec:949,img:"https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=600",worker:{n:"Suresh",id:"WK05"}},
{name:"Plumbing Work",cost:399,ec:899,img:"https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?w=600",worker:{n:"Mani",id:"WK06"}},
{name:"AC Service",cost:699,ec:1299,img:"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600",worker:{n:"Arun",id:"WK07"}},
{name:"Carpenter Work",cost:549,ec:1099,img:"https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600",worker:{n:"Ravi",id:"WK08"}},
{name:"Painting",cost:899,ec:1499,img:PAINTING_IMG,worker:{n:"Karthik",id:"WK09"}},
{name:"Sofa Cleaning",cost:899,ec:1499,img:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",worker:{n:"Sofa Team",id:"WK11"}},
{name:"Washing Machine",cost:599,ec:1099,img:"https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=600",worker:{n:"Kumar",id:"WK12"}},
{name:"TV Repair",cost:499,ec:999,img:"https://images.unsplash.com/photo-1593784991095-a205069470b6?w=600",worker:{n:"Murali",id:"WK13"}},
{name:"Furniture Polish",cost:999,ec:1699,img:"https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=600",worker:{n:"Polish",id:"WK14"}},
{name:"Door Repair",cost:449,ec:949,img:"https://images.unsplash.com/photo-1513694203232-719a280e022f?w=600",worker:{n:"Door Team",id:"WK15"}},
{name:"Laundry Service",cost:349,ec:799,img:"https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=600",worker:{n:"Laundry",id:"WK31"}},
]
const COMMUNITY=[
{name:"Garbage Collection",cost:249,ec:599,img:"https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500",worker:{n:"Murugan",id:"WK16"}},
{name:"Drainage Cleaning",cost:399,ec:849,img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500",worker:{n:"Velu",id:"WK17"}},
{name:"Road Repair",cost:1299,ec:2199,img:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",worker:{n:"Sekar",id:"WK18"}},
{name:"Streetlight Fix",cost:299,ec:749,img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500",worker:{n:"Prakash",id:"WK19"}},
{name:"Water Supply",cost:349,ec:799,img:"https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=500",worker:{n:"Water Team",id:"WK20"}},
{name:"Public Toilet Cleaning",cost:499,ec:999,img:"https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500",worker:{n:"Toilet Team",id:"WK21"}},
{name:"Public Area Cleaning",cost:399,ec:799,img:"https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500",worker:{n:"Clean Team",id:"WK22"}},
{name:"Illegal Dumping",cost:599,ec:1099,img:"https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500",worker:{n:"Dump Team",id:"WK23"}},
{name:"Blocked Road",cost:799,ec:1299,img:"https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=500",worker:{n:"Road Team",id:"WK24"}},
{name:"Gardening",cost:499,ec:949,img:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",worker:{n:"Kannan",id:"WK25"}},
{name:"Sewage Cleaning",cost:899,ec:1499,img:"https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=500",worker:{n:"Sewage",id:"WK26"}},
{name:"Tree Cutting",cost:599,ec:1099,img:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",worker:{n:"Tree Team",id:"WK27"}},
{name:"Building Maintain",cost:1499,ec:2299,img:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",worker:{n:"Building",id:"WK28"}},
{name:"Security Service",cost:999,ec:1699,img:"https://images.unsplash.com/photo-1558002038-1055907df827?w=500",worker:{n:"Security",id:"WK29"}},
{name:"Park Maintenance",cost:799,ec:1299,img:"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500",worker:{n:"Park Team",id:"WK30"}},
]
const EMG_H=HOUSEHOLD.map(s=>({...s,cat:"Emergency",origCat:"Household",cost:s.ec}))
const EMG_C=COMMUNITY.map(s=>({...s,cat:"Emergency",origCat:"Community",cost:s.ec}))
const speak=(t)=>{if('speechSynthesis' in window){window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.rate=0.9;window.speechSynthesis.speak(u)}}
const getList=()=>{if(st==="Household") return HOUSEHOLD; if(st==="Community") return COMMUNITY; if(st==="Emergency") return emgType==="Household"?EMG_H:emgType==="Community"?EMG_C:[...EMG_H,...EMG_C]; return []}
const initial=(n)=>(n||"U").charAt(0).toUpperCase()
const pageBG={minHeight:"100vh",backgroundImage:`url(${BG})`,backgroundSize:"cover",backgroundPosition:"center",backgroundAttachment:"fixed",position:"relative"}
const overlay={position:"absolute",inset:0,background:"rgba(255,255,255,0.82)",backdropFilter:"blur(3px)"}
const contentWrap={position:"relative",zIndex:1}

return(
<div style={{minHeight:"100vh",fontFamily:"Inter,sans-serif",background:"#f8fafc"}}>

{page==="login" && (
<div style={{minHeight:"100vh",position:"relative",display:"flex",justifyContent:"center",alignItems:"center",padding:20,backgroundImage:`url(${BG})`,backgroundSize:"cover"}}>
<div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}></div>
<div style={{position:"relative",width:360,background:"#fff",borderRadius:28,padding:28}}>
<div style={{textAlign:"center",marginBottom:20}}><div style={{width:80,height:80,background:"#16a34a",borderRadius:40,display:"flex",justifyContent:"center",alignItems:"center",margin:"0 auto",fontSize:36}}>🛠️</div><h2 style={{fontWeight:900,fontSize:28,margin:"14px 0 0"}}>SMART - ZIG</h2></div>
<div style={{display:"flex",gap:8,marginBottom:16}}>
<div onClick={()=>setRole("user")} style={{flex:1,padding:10,textAlign:"center",borderRadius:10,background:role==="user"?"#16a34a":"#f1f5f9",color:role==="user"?"#fff":"#64748b",fontWeight:800,cursor:"pointer",fontSize:12}}>👤 USER</div>
<div onClick={()=>setRole("worker")} style={{flex:1,padding:10,textAlign:"center",borderRadius:10,background:role==="worker"?"#16a34a":"#f1f5f9",color:role==="worker"?"#fff":"#64748b",fontWeight:800,cursor:"pointer",fontSize:12}}>🛠️ WORKER</div>
</div>
{err && <div style={{background:"#fee2e2",color:"#dc2626",padding:8,borderRadius:8,fontSize:12,textAlign:"center",marginBottom:10}}>{err}</div>}
{role==="user" && <>
<input placeholder="Enter Name" value={uf.n} onChange={e=>setUf({...uf,n:e.target.value})} style={{width:"100%",padding:16,borderRadius:14,border:"1.5px solid #e2e8f0",marginBottom:12}}/>
<input placeholder="Enter Email" value={uf.email} onChange={e=>setUf({...uf,email:e.target.value})} style={{width:"100%",padding:16,borderRadius:14,border:"1.5px solid #e2e8f0",marginBottom:16}}/>
</>}
{role==="worker" && <>
<input placeholder="Enter Name" value={uf.n} onChange={e=>setUf({...uf,n:e.target.value})} style={{width:"100%",padding:16,borderRadius:14,border:"1.5px solid #e2e8f0",marginBottom:12}}/>
<input placeholder="Enter Worker ID" value={uf.wId} onChange={e=>setUf({...uf,wId:e.target.value})} style={{width:"100%",padding:16,borderRadius:14,border:"1.5px solid #e2e8f0",marginBottom:12}}/>
<input placeholder="Enter Phone No" value={uf.phone} onChange={e=>setUf({...uf,phone:e.target.value})} style={{width:"100%",padding:16,borderRadius:14,border:"1.5px solid #e2e8f0",marginBottom:16}}/>
</>}
<button onClick={()=>{
 if(!uf.n){setErr("Name podu da!");return}
 if(role==="user" &&!uf.email){setErr("Email podu da!");return}
 if(role==="worker" &&!uf.wId){setErr("Worker ID podu da!");return}
 if(role==="worker" &&!uf.phone){setErr("Phone No podu da!");return}
 setProfile({name:uf.n,email:uf.email,wId:uf.wId,phone:uf.phone})
 setErr("")
 if(role==="worker"){setPage("wdash")}else{setPage("home")}
}} style={{width:"100%",padding:16,background:"#15803d",color:"#fff",border:"none",borderRadius:14,fontWeight:900}}>LOGIN</button>
</div>
</div>
)}

{page==="home" && (
<div style={pageBG}><div style={overlay}></div><div style={{...contentWrap,padding:12}}><div style={{maxWidth:400,margin:"0 auto"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12,background:"#fff",padding:"10px 14px",borderRadius:14,boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}>
<h2 style={{fontWeight:900,fontSize:20,margin:0}}>Types of Services</h2>
<div style={{display:"flex",alignItems:"center",gap:8}}><div style={{textAlign:"right"}}><div style={{fontSize:11,fontWeight:800}}>{profile.name}</div><div style={{fontSize:9,color:"#666"}}>Welcome!</div></div><div style={{width:42,height:42,background:"#111",borderRadius:21,display:"flex",justifyContent:"center",alignItems:"center",color:"#fff",fontWeight:900,border:"2px solid #16a34a"}}>{initial(profile.name)}</div></div>
</div>
<div style={{display:"flex",flexDirection:"column",gap:16}}>
<div onClick={()=>{setSt("Household");setPage("list")}} style={{background:"#fff",borderRadius:20,border:"3px solid #16a34a",overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}><div style={{height:180,backgroundImage:`url(${BG2})`,backgroundSize:"cover"}}></div><div style={{padding:14,textAlign:"center"}}><div style={{fontWeight:900}}>🏠 Household Services</div><div style={{background:"#15803d",color:"#fff",padding:12,borderRadius:12,marginTop:10,fontWeight:900}}>VIEW SERVICES →</div></div></div>
<div onClick={()=>{setSt("Community");setPage("list")}} style={{background:"#fff",borderRadius:20,border:"3px solid #3b82f6",overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}><div style={{height:180,backgroundImage:`url(${BG3})`,backgroundSize:"cover"}}></div><div style={{padding:14,textAlign:"center"}}><div style={{fontWeight:900}}>🏘️ Community Services</div><div style={{background:"#2563eb",color:"#fff",padding:12,borderRadius:12,marginTop:10,fontWeight:900}}>VIEW SERVICES →</div></div></div>
<div onClick={()=>{setSt("Emergency");setEmgType(null);setPage("list")}} style={{background:"#fff",borderRadius:20,border:"3px solid #ef4444",overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}><div style={{height:180,backgroundImage:"url(https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600)",backgroundSize:"cover"}}></div><div style={{padding:14,textAlign:"center"}}><div style={{fontWeight:900}}>🚨 Emergency Services</div><div style={{background:"#dc2626",color:"#fff",padding:12,borderRadius:12,marginTop:10,fontWeight:900}}>VIEW SERVICES →</div></div></div>
</div>
</div></div></div>
)}

{page==="list" && (
<div style={{...pageBG,backgroundImage:`url(${BG2})`}}><div style={overlay}></div><div style={{...contentWrap,padding:10}}><div style={{maxWidth:420,margin:"0 auto"}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,background:"#fff",padding:"8px 12px",borderRadius:20,boxShadow:"0 2px 8px rgba(0,0,0,0.1)"}}><button onClick={goBack} style={{padding:"8px 14px",borderRadius:20,border:"none",background:"#f1f5f9",fontWeight:800}}>← Back</button><div style={{display:"flex",alignItems:"center",gap:6}}><div style={{width:34,height:34,background:"#111",borderRadius:17,display:"flex",justifyContent:"center",alignItems:"center",color:"#fff",fontWeight:900}}>{initial(profile.name)}</div><span style={{fontSize:11,fontWeight:800}}>{profile.name}</span></div></div>

{/* COUNT REMOVE - Ipo 15 Services nu varathu - Ne sonna maathiri */}
<h3 style={{textAlign:"center",fontWeight:800,fontSize:16,marginBottom:12,background:"#fff",padding:"10px",borderRadius:12}}>{st} Services</h3>

{st==="Emergency" &&!emgType? (
<div style={{display:"flex",flexDirection:"column",gap:12}}>
<div onClick={()=>setEmgType("Household")} style={{background:"#fff",borderRadius:16,border:"2px solid #16a34a",overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 15px rgba(0,0,0,0.15)"}}><div style={{height:120,backgroundImage:`url(${BG})`,backgroundSize:"cover"}}></div><div style={{padding:12,textAlign:"center",fontWeight:800}}>🏠 Household Emergency</div></div>
<div onClick={()=>setEmgType("Community")} style={{background:"#fff",borderRadius:16,border:"2px solid #3b82f6",overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 15px rgba(0,0,0,0.15)"}}><div style={{height:120,backgroundImage:`url(${BG3})`,backgroundSize:"cover"}}></div><div style={{padding:12,textAlign:"center",fontWeight:800}}>🏘️ Community Emergency</div></div>
</div>
):(
<div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:10}}>
{getList().map(s=>{
  const imgUrl = s.name==="Painting"? PAINTING_IMG : s.img
  return(
<div key={s.worker.id} onClick={()=>{setSel({...s,img:imgUrl});setPage("call");setCs("idle")}} style={{background:"#fff",borderRadius:16,overflow:"hidden",cursor:"pointer",boxShadow:"0 4px 15px rgba(0,0,0,0.15)"}}>
<img src={imgUrl} alt={s.name} style={{height:95,width:"100%",objectFit:"cover",display:"block"}} onError={(e)=>{e.target.src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600"}}/>
<div style={{padding:"8px 6px",textAlign:"center",fontWeight:700,fontSize:11,minHeight:38,display:"flex",justifyContent:"center",alignItems:"center"}}>{s.name}</div>
</div>
)})}
</div>
)}
</div></div></div>
)}

{page==="call" && (
<div style={{...pageBG,backgroundImage:`url(${BG3})`}}><div style={{...overlay,background:"rgba(255,255,255,0.88)"}}></div><div style={{...contentWrap,padding:10,display:"flex",justifyContent:"center"}}><div style={{width:390}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10,background:"#fff",padding:"8px 12px",borderRadius:20}}><button onClick={goBack} style={{padding:"8px 14px",borderRadius:20,border:"1px solid #e5e7eb",background:"#fff",fontSize:12}}>← Back</button><div style={{background:"#111",color:"#fff",padding:"6px 12px",borderRadius:20,fontSize:11,display:"flex",alignItems:"center",gap:6}}><div style={{width:22,height:22,background:"#16a34a",borderRadius:11,display:"flex",justifyContent:"center",alignItems:"center",fontSize:12,fontWeight:900}}>{initial(profile.name)}</div>{profile.name}</div></div>
<div style={{background:"#fff",borderRadius:20,padding:12,boxShadow:"0 4px 20px rgba(0,0,0,0.15)"}}>
{cs==="idle" && <div><img src={sel?.img} alt={sel?.name} style={{height:200,width:"100%",borderRadius:16,objectFit:"cover",display:"block"}}/><h3 style={{marginTop:12,textAlign:"center"}}>{sel?.name}</h3><p style={{fontSize:11,color:"#666",textAlign:"center"}}>SMART-ZIG Service</p><button onClick={()=>{setCs("ring");setTimeout(()=>setCs("talk"),1200);setTimeout(()=>setCs("script"),2800)}} style={{width:"100%",marginTop:14,padding:14,background:sel?.cat==="Emergency"?"#dc2626":"#16a34a",color:"#fff",border:"none",borderRadius:12,fontWeight:900}}>📞 CALL TO SMART-ZIG</button></div>}
{cs==="ring" && <div style={{padding:40,textAlign:"center"}}><div style={{fontSize:50}}>📞</div><h3>Ringing...</h3></div>}
{cs==="talk" && <div style={{padding:40,textAlign:"center"}}><div style={{fontSize:50}}>🎙️</div><h3>Connected</h3></div>}
{cs==="script" && <div style={{padding:10,textAlign:"center"}}><div style={{background:sel?.cat==="Emergency"?"#fef2f2":"#f0fdf4",padding:24,borderRadius:16}}><div style={{fontSize:40}}>🎙️</div><b>SMART-ZIG Voice</b><br/><button onClick={()=>{if(sel?.cat==="Emergency"){speak(`You have selected ${sel.name} under emergency service. This work takes ${sel.cost} rupees amount. You can feel this cost is higher because it is under premium. Our team members will reach you within ten minutes. Do you okay with this amount you can book now?`)}else{speak(`Hello, We are from SMART ZIG Service. You selected ${sel.name}. Our worker is available at this time. They will reach you in one hour. Its cost is ${sel.cost} rupees. Are you okay? You can book now.`)}}} style={{marginTop:12,padding:"12px 20px",borderRadius:10,border:"none",background:sel?.cat==="Emergency"?"#dc2626":"#16a34a",color:"#fff",fontWeight:900}}>🔊 Play Voice</button></div><div style={{display:"flex",gap:10,marginTop:14}}><button onClick={()=>{window.speechSynthesis.cancel();setCs("idle")}} style={{flex:1,padding:12,borderRadius:10,border:"1px solid #e5e7eb",background:"#fff"}}>Reject</button><button onClick={()=>{window.speechSynthesis.cancel();setCs("profile")}} style={{flex:1,padding:12,borderRadius:10,background:"#111",color:"#fff",border:"none",fontWeight:800}}>OK Book</button></div></div>}
{cs==="profile" && <div style={{padding:10,textAlign:"center"}}><div style={{width:70,height:70,borderRadius:35,background:"#16a34a",display:"flex",justifyContent:"center",alignItems:"center",margin:"0 auto",fontSize:28,color:"#fff"}}>👷</div><h3 style={{marginTop:10}}>SMART-ZIG Team</h3><p style={{fontSize:11,color:"#666"}}>Service Ready • Available Now</p><button onClick={()=>setCs("form")} style={{width:"100%",padding:12,background:"#16a34a",color:"#fff",border:"none",borderRadius:10,marginTop:10,fontWeight:800}}>Book Now</button></div>}
{cs==="form" && <div style={{padding:6}}>
<h3 style={{fontWeight:900,fontSize:18,textAlign:"center",marginBottom:14}}>📝 Registration</h3>
<input placeholder="Customer Name *" value={bookForm.cName} onChange={e=>setBookForm({...bookForm,cName:e.target.value})} style={{width:"100%",padding:14,borderRadius:12,border:"1.5px solid #e5e7eb",marginBottom:10,fontSize:14}}/>
<input placeholder="Phone No *" value={bookForm.cPhone} onChange={e=>setBookForm({...bookForm,cPhone:e.target.value})} style={{width:"100%",padding:14,borderRadius:12,border:"1.5px solid #e5e7eb",marginBottom:10,fontSize:14}}/>
<textarea placeholder="Address *" value={bookForm.cAddress} onChange={e=>setBookForm({...bookForm,cAddress:e.target.value})} style={{width:"100%",padding:14,borderRadius:12,border:"1.5px solid #e5e7eb",marginBottom:12,minHeight:90,fontSize:14}}/>
{err && <div style={{background:"#fee2e2",color:"#dc2626",padding:8,borderRadius:8,fontSize:11,textAlign:"center",marginBottom:10}}>{err}</div>}
<button onClick={()=>{
 if(!bookForm.cName||!bookForm.cPhone||!bookForm.cAddress){setErr("Customer Name, Phone No, Address podu da!");return}
 setErr("")
 const o=Math.floor(1000+Math.random()*9000)+""
 save({cName:bookForm.cName,cPhone:bookForm.cPhone,cAddress:bookForm.cAddress,ser:sel,worker:sel?.worker,otp:o,accepted:false,reach:false,done:false,payDone:false})
 setCs("registered")
}} style={{width:"100%",padding:14,background:"#15803d",color:"#fff",border:"none",borderRadius:12,fontWeight:900,fontSize:14}}>CONFIRM BOOK</button>
</div>}
{cs==="registered" && <div style={{padding:20,textAlign:"center"}}><div style={{fontSize:50}}>✅</div><h3>Registered for {sel?.name}!</h3><p style={{fontSize:12,color:"#666",marginTop:6}}>Customer: {bookForm.cName}</p><button onClick={()=>setPage("upro")} style={{width:"100%",padding:12,background:"#111",color:"#fff",border:"none",borderRadius:10,marginTop:10,fontWeight:800}}>Go to Bookings →</button></div>}
</div>
</div></div></div>
)}

{page==="upro" && (
<div style={{...pageBG,backgroundImage:`url(${BG2})`}}><div style={overlay}></div><div style={{...contentWrap,padding:12,display:"flex",justifyContent:"center"}}><div style={{width:390}}>
<div style={{display:"flex",justifyContent:"space-between",alignItems:"center",background:"#fff",padding:"10px 14px",borderRadius:14}}><b>{profile.name} - My Bookings</b><div style={{width:36,height:36,background:"#111",borderRadius:18,display:"flex",justifyContent:"center",alignItems:"center",color:"#fff",fontWeight:900}}>{initial(profile.name)}</div></div>
<div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,boxShadow:"0 4px 15px rgba(0,0,0,0.15)"}}>
{!b && <div style={{padding:20,textAlign:"center",color:"#888"}}>No bookings</div>}
{(b &&!b.accepted) && <div style={{background:"#fef3c7",padding:12,borderRadius:12,fontSize:12}}><b>⏳ Waiting for accept...</b><br/>Service: {b.ser.name}<br/>Customer: {b.cName}<br/>Phone: {b.cPhone}</div>}
{(b && b.accepted &&!b.reach) && <div><div style={{background:"#dcfce7",padding:10,borderRadius:10,textAlign:"center",fontSize:12}}><b>✅ Booking Accepted</b></div><div style={{marginTop:10,border:"2px dashed #f59e0b",padding:14,borderRadius:12,textAlign:"center"}}><div style={{fontSize:11}}>YOUR OTP</div><b style={{fontSize:32,letterSpacing:6}}>{b.otp}</b></div></div>}
{(b && b.reach &&!b.done) && <div style={{background:"#dcfce7",padding:12,borderRadius:10,textAlign:"center"}}><b>📍 Worker Reached!</b></div>}
{(b && b.done &&!b.payDone) && <div><div style={{background:"#dcfce7",padding:10,borderRadius:10,textAlign:"center"}}><b>✅ Work Completed!</b></div>
<div style={{marginTop:12,border:"2px solid #111",borderRadius:16,padding:14}}>
<div style={{fontWeight:900,textAlign:"center",marginBottom:10}}>💳 Make Payment - Auto QR</div>
<div style={{display:"flex",flexDirection:"column",gap:8}}>
{["gpay","phonepe","paytm","upi"].map(m=>(
<div key={m} onClick={()=>setPayMode(m)} style={{display:"flex",alignItems:"center",gap:10,padding:10,borderRadius:12,border:payMode===m?"2px solid #16a34a":"1px solid #e5e7eb",background:payMode===m?"#f0fdf4":"#fff",cursor:"pointer"}}>
<div style={{width:36,height:36,background:m==="gpay"?"#fff":m==="phonepe"?"#5f259f":m==="paytm"?"#00baf2":"#111",borderRadius:8,display:"flex",justifyContent:"center",alignItems:"center",color:"#fff",fontSize:12,fontWeight:900}}>{m==="gpay"?"📱":m==="phonepe"?"💜":m==="paytm"?"Paytm":"🏦"}</div><div style={{flex:1,fontWeight:700,fontSize:13,textTransform:"uppercase"}}>{m}</div>{payMode===m&&<div>✓</div>}
</div>
))}
</div>
{payMode && <div style={{marginTop:12,background:"#fff",padding:12,borderRadius:12,border:"2px dashed #111",textAlign:"center"}}>
<div style={{fontSize:12,fontWeight:800}}>📲 Scan - {payMode.toUpperCase()} Auto QR</div>
<img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=smartzig@okaxis%26pn=SMART-ZIG%26am=${b.ser.cost}%26cu=INR`} style={{width:190,height:190,marginTop:8,borderRadius:10}} alt="QR"/>
<div style={{fontSize:11,marginTop:8}}><b>UPI:</b> smartzig@okaxis<br/><b>Amount:</b> Rs.{b.ser.cost}</div>
<button onClick={()=>save({...b,payDone:true,payMode})} style={{width:"100%",padding:12,background:"#16a34a",color:"#fff",border:"none",borderRadius:10,marginTop:10,fontWeight:900}}>✅ I PAID via {payMode.toUpperCase()}</button>
</div>}
</div>
</div>}
{(b && b.payDone) && <div style={{background:"#dcfce7",padding:16,borderRadius:12,textAlign:"center"}}><div style={{fontSize:30}}>✅</div><b>Paid via {b.payMode?.toUpperCase()} - Success!</b></div>}
</div>
</div></div></div>
)}

{page==="wdash" && (
<div style={{...pageBG,backgroundImage:`url(${BG})`}}><div style={{...overlay,background:"rgba(255,255,255,0.88)"}}></div><div style={{...contentWrap,padding:12,display:"flex",justifyContent:"center"}}><div style={{width:390}}>
<div style={{background:"#111",color:"#fff",padding:10,borderRadius:10,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
<div><b>🛠️ {uf.n}</b><div style={{fontSize:10,color:"#a3e635"}}>ID: {uf.wId} | {uf.phone}</div></div>
<button onClick={()=>{localStorage.removeItem("SMART_ZIG_FINAL");setPage("login")}} style={{padding:"5px 8px",borderRadius:6,fontSize:11}}>Exit</button>
</div>
<div style={{background:"#fff",borderRadius:16,padding:12,marginTop:10,boxShadow:"0 4px 15px rgba(0,0,0,0.15)"}}>
{!b && <div style={{padding:20,textAlign:"center",color:"#888"}}>No requests</div>}
{(b &&!b.accepted) && <div style={{border:"2px solid #111",padding:12,borderRadius:12}}><div style={{background:"#fef3c7",padding:6,borderRadius:6,fontSize:11,fontWeight:800,textAlign:"center"}}>🔔 NEW BOOKING</div><div style={{fontSize:12,marginTop:8}}><b>Customer: {b.cName}</b><br/>Phone: {b.cPhone}<br/>Address: {b.cAddress}<br/>Service: {b.ser.name}</div><button onClick={()=>save({...b,accepted:true})} style={{width:"100%",padding:10,background:"#16a34a",color:"#fff",border:"none",borderRadius:8,marginTop:8,fontWeight:800}}>✅ ACCEPT & SEND OTP</button></div>}
{(b && b.accepted &&!b.reach) && <div><div style={{background:"#fef3c7",padding:8,borderRadius:8,textAlign:"center",fontSize:12}}><b>TEST OTP: {b.otp}</b></div><input placeholder="Enter OTP" value={otp} onChange={e=>setOtp(e.target.value)} style={{width:"100%",padding:10,borderRadius:10,border:"1px solid #e5e7eb",marginTop:6}}/><button onClick={()=>{if(otp===b.otp){save({...b,reach:true});setTimeout(()=>setWorkStatus("ask"),400)}else alert("Wrong OTP!")}} style={{width:"100%",padding:10,background:"#2563eb",color:"#fff",border:"none",borderRadius:8,marginTop:6,fontWeight:800}}>VERIFY OTP</button></div>}
{(b && b.reach && workStatus==="ask") && <div style={{border:"2px solid #111",padding:12,borderRadius:12}}><b>You reached correct destination!</b><div style={{display:"flex",gap:8,marginTop:8}}><button onClick={()=>{save({...b,done:true});setWorkStatus("done")}} style={{flex:1,padding:10,background:"#16a34a",color:"#fff",border:"none",borderRadius:8}}>✅ Completed</button><button onClick={()=>{save({...b,done:true});setWorkStatus("done")}} style={{flex:1,padding:10,background:"#dc2626",color:"#fff",border:"none",borderRadius:8}}>❌ Not</button></div></div>}
{(b && b.done) && <div style={{background:"#dcfce7",padding:12,borderRadius:12,textAlign:"center"}}><b>✅ Work completed</b></div>}
</div>
</div></div></div>
)}

</div>
)
}