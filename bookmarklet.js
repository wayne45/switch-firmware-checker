javascript:(function(){
  var overlay=document.createElement('div');
  overlay.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:999999;display:flex;align-items:center;justify-content:center;';
  var box=document.createElement('div');
  box.style.cssText='background:#1a1a2e;color:#e0e0e0;padding:24px 32px;border-radius:12px;font-family:sans-serif;text-align:center;min-width:300px;box-shadow:0 8px 32px rgba(0,0,0,0.4);';
  box.innerHTML='<div style="font-size:14px;color:#888;">Loading...</div>';
  overlay.appendChild(box);
  document.body.appendChild(overlay);
  overlay.addEventListener('click',function(e){if(e.target===overlay){document.body.removeChild(overlay);}});

  fetch('https://switchbrew.org/w/api.php?action=parse&page=System_Versions&format=json&prop=text&origin=*')
    .then(function(r){return r.json();})
    .then(function(data){
      var html=data.parse.text['*'];
      var parser=new DOMParser();
      var doc=parser.parseFromString(html,'text/html');
      var rows=doc.querySelectorAll('table.wikitable tr');
      var lastRow=rows[rows.length-1];
      var cells=lastRow.querySelectorAll('td');
      var version=cells[0].textContent.trim();
      var date=cells[1].textContent.trim();
      box.innerHTML=
        '<div style="font-size:12px;text-transform:uppercase;letter-spacing:2px;color:#888;margin-bottom:8px;">Nintendo Switch</div>'+
        '<div style="font-size:36px;font-weight:bold;color:#0ff;margin-bottom:4px;">'+version+'</div>'+
        '<div style="font-size:14px;color:#aaa;">Released: '+date+'</div>'+
        '<div style="margin-top:16px;font-size:11px;color:#666;">Click outside to close</div>';
    })
    .catch(function(err){
      box.innerHTML='<div style="color:#f66;">Error: '+err.message+'</div><div style="margin-top:8px;font-size:11px;color:#666;">Click outside to close</div>';
    });
})();