
let user, dur, tms, total;
let text, example;


const clearextraction = () => document.getElementById('example').innerHTML = '';

const parseusername = (tb) => {

    return (tb.indexOf('Username: ') > -1 && tb.indexOf('=') === -1)
    ? tb.split('Username:')[1].trim()
    : user;
}

const parsedurations = (tb) => {

    return (tb.indexOf('Duration:') > -1 && tb.indexOf('=') > -1)
    ? [...tb.matchAll('[0-9]{1,2}h:[0-9]{1,2}m:[0-9]{1,2}s')].map((a) => a[0].split('').filter(p=>p!=='s' && p!=='h' && p!=='m').join(''))
    : dur;
}

const parsetimes = (tb) => {

    return (tb.indexOf('Duration:') > -1 && tb.indexOf('=') > -1)
    ? [...tb.matchAll('[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}')]
    : tms;
}

const parsetotal = (tb) => {

    if (tb.indexOf('Total Duration') > -1){
        var days = {}

        tms.forEach((v,i)=>{
            if(!days[v[0].split(' ')[0]]){
                days[v[0].split(' ')[0]] = []
            }
            days[v[0].split(' ')[0]].push(dur[i])
        })

        return days;
    }
    return total;
}

const parsetextblock = (tb) => {
    user = parseusername(tb);
    dur = parsedurations(tb);
    tms = parsetimes(tb);
    total = parsetotal(tb, tms, dur);
}

const classUsername = (str) => {
    return '<span class="username">' + str + '</span>'
}

const turnBold = (str) => {
    return '<b>'+str+'</b>'
}

const timestrToSec = (timestr) => {
    var parts = timestr.split(":");
    return (parts[0] * 3600) +
           (parts[1] * 60) +
           (+parts[2]);
  }
  
  const pad = (num) => {
    if(num < 10) {
      return "0" + num;
    } else {
      return "" + num;
    }
  }
  
  const formatTime = (seconds) => {
    return [pad(Math.floor(seconds/3600)),
            pad(Math.floor(seconds/60)%60),
            pad(seconds%60),
            ].join(":");
  }

const displayrecord = () => {

    if(total && user){

        example.innerHTML += '<br> ' + classUsername(turnBold(user))
        Object.keys(total).forEach((key,i)=>{
            example.innerHTML += '<br> ' + turnBold(key)
            total[key].forEach((elapsed)=>{
                example.innerHTML += '<br> ' + elapsed
            })
            example.innerHTML += '<br> ' + '-----------'
            example.innerHTML += '<br> ' + turnBold(formatTime(total[key].map(timestrToSec).reduce((a,b)=>a+b)))
            example.innerHTML += '<br>'
        })



        user = null;
        dur = null;
        tms = null;
        total = null;
    }
}

processtextblock = (tb) => {

    parsetextblock(tb);
    displayrecord();

}

const process = () => {

    example = document.getElementById('example')
    text = document.getElementsByTagName('textarea')[0].value
    
    const textblocks = text.split('--------------------------------');

    textblocks.forEach(processtextblock);
}

document.getElementsByTagName('button')[1].onclick = (e) => clearextraction();

document.getElementsByTagName('button')[0].onclick = (e) => process();

