(() => {
  async function readImage(file, type) {
    if (!file || !['image/jpeg','image/png','image/webp'].includes(file.type)) throw Error('Escolha uma imagem JPG, PNG ou WebP.');
    if (file.size > 8 * 1024 * 1024) throw Error('Escolha uma imagem de até 8 MB.');
    const url = URL.createObjectURL(file), image = new Image();
    try {
      image.src = url; await image.decode();
      if (!image.naturalWidth || image.naturalWidth * image.naturalHeight > 40000000) throw Error('A imagem é muito grande. Escolha uma versão menor.');
      const avatar = type === 'avatar', canvas = document.createElement('canvas');
      canvas.width = avatar ? 192 : 480; canvas.height = avatar ? 192 : 320;
      const context = canvas.getContext('2d');
      context.fillStyle = '#171a21'; context.fillRect(0,0,canvas.width,canvas.height);
      const scale = Math.max(canvas.width / image.naturalWidth,canvas.height / image.naturalHeight);
      context.drawImage(image,(canvas.width-image.naturalWidth*scale)/2,(canvas.height-image.naturalHeight*scale)/2,image.naturalWidth*scale,image.naturalHeight*scale);
      const limit = avatar ? 32000 : 100000;
      for (const quality of [.86,.72,.58,.42,.28]) { const encoded = canvas.toDataURL('image/jpeg',quality); if (encoded.length <= limit) return encoded; }
      throw Error('Não foi possível reduzir esta imagem. Tente uma imagem mais simples.');
    } catch (error) { throw Error(error.message.includes('imagem') ? error.message : 'Não foi possível abrir esta imagem. Tente outro arquivo.'); }
    finally { URL.revokeObjectURL(url); }
  }
  function cover(title, color = '#d4b76c', style = 'orbit', kind = 'comic') {
    const canvas = document.createElement('canvas'); canvas.width=480; canvas.height=320;
    const ctx=canvas.getContext('2d');ctx.fillStyle='#121720';ctx.fillRect(0,0,480,320);
    ctx.fillStyle=/^#[0-9a-f]{6}$/i.test(color)?color:'#d4b76c';
    if(style==='orbit') {ctx.globalAlpha=.32;for(let i=0;i<5;i++){ctx.beginPath();ctx.arc(440,30,40+i*48,0,Math.PI*2);ctx.lineWidth=20;ctx.strokeStyle=ctx.fillStyle;ctx.stroke();}}
    else if(style==='panels') {ctx.globalAlpha=.28;for(let i=0;i<8;i++){ctx.save();ctx.translate(i*85-100,0);ctx.rotate(-.45);ctx.fillRect(0,-100,28,600);ctx.restore();}}
    else {ctx.globalAlpha=.35;for(let x=10;x<480;x+=20)for(let y=10;y<320;y+=20){ctx.beginPath();ctx.arc(x,y,2+(x/160),0,Math.PI*2);ctx.fill();}}
    ctx.globalAlpha=1;ctx.fillRect(32,39,38,5);ctx.fillStyle='#e9e4da';ctx.font='bold 12px system-ui';ctx.fillText(kind==='manga'?'MINHA COLEÇÃO · MANGÁ':'MINHA COLEÇÃO · HQ',32,72);
    const words=String(title||'Minha próxima história').trim().split(/\s+/);let lines=[],line='';ctx.font='bold 32px Georgia';
    for(const word of words){if(ctx.measureText((line?line+' ':'')+word).width>390&&line){lines.push(line);line=word;}else line+=(line?' ':'')+word;}if(line)lines.push(line);
    lines.slice(0,4).forEach((line,index)=>{while(ctx.measureText(line).width>396)line=line.slice(0,-2)+'…';ctx.fillText(index===3&&lines.length>4?line.slice(0,20)+'…':line,32,126+index*38);});
    ctx.font='12px system-ui';ctx.fillStyle='#ced4de';ctx.fillText('Uma história de cada vez.                              mp.',32,291);
    return canvas.toDataURL('image/jpeg',.8);
  }
  window.PilhaMedia = { readImage, cover };
})();
