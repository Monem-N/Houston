import{i as d,j as e,u as c,C as g,G as s,B as t,T as m,R as n}from"./main-CW6jg1-I.js";import{C as l}from"./Card-B9dzKWag.js";import{S as p}from"./Section-DM8JsinB.js";import{P as u}from"./PageHeader-CDJBbqio.js";import{C as y}from"./Chip-K_1rFzPt.js";import{R as x}from"./Rating-BJoMeRkk.js";import{C as f}from"./LocalCafe-Be_wN_6w.js";import"./CardMedia-BmCS4s0U.js";const h=d(e.jsx("path",{d:"M21 5V3H3v2l8 9v5H6v2h12v-2h-5v-5zM7.43 7 5.66 5h12.69l-1.78 2z"}),"LocalBar"),B=()=>{const{t:a}=c(),r=[{id:1,name:"Houston Restaurant 1",type:"American",rating:4.5,image:"/assets/images/dining/restaurant1.jpg",description:"A popular American restaurant with a variety of dishes.",category:"restaurant"},{id:2,name:"Houston Cafe 1",type:"Cafe",rating:4.2,image:"/assets/images/dining/cafe1.jpg",description:"A cozy cafe with great coffee and pastries.",category:"cafe"},{id:3,name:"Houston Bar 1",type:"Bar & Grill",rating:4,image:"/assets/images/dining/bar1.jpg",description:"A lively bar with good food and drinks.",category:"bar"},{id:4,name:"Houston Restaurant 2",type:"Mexican",rating:4.7,image:"/assets/images/dining/restaurant2.jpg",description:"Authentic Mexican cuisine in a vibrant atmosphere.",category:"restaurant"},{id:5,name:"Houston Cafe 2",type:"Bakery",rating:4.3,image:"/assets/images/dining/cafe2.jpg",description:"Fresh baked goods and specialty coffees.",category:"cafe"},{id:6,name:"Houston Restaurant 3",type:"Italian",rating:4.6,image:"/assets/images/dining/restaurant3.jpg",description:"Traditional Italian dishes in a family-friendly setting.",category:"restaurant"}],o=i=>{switch(i){case"restaurant":return e.jsx(n,{});case"cafe":return e.jsx(f,{});case"bar":return e.jsx(h,{});default:return e.jsx(n,{})}};return e.jsxs(g,{maxWidth:"lg",children:[e.jsx(u,{title:a("dining.title","Dining"),subtitle:a("dining.subtitle","Explore the best dining options in Houston near the FIRST Championship venues."),"data-testid":"page-title",breadcrumbs:[{label:a("navigation.home","Home"),path:"/"},{label:a("navigation.dining","Dining")}]}),e.jsx(p,{title:a("dining.featuredRestaurants","Featured Restaurants"),titleIcon:e.jsx(n,{color:"primary"}),divider:!0,children:e.jsx(s,{container:!0,spacing:3,children:r.map(i=>e.jsx(s,{item:!0,xs:12,sm:6,md:4,children:e.jsx(l,{title:a(`dining.restaurants.${i.id}.name`,i.name),description:a(`dining.restaurants.${i.id}.description`,i.description),image:i.image,imageAlt:i.name,imageHeight:160,children:e.jsx(t,{sx:{mb:2},children:e.jsxs(t,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",mb:2},children:[e.jsx(y,{icon:o(i.category),label:a(`dining.restaurants.${i.id}.type`,i.type),size:"small",color:i.category==="restaurant"?"primary":i.category==="cafe"?"secondary":"default"}),e.jsxs(t,{sx:{display:"flex",alignItems:"center"},children:[e.jsx(x,{value:i.rating,precision:.5,readOnly:!0,size:"small"}),e.jsx(m,{variant:"body2",color:"text.secondary",sx:{ml:1},children:i.rating})]})]})})})},i.id))})})]})};export{B as default};
//# sourceMappingURL=DiningPage-B90D7HcX.js.map
