import{r as p,b as U,g as E,c as z,_ as W,a5 as ye,d as h,aa as ge,ab as fe,j as e,s as v,e as k,f as F,P as K,h as be,T as i,i as m,C as ve,B as n,ac as I,Z as R,G as V,ad as je,a as O,L as Q,H as Ce,ae as we,m as ee,n as j,o as C,p as w,W as se,af as oe}from"./main-B8WG6TEV.js";import{S as P}from"./Section-BtqGn3A7.js";import{P as Se}from"./PageHeader-BwE9L6F5.js";import{T as Te,a as L}from"./Tabs-BjohbEe-.js";import{P as N}from"./Phone-Baw0S0ru.js";import{C as S}from"./DirectionsCar-ChBldFo1.js";import{T as re}from"./AttachMoney-B1Km0ogL.js";const ae=p.createContext({});function ke(o){return E("MuiAccordion",o)}const D=U("MuiAccordion",["root","rounded","expanded","disabled","gutters","region"]),Ie=["children","className","defaultExpanded","disabled","disableGutters","expanded","onChange","square","slots","slotProps","TransitionComponent","TransitionProps"],He=o=>{const{classes:t,square:a,expanded:s,disabled:r,disableGutters:l}=o;return F({root:["root",!a&&"rounded",s&&"expanded",r&&"disabled",!l&&"gutters"],region:["region"]},ke,t)},Ae=v(K,{name:"MuiAccordion",slot:"Root",overridesResolver:(o,t)=>{const{ownerState:a}=o;return[{[`& .${D.region}`]:t.region},t.root,!a.square&&t.rounded,!a.disableGutters&&t.gutters]}})(({theme:o})=>{const t={duration:o.transitions.duration.shortest};return{position:"relative",transition:o.transitions.create(["margin"],t),overflowAnchor:"none","&::before":{position:"absolute",left:0,top:-1,right:0,height:1,content:'""',opacity:1,backgroundColor:(o.vars||o).palette.divider,transition:o.transitions.create(["opacity","background-color"],t)},"&:first-of-type":{"&::before":{display:"none"}},[`&.${D.expanded}`]:{"&::before":{opacity:0},"&:first-of-type":{marginTop:0},"&:last-of-type":{marginBottom:0},"& + &":{"&::before":{display:"none"}}},[`&.${D.disabled}`]:{backgroundColor:(o.vars||o).palette.action.disabledBackground}}},({theme:o})=>({variants:[{props:t=>!t.square,style:{borderRadius:0,"&:first-of-type":{borderTopLeftRadius:(o.vars||o).shape.borderRadius,borderTopRightRadius:(o.vars||o).shape.borderRadius},"&:last-of-type":{borderBottomLeftRadius:(o.vars||o).shape.borderRadius,borderBottomRightRadius:(o.vars||o).shape.borderRadius,"@supports (-ms-ime-align: auto)":{borderBottomLeftRadius:0,borderBottomRightRadius:0}}}},{props:t=>!t.disableGutters,style:{[`&.${D.expanded}`]:{margin:"16px 0"}}}]})),Me=p.forwardRef(function(t,a){const s=z({props:t,name:"MuiAccordion"}),{children:r,className:l,defaultExpanded:c=!1,disabled:u=!1,disableGutters:x=!1,expanded:G,onChange:y,square:H=!1,slots:A={},slotProps:M={},TransitionComponent:$,TransitionProps:g}=s,f=W(s,Ie),[d,Y]=ye({controlled:G,default:c,name:"Accordion",state:"expanded"}),Z=p.useCallback(xe=>{Y(!d),y&&y(xe,!d)},[d,y,Y]),[_,...le]=p.Children.toArray(r),de=p.useMemo(()=>({expanded:d,disabled:u,disableGutters:x,toggle:Z}),[d,u,x,Z]),q=h({},s,{square:H,disabled:u,disableGutters:x,expanded:d}),J=He(q),pe=h({transition:$},A),ue=h({transition:g},M),[he,me]=ge("transition",{elementType:fe,externalForwardedProps:{slots:pe,slotProps:ue},ownerState:q});return e.jsxs(Ae,h({className:k(J.root,l),ref:a,ownerState:q,square:H},f,{children:[e.jsx(ae.Provider,{value:de,children:_}),e.jsx(he,h({in:d,timeout:"auto"},me,{children:e.jsx("div",{"aria-labelledby":_.props.id,id:_.props["aria-controls"],role:"region",className:J.region,children:le})}))]}))});function Re(o){return E("MuiAccordionDetails",o)}U("MuiAccordionDetails",["root"]);const Ve=["className"],Pe=o=>{const{classes:t}=o;return F({root:["root"]},Re,t)},Le=v("div",{name:"MuiAccordionDetails",slot:"Root",overridesResolver:(o,t)=>t.root})(({theme:o})=>({padding:o.spacing(1,2,2)})),De=p.forwardRef(function(t,a){const s=z({props:t,name:"MuiAccordionDetails"}),{className:r}=s,l=W(s,Ve),c=s,u=Pe(c);return e.jsx(Le,h({className:k(u.root,r),ref:a,ownerState:c},l))});function Be(o){return E("MuiAccordionSummary",o)}const b=U("MuiAccordionSummary",["root","expanded","focusVisible","disabled","gutters","contentGutters","content","expandIconWrapper"]),Ne=["children","className","expandIcon","focusVisibleClassName","onClick"],Ue=o=>{const{classes:t,expanded:a,disabled:s,disableGutters:r}=o;return F({root:["root",a&&"expanded",s&&"disabled",!r&&"gutters"],focusVisible:["focusVisible"],content:["content",a&&"expanded",!r&&"contentGutters"],expandIconWrapper:["expandIconWrapper",a&&"expanded"]},Be,t)},Ee=v(be,{name:"MuiAccordionSummary",slot:"Root",overridesResolver:(o,t)=>t.root})(({theme:o})=>{const t={duration:o.transitions.duration.shortest};return{display:"flex",minHeight:48,padding:o.spacing(0,2),transition:o.transitions.create(["min-height","background-color"],t),[`&.${b.focusVisible}`]:{backgroundColor:(o.vars||o).palette.action.focus},[`&.${b.disabled}`]:{opacity:(o.vars||o).palette.action.disabledOpacity},[`&:hover:not(.${b.disabled})`]:{cursor:"pointer"},variants:[{props:a=>!a.disableGutters,style:{[`&.${b.expanded}`]:{minHeight:64}}}]}}),ze=v("div",{name:"MuiAccordionSummary",slot:"Content",overridesResolver:(o,t)=>t.content})(({theme:o})=>({display:"flex",flexGrow:1,margin:"12px 0",variants:[{props:t=>!t.disableGutters,style:{transition:o.transitions.create(["margin"],{duration:o.transitions.duration.shortest}),[`&.${b.expanded}`]:{margin:"20px 0"}}}]})),We=v("div",{name:"MuiAccordionSummary",slot:"ExpandIconWrapper",overridesResolver:(o,t)=>t.expandIconWrapper})(({theme:o})=>({display:"flex",color:(o.vars||o).palette.action.active,transform:"rotate(0deg)",transition:o.transitions.create("transform",{duration:o.transitions.duration.shortest}),[`&.${b.expanded}`]:{transform:"rotate(180deg)"}})),Fe=p.forwardRef(function(t,a){const s=z({props:t,name:"MuiAccordionSummary"}),{children:r,className:l,expandIcon:c,focusVisibleClassName:u,onClick:x}=s,G=W(s,Ne),{disabled:y=!1,disableGutters:H,expanded:A,toggle:M}=p.useContext(ae),$=d=>{M&&M(d),x&&x(d)},g=h({},s,{expanded:A,disabled:y,disableGutters:H}),f=Ue(g);return e.jsxs(Ee,h({focusRipple:!1,disableRipple:!0,disabled:y,component:"div","aria-expanded":A,className:k(f.root,l),focusVisibleClassName:k(f.focusVisible,u),onClick:$,ref:a,ownerState:g},G,{children:[e.jsx(ze,{className:f.content,ownerState:g,children:r}),c&&e.jsx(We,{className:f.expandIconWrapper,ownerState:g,children:c})]}))});function Ge(o){return E("MuiAlertTitle",o)}U("MuiAlertTitle",["root"]);const $e=["className"],_e=o=>{const{classes:t}=o;return F({root:["root"]},Ge,t)},qe=v(i,{name:"MuiAlertTitle",slot:"Root",overridesResolver:(o,t)=>t.root})(({theme:o})=>({fontWeight:o.typography.fontWeightMedium,marginTop:-2})),B=p.forwardRef(function(t,a){const s=z({props:t,name:"MuiAlertTitle"}),{className:r}=s,l=W(s,$e),c=s,u=_e(c);return e.jsx(qe,h({gutterBottom:!0,component:"div",ownerState:c,ref:a,className:k(u.root,r)},l))}),T=m(e.jsx("path",{d:"M22 7h-9v2h9zm0 8h-9v2h9zM5.54 11 2 7.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41zm0 8L2 15.46l1.41-1.41 2.12 2.12 4.24-4.24 1.41 1.41z"}),"Checklist"),Oe=m(e.jsx("path",{d:"M14.69 2.21 4.33 11.49c-.64.58-.28 1.65.58 1.73L13 14l-4.85 6.76c-.22.31-.19.74.08 1.01.3.3.77.31 1.08.02l10.36-9.28c.64-.58.28-1.65-.58-1.73L11 10l4.85-6.76c.22-.31.19-.74-.08-1.01-.3-.3-.77-.31-1.08-.02"}),"ElectricBolt"),ne=m(e.jsx("path",{d:"M10.5 13H8v-3h2.5V7.5h3V10H16v3h-2.5v2.5h-3zM12 2 4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5z"}),"HealthAndSafety"),te=m(e.jsx("path",{d:"M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5zm2.5 11.59.9 3.88-3.4-2.05-3.4 2.05.9-3.87-3-2.59 3.96-.34L12 6.02l1.54 3.64 3.96.34z"}),"LocalPolice"),X=m(e.jsx("path",{d:"M17 6h-2V3c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v3H7c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2 0 .55.45 1 1 1s1-.45 1-1h6c0 .55.45 1 1 1s1-.45 1-1c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2M9.5 18H8V9h1.5zm3.25 0h-1.5V9h1.5zm.75-12h-3V3.5h3zM16 18h-1.5V9H16z"}),"Luggage"),ie=m(e.jsx("path",{d:"m12.87 15.07-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2zm-2.62 7 1.62-4.33L19.12 17z"}),"Translate"),Ke=m(e.jsx("path",{d:"M11 5.5H8V4h.5c.55 0 1-.45 1-1s-.45-1-1-1h-3c-.55 0-1 .45-1 1s.45 1 1 1H6v1.5H3c-.55 0-1 .45-1 1s.45 1 1 1V15c0 1.1.9 2 2 2h1v4l2 1.5V17h1c1.1 0 2-.9 2-2V7.5c.55 0 1-.45 1-1s-.45-1-1-1M9 9H7.25c-.41 0-.75.34-.75.75s.34.75.75.75H9V12H7.25c-.41 0-.75.34-.75.75s.34.75.75.75H9V15H5V7.5h4zm10.5 1.5V10c.55 0 1-.45 1-1s-.45-1-1-1h-5c-.55 0-1 .45-1 1s.45 1 1 1v.5c0 .5-1.5 1.16-1.5 3V20c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-6.5c0-1.84-1.5-2.5-1.5-3m-3 0V10h1v.5c0 1.6 1.5 2 1.5 3v.5h-4v-.5c0-1 1.5-1.4 1.5-3M15 20v-1.5h4V20z"}),"Vaccines"),ce=m(e.jsx("path",{d:"M23 19v-1c0-1.1-.9-2-2-2s-2 .9-2 2v1c-.55 0-1 .45-1 1v3c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-3c0-.55-.45-1-1-1m-1 0h-2v-1c0-.55.45-1 1-1s1 .45 1 1zm2-10.02-2.12 2.13C19.35 8.57 15.85 7 12 7s-7.35 1.57-9.88 4.11L0 8.98C3.07 5.9 7.31 4 12 4s8.93 1.9 12 4.98M12 10c3.03 0 5.78 1.23 7.76 3.22l-2.12 2.12C16.2 13.9 14.2 13 12 13c-2.2 0-4.2.9-5.64 2.35l-2.12-2.12C6.22 11.23 8.97 10 12 10m3.53 7.46L12 21l-3.53-3.54c.9-.9 2.15-1.46 3.53-1.46s2.63.56 3.53 1.46"}),"WifiPassword"),Xe=[{name:"Emergency Services",phone:"911",description:"For life-threatening emergencies, fire, or crime in progress",icon:e.jsx(te,{color:"error"})},{name:"Houston Police (Non-Emergency)",phone:"(713) 884-3131",address:"1200 Travis St, Houston, TX 77002",description:"For non-emergency police assistance",icon:e.jsx(te,{color:"primary"})},{name:"Houston Fire Department (Non-Emergency)",phone:"(713) 247-8574",description:"For non-emergency fire department inquiries",icon:e.jsx(oe,{color:"error"})},{name:"Houston Methodist Hospital",phone:"(713) 790-3311",address:"6565 Fannin St, Houston, TX 77030",description:"Major hospital near the convention center",icon:e.jsx(oe,{color:"primary"})},{name:"FIRST Championship Security Office",phone:"(713) 853-8000",address:"George R. Brown Convention Center",description:"On-site security for the FIRST Championship event",icon:e.jsx(I,{color:"primary"})},{name:"U.S. Consulate General (for foreign visitors)",phone:"(713) 520-5570",address:"1330 Post Oak Blvd, Houston, TX 77056",description:"For foreign visitors requiring consular assistance",icon:e.jsx(ie,{color:"primary"})}],Ye=[{title:"Stay in groups",description:"Always travel in groups, especially at night. Avoid walking alone in unfamiliar areas.",icon:e.jsx(se,{}),severity:"warning"},{title:"Keep valuables secure",description:"Keep wallets, phones, and other valuables secure and out of sight. Consider using a money belt or hidden pouch.",icon:e.jsx(re,{}),severity:"warning"},{title:"Be aware of your surroundings",description:"Stay alert and be aware of your surroundings at all times. Avoid distractions like looking at your phone while walking.",icon:e.jsx(I,{}),severity:"warning"},{title:"Use official transportation",description:"Use official taxis, ride-sharing services, or public transportation. Avoid unmarked vehicles.",icon:e.jsx(S,{}),severity:"info"},{title:"Keep emergency contacts handy",description:"Save emergency contact numbers in your phone and keep a printed copy with you.",icon:e.jsx(N,{}),severity:"info"},{title:"Stay hydrated",description:"Houston can be hot and humid. Drink plenty of water, especially if you're outside.",icon:e.jsx(ne,{}),severity:"info"},{title:"COVID-19 precautions",description:"Follow current COVID-19 guidelines. Consider wearing masks in crowded indoor spaces.",icon:e.jsx(Ke,{}),severity:"info"}],Ze=[{title:"Before Departure",icon:e.jsx(T,{}),items:["Check passport/ID validity (ensure it's valid for at least 6 months beyond your stay)","Make copies of important documents (passport, ID, insurance)","Arrange travel insurance","Check weather forecast for Houston","Notify your bank of travel plans to avoid card blocks","Download offline maps of Houston","Pack appropriate clothing for Houston weather","Prepare any required medications with prescriptions"]},{title:"Packing Essentials",icon:e.jsx(X,{}),items:["Travel documents (passport, ID, tickets, hotel reservations)","Medications and prescriptions","Power adapters (US uses 110V with Type A/B plugs)","Phone and charger","Comfortable walking shoes","Light jacket (convention centers can be cold)","Reusable water bottle","Hand sanitizer and masks","Small backpack for daily use"]},{title:"Technology Preparation",icon:e.jsx(ce,{}),items:["Check your mobile plan for US coverage or get a local SIM card","Download useful apps (maps, translation, ride-sharing, event app)","Backup your devices before traveling","Set up a VPN if needed for secure connections","Download entertainment for the flight","Ensure you have cloud backup enabled for photos","Bring portable charger/power bank"]},{title:"Upon Arrival",icon:e.jsx(I,{}),items:["Get local currency (USD) or confirm your cards work","Purchase a local SIM card if needed","Locate the nearest pharmacy and grocery store to your accommodation","Familiarize yourself with public transportation options","Locate the nearest hospital or medical facility","Register your stay with your country's embassy if applicable","Confirm FIRST Championship registration details"]}],Je=[{title:"Electricity",icon:e.jsx(Oe,{}),content:"The United States uses 120V, 60Hz electricity with Type A (two flat parallel pins) and Type B (two flat parallel pins and a grounding pin) outlets. Visitors from countries with different standards will need adapters and possibly voltage converters."},{title:"Internet & Connectivity",icon:e.jsx(ce,{}),content:"Free Wi-Fi is available at most hotels, restaurants, and the convention center. Major cellular providers in the US include AT&T, Verizon, and T-Mobile. International visitors should check with their providers about roaming charges or consider purchasing a local SIM card upon arrival."},{title:"Currency & Payments",icon:e.jsx(re,{}),content:"The US dollar (USD) is the local currency. Credit cards are widely accepted, with Visa and Mastercard having the highest acceptance rate. ATMs are readily available throughout Houston. Notify your bank of your travel plans to avoid card blocks. Tipping is customary in the US (15-20% at restaurants)."},{title:"Language",icon:e.jsx(ie,{}),content:"English is the primary language spoken in Houston. Spanish is also widely spoken. Major tourist areas and the convention center will have staff who can assist international visitors. Consider downloading a translation app if English is not your first language."},{title:"Health & Medical",icon:e.jsx(ne,{}),content:"Healthcare in the US can be expensive. Ensure you have adequate travel insurance that covers medical expenses. Pharmacies like CVS and Walgreens are widely available for over-the-counter medications. For emergencies, dial 911. The nearest major hospital to the convention center is Houston Methodist Hospital."}],no=()=>{const[o,t]=p.useState(0),a=(s,r)=>{t(r)};return e.jsxs(ve,{maxWidth:"lg",children:[e.jsx(Se,{title:"Safety & Logistics",subtitle:"Important information to ensure a safe and smooth experience during your visit to Houston.","data-testid":"page-title",breadcrumbs:[{label:"Home",path:"/"},{label:"Safety & Logistics"}]}),e.jsx(n,{sx:{borderBottom:1,borderColor:"divider",mb:3},children:e.jsxs(Te,{value:o,onChange:a,"aria-label":"safety and logistics tabs",variant:"scrollable",scrollButtons:"auto",children:[e.jsx(L,{icon:e.jsx(I,{}),label:"Safety Tips",id:"tab-0","aria-controls":"tabpanel-0"}),e.jsx(L,{icon:e.jsx(N,{}),label:"Emergency Contacts",id:"tab-1","aria-controls":"tabpanel-1"}),e.jsx(L,{icon:e.jsx(T,{}),label:"Travel Checklists",id:"tab-2","aria-controls":"tabpanel-2"}),e.jsx(L,{icon:e.jsx(X,{}),label:"Logistics Info",id:"tab-3","aria-controls":"tabpanel-3"})]})}),e.jsx(n,{role:"tabpanel",hidden:o!==0,id:"tabpanel-0","aria-labelledby":"tab-0",children:o===0&&e.jsxs(P,{title:"Safety Tips for Houston",titleIcon:e.jsx(I,{color:"primary"}),divider:!0,children:[e.jsx(i,{variant:"body1",paragraph:!0,children:"Houston is generally a safe city for visitors, but like any major urban area, it's important to take precautions. Here are some safety tips to help ensure a safe and enjoyable visit."}),e.jsxs(R,{severity:"warning",sx:{mb:3},children:[e.jsx(B,{children:"Important Safety Notice"}),"In case of emergency, dial ",e.jsx("strong",{children:"911"})," for police, fire, or medical emergencies. Save the FIRST Championship security number in your phone:"," ",e.jsx("strong",{children:"(713) 853-8000"}),"."]}),e.jsx(V,{container:!0,spacing:3,children:Ye.map((s,r)=>e.jsx(V,{item:!0,xs:12,md:6,children:e.jsxs(R,{severity:s.severity,icon:s.icon,sx:{height:"100%"},children:[e.jsx(B,{children:s.title}),s.description]})},r))}),e.jsxs(n,{sx:{mt:4},children:[e.jsx(i,{variant:"h6",gutterBottom:!0,children:"Area Safety Information"}),e.jsx(i,{variant:"body1",paragraph:!0,children:"The George R. Brown Convention Center and surrounding areas are generally safe and well-patrolled. However, as with any urban area, be cautious when walking at night and stay in well-lit, populated areas."}),e.jsxs(i,{variant:"body1",children:["For more detailed safety information, visit the"," ",e.jsx(je,{href:"https://www.houstontx.gov/police/pdfs/brochures/english/Tourist_Safety_brochure.pdf",target:"_blank",rel:"noopener noreferrer",children:"Houston Police Department's Tourist Safety Guide"}),"."]})]}),e.jsx(n,{sx:{mt:3},children:e.jsx(O,{variant:"contained",color:"primary",component:Q,to:"/annexes/emergency-contacts",startIcon:e.jsx(N,{}),children:"View Detailed Emergency Contacts"})})]})}),e.jsx(n,{role:"tabpanel",hidden:o!==1,id:"tabpanel-1","aria-labelledby":"tab-1",children:o===1&&e.jsxs(P,{title:"Emergency Contacts",titleIcon:e.jsx(N,{color:"primary"}),divider:!0,children:[e.jsx(i,{variant:"body1",paragraph:!0,children:"Keep these important emergency contacts handy during your stay in Houston. We recommend saving these numbers in your phone and keeping a printed copy with you."}),e.jsxs(R,{severity:"error",sx:{mb:3},children:[e.jsx(B,{children:"Emergency Number"}),"For all emergencies (police, fire, medical), dial ",e.jsx("strong",{children:"911"}),"."]}),e.jsx(V,{container:!0,spacing:3,children:Xe.map((s,r)=>e.jsx(V,{item:!0,xs:12,md:6,children:e.jsxs(K,{sx:{p:2,height:"100%"},children:[e.jsxs(n,{sx:{display:"flex",alignItems:"center",mb:1},children:[e.jsx(n,{sx:{mr:2},children:s.icon}),e.jsx(i,{variant:"h6",children:s.name})]}),e.jsx(Ce,{sx:{my:1}}),e.jsx(i,{variant:"body1",sx:{fontWeight:"bold",mb:1},children:s.phone}),s.address&&e.jsx(i,{variant:"body2",color:"text.secondary",paragraph:!0,children:s.address}),s.description&&e.jsx(i,{variant:"body2",children:s.description})]})},r))})]})}),e.jsx(n,{role:"tabpanel",hidden:o!==2,id:"tabpanel-2","aria-labelledby":"tab-2",children:o===2&&e.jsxs(P,{title:"Travel Checklists",titleIcon:e.jsx(T,{color:"primary"}),divider:!0,children:[e.jsx(i,{variant:"body1",paragraph:!0,children:"Use these checklists to prepare for your trip to Houston and the FIRST Championship. Being well-prepared will help ensure a smooth and enjoyable experience."}),Ze.map((s,r)=>e.jsxs(Me,{defaultExpanded:r===0,sx:{mb:2},children:[e.jsx(Fe,{expandIcon:e.jsx(we,{}),"aria-controls":`checklist-${r}-content`,id:`checklist-${r}-header`,children:e.jsxs(n,{sx:{display:"flex",alignItems:"center"},children:[e.jsx(n,{sx:{mr:2},children:s.icon}),e.jsx(i,{variant:"h6",children:s.title})]})}),e.jsx(De,{children:e.jsx(ee,{children:s.items.map((l,c)=>e.jsxs(j,{children:[e.jsx(C,{children:e.jsx(T,{color:"primary",fontSize:"small"})}),e.jsx(w,{primary:l})]},c))})})]},r)),e.jsx(n,{sx:{mt:3},children:e.jsxs(R,{severity:"info",children:[e.jsx(B,{children:"Printable Checklist"}),"You can download a printable version of these checklists to help with your trip planning.",e.jsx(n,{sx:{mt:2},children:e.jsx(O,{variant:"outlined",color:"primary",startIcon:e.jsx(T,{}),href:"/assets/documents/houston-travel-checklist.pdf",target:"_blank",children:"Download Printable Checklist"})})]})})]})}),e.jsx(n,{role:"tabpanel",hidden:o!==3,id:"tabpanel-3","aria-labelledby":"tab-3",children:o===3&&e.jsxs(P,{title:"Logistics Information",titleIcon:e.jsx(X,{color:"primary"}),divider:!0,children:[e.jsx(i,{variant:"body1",paragraph:!0,children:"Important logistical information to help you navigate your stay in Houston. This information is particularly useful for international visitors."}),Je.map((s,r)=>e.jsxs(K,{sx:{p:3,mb:3},children:[e.jsxs(n,{sx:{display:"flex",alignItems:"center",mb:2},children:[e.jsx(n,{sx:{mr:2},children:s.icon}),e.jsx(i,{variant:"h6",children:s.title})]}),e.jsx(i,{variant:"body1",children:s.content})]},r)),e.jsxs(n,{sx:{mt:4},children:[e.jsx(i,{variant:"h6",gutterBottom:!0,children:"Transportation Information"}),e.jsx(i,{variant:"body1",paragraph:!0,children:"Houston has several transportation options, including:"}),e.jsxs(ee,{children:[e.jsxs(j,{children:[e.jsx(C,{children:e.jsx(S,{})}),e.jsx(w,{primary:"Ride-sharing services (Uber, Lyft)",secondary:"Widely available throughout Houston"})]}),e.jsxs(j,{children:[e.jsx(C,{children:e.jsx(S,{})}),e.jsx(w,{primary:"Taxis",secondary:"Available at designated taxi stands at airports, hotels, and the convention center"})]}),e.jsxs(j,{children:[e.jsx(C,{children:e.jsx(S,{})}),e.jsx(w,{primary:"Public Transportation",secondary:"Houston's METRORail and bus system connect major areas of the city"})]}),e.jsxs(j,{children:[e.jsx(C,{children:e.jsx(se,{})}),e.jsx(w,{primary:"Walking",secondary:"Downtown Houston is relatively walkable, with many attractions within walking distance of the convention center"})]})]}),e.jsx(n,{sx:{mt:3},children:e.jsx(O,{variant:"contained",color:"primary",component:Q,to:"/annexes/transport-maps",startIcon:e.jsx(S,{}),children:"View Detailed Transportation Information"})})]})]})})]})};export{no as default};
//# sourceMappingURL=SafetyLogisticsPage-CYDNkm50.js.map
