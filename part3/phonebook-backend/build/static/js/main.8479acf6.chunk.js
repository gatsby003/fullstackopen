(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var c=n(14),r=n.n(c),o=n(3),u=n(2),a=n(4),i=n.n(a),s="api/persons",l={getAll:function(){return i.a.get(s).then((function(e){return e.data}))},create:function(e){return i.a.post(s,e).then((function(e){return e.data}))},update:function(e){return i.a.put("".concat(s,"/").concat(e.id),e).then((function(e){return e.data}))},deletePerson:function(e){return i.a.delete("".concat(s,"/").concat(e)).then((function(e){return console.log(e)}))}},j=n(0),d=function(){var e=Object(u.useState)([]),t=Object(o.a)(e,2),n=t[0],c=t[1],r=Object(u.useState)(""),a=Object(o.a)(r,2),i=a[0],s=a[1],d=Object(u.useState)(""),b=Object(o.a)(d,2),h=b[0],f=b[1],O=Object(u.useState)(""),v=Object(o.a)(O,2),p=v[0],x=v[1],m=Object(u.useState)([]),g=Object(o.a)(m,2),w=g[0],E=g[1],S=Object(u.useState)(""),k=Object(o.a)(S,2),y=k[0],C=k[1];Object(u.useEffect)((function(){l.getAll().then((function(e){c(e)}))}),[]);var A=function(e){window.confirm("you wanna delete this contact?")&&(l.deletePerson(e).then(console.log("yo")),l.getAll().then((function(e){c(e),C("Deleted Successfully")})))},D=function(e){e.deletePerson;var t=[];return n.forEach((function(e){return t.push(Object(j.jsx)("div",{children:Object(j.jsxs)("ul",{children:[Object(j.jsxs)("li",{children:[e.name," : ",e.number]}),Object(j.jsx)("button",{onClick:function(){return A(e.id)},children:"delete"})]})},e.name))})),t},P=function(){if(w===[])return Object(j.jsx)(j.Fragment,{});var e=[];return w.forEach((function(t){return e.push(Object(j.jsxs)("h4",{children:[t.name," : ",t.number]},t.name+1))})),e},N=function(e){var t=e.service;return 0===w.length?Object(j.jsx)(D,{handleDelete:t}):Object(j.jsx)(P,{})},J=function(e){var t=e.newError,n=e.setNewError;return setTimeout((function(){n("")}),5e3),Object(j.jsx)("div",{style:{color:"green",fontStyle:"italic",fontSize:16,border:5},children:Object(j.jsx)("h1",{children:t})})};return Object(j.jsxs)("div",{children:[Object(j.jsx)("h2",{children:"Phonebook"}),"filter shown with : ",Object(j.jsx)("input",{onChange:function(e){e.preventDefault();var t=e.target.value;x(e.target.value),E([]);var c=[];n.forEach((function(e){e.name.toLocaleLowerCase().includes(t)&&c.push(e)})),console.log(c),E(c)},value:p}),Object(j.jsx)(J,{newError:y,setNewError:C}),Object(j.jsxs)("form",{onSubmit:function(e){e.preventDefault();var t={name:i,number:h};if(function(e){var t=[];return n.forEach((function(e){return t.push(e.name)})),t.includes(e.name)}(t)){var r=n.find((function(e){return e.name===i}));console.log(r.id),t.id=r.id;var o=n.filter((function(e){return e.name!==i}));o.push(t),console.log(o),l.update(t).then((function(e){c(o),s(""),f(""),C("".concat(i," updated to phonebook."))}))}else l.create(t).then((function(e){c(n.concat(e)),s(""),f(""),C("".concat(i," added to phonebook."))}))},children:[Object(j.jsx)("h1",{children:"Add a new"}),Object(j.jsxs)("div",{children:["name: ",Object(j.jsx)("input",{onChange:function(e){s(e.target.value)},value:i})]}),Object(j.jsxs)("div",{children:["number: ",Object(j.jsx)("input",{onChange:function(e){f(e.target.value)},value:h})]}),Object(j.jsx)("div",{children:Object(j.jsx)("button",{type:"submit",children:"add"})})]}),Object(j.jsx)("h2",{children:"Numbers"}),Object(j.jsx)("div",{children:Object(j.jsx)(N,{service:A})})]})};n(38);r.a.render(Object(j.jsx)(d,{}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.8479acf6.chunk.js.map