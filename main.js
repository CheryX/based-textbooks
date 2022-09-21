//CHERRYBOX
function getTotalWidth(t,e,o,a){void 0===a&&(a=0);for(var r=0,i=0;i<e.length;i++)null==e[i].modifier&&(e[i].modifier=""),t.font="".concat(e[i].modifier," ").concat(o,"px ").concat(e[i].font),r+=t.measureText(e[i].text).width+a;return r-a}function paintText(t,e,o,a,r,i){void 0===i&&(i=0),t.save();for(var s=0;s<e.length;s++){var n=e[s];n.modifier=n.modifier,t.fillStyle=n.color,t.font="".concat(n.modifier," ").concat(r,"px ").concat(n.font),void 0!==n.shadow?(t.shadowColor=n.shadow.color,t.shadowOffsetX=n.shadow.offset[0]*r/100,t.shadowOffsetY=n.shadow.offset[1]*r/100,t.shadowBlur=n.shadow.blur):t.shadowColor="transparent",t.fillText(n.text,o,a),o+=t.measureText(n.text).width+i}t.restore()}function getLines(t,e,o,a){for(var r=a/4,i=[],s=[],n=0;n<e.length;n++)for(var h=e[n].text.split(" "),d=0;d<h.length;d++){var f=e[n];f.text=h[d],f=JSON.parse(JSON.stringify(f));var c=getTotalWidth(t,s,a,r),l=getTotalWidth(t,[f],a,r);c+l+r>o&&(i.push(s),s=[]),s.push(f)}return i.push(s),i}function textBox(t,e,o,a,r,i,s,n){void 0===n&&(n=[1,1]),t.save();var h=getTotalWidth(t,i,s);switch(h>a&&(s*=a/h),h=getTotalWidth(t,i,s),n[0]){case 0:o+=s;break;case 1:o+=(s+r)/2;break;case 2:o+=r}switch(n[1]){case 1:e+=(a-h)/2;break;case 2:e+=a-h}return paintText(t,i,e,o,s),t.restore(),{x:e,y:o,width:h,height:s}}function wrapText(t,e,o,a,r,i,s){void 0===s&&(s=1),t.save();for(var n=getLines(t,r,a,i),h=i/4,d=0;d<n.length;d++){var f=getTotalWidth(t,n[d],i,h);switch(s){case 1:e+=(a-f)/2;break;case 2:e+=a-f;break;case 3:var c=getTotalWidth(t,n[d],i);(h=(a-c)/(n[d].length-1))<4&&(h=4),h>30&&(h=10)}paintText(t,n[d],e,o+i*(d+1),i,h)}t.restore()}

const textbook = document.getElementById("main");
let ctx = textbook.getContext("2d");

const scale = 3;
textbook.width = 170 * scale;
textbook.height = 240 * scale;

ctx.fillStyle = "#49B0BF";
ctx.fillRect(0, 0, textbook.width, textbook.height)

let title = "To jest chemia";
let description = "Chemia organiczna";
let description2 = "Podręcznik dla liceum ogólnokształcącego i techikum";
let forwho = "Dla absolwentów szkół podstawowych";
let zakres = "Zakres podstawowy";
let zakresColor = "#20AA54";
let bg = "#49B0BF";
let chapter = 1;

const changeBg = (a) => { bg = a.id };

function changeText(me) {

    switch (me.id) {
        case "title":
            title = me.value
            break;
        case "description":
            description = me.value
            break;
        case "description2":
            description2 = me.value
            break;
        case "forwho":
            forwho = me.value
            break;
        case "zakres":
            zakres = me.value
            break;
        case "zakresColor":
            zakresColor = me.value
            break;
        case "number":
            chapter = me.value
            break;
    }

}

function render() {
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1700, 2400);

    ctx.fillStyle = "#00000080";
    ctx.fillRect(0, 375, textbook.width, 150)
    
    ctx.fillStyle = zakresColor;
    ctx.fillRect(0, 508, textbook.width, 29)
    

    wrapText(ctx, 25, 385, 1000, [ { text: title, color: "white", font: "Arial", modifier: "bold", } ], 40, 0);
    wrapText(ctx, 25, 440, 1000, [ { text: description, color: "white", modifier: "bold", font: "Arial"   } ], 16, 0);
    wrapText(ctx, 25, 460, 1000, [ { text: description2, color: "white", font: "Arial"  } ], 16, 0);
    textBox(ctx, 25, 513, textbook.width, 14, [ { text: zakres, color: "white", modifier: "bold", font: "Arial"  } ], 14, [1, 0]);
    textBox(ctx, 380, 375, textbook.width-380, 110, [ { text: chapter, color: "white", modifier: "bold", font: "Arial"  } ], 100, [1, 1]);
    wrapText(ctx, textbook.width - 100, 20, 100, [ { text: forwho, color: "white", font: "Arial"  } ], 20, 0);
}
