document.getElementsByTagName('button')[0].onclick = (e) => {
    // text = document.getElementsByTagName('textarea')[0].value
    
    var text = document.getElementsByTagName('textarea')[0].value
    var example = document.getElementById('example')

    var username;
    var durations;
    var times;

    text.split('--------------------------------').forEach((v)=>{

        // catch username
        if (v.indexOf('Username: ') > -1 && v.indexOf('=') === -1){
            username = v.split('Username:')[1].trim()
        }

        // catch durations and times
        if (v.indexOf('Duration: ') > -1 && v.indexOf('=') > -1){
            durations = [...v.matchAll('[0-9]{1,2}h:[0-9]{1,2}m:[0-9]{1,2}s')].map((a) => a[0].split('').filter(p=>p!=='s' && p!=='h' && p!=='m').join(''))
            times = [...v.matchAll('[0-9]{1,2} [0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2}')]
        }

        // catch total moment
        if (v.indexOf('Total Duration') > -1){

            var days = {}

            times.forEach((v,i)=>{
                if(!days[v[0].split(' ')[0]]){
                    days[v[0].split(' ')[0]] = []
                }
                days[v[0].split(' ')[0]].push(durations[i])
            })

            
            example.innerHTML += '<br> ' + classUsername(turnBold(username))
            Object.keys(days).forEach((key,i)=>{
                example.innerHTML += '<br> ' + turnBold(key)
                days[key].forEach((elapsed)=>{
                    example.innerHTML += '<br> ' + elapsed
                })
                example.innerHTML += '<br> ' + '-----------'
                example.innerHTML += '<br> ' + turnBold(formatTime(days[key].map(timestrToSec).reduce((a,b)=>a+b)))
                example.innerHTML += '<br>'
            })

        }

        

    })
    

}

function classUsername(str){
    return '<span class="username">' + str + '</span>'
}

function turnBold(str){
    return '<b>'+str+'</b>'
}

function timestrToSec(timestr) {
    var parts = timestr.split(":");
    return (parts[0] * 3600) +
           (parts[1] * 60) +
           (+parts[2]);
  }
  
  function pad(num) {
    if(num < 10) {
      return "0" + num;
    } else {
      return "" + num;
    }
  }
  
  function formatTime(seconds) {
    return [pad(Math.floor(seconds/3600)),
            pad(Math.floor(seconds/60)%60),
            pad(seconds%60),
            ].join(":");
  }