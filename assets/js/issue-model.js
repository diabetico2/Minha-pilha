(function(root){
  'use strict';
  const plain=v=>v&&typeof v==='object'&&!Array.isArray(v);
  const normalize=s=>String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[’‘]/g,"'").toLowerCase();
  const slug=s=>normalize(s).replace(/&/g,' and ').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  // These defaults describe identified series, never collected-volume numbers.
  // Sources and the intentionally conservative matching policy: docs/EDICOES.md.
  const series={
    'batman':{years:{1:1940,2:2011,3:2016}},
    'detective-comics':{years:{1:1937,2:2011}},
    'the-brave-and-the-bold':{years:{1:1955,2:1991,3:2007}},
    'batman-confidential':{single:2007,years:{1:2007}},
    'robin-year-one':{single:2000,years:{1:2000}},
    'jla-year-one':{single:1998,years:{1:1998}},
    'batman-gotham-after-midnight':{single:2008,years:{1:2008}},
    'batman-shadow-of-the-bat':{single:1992,years:{1:1992}},
    'batman-gotham-knights':{single:2000,years:{1:2000}},
    'jla':{single:1997,years:{1:1997}},
    'batman-legends-of-the-dark-knight':{years:{1:1989,2:2012}}
  };
  const aliases={'brave-and-the-bold':'the-brave-and-the-bold','legends-of-the-dark-knight':'batman-legends-of-the-dark-knight','shadow-of-the-bat':'batman-shadow-of-the-bat'};
  const books={
    'robin-year-one':'Robin: Year One (2000) #1-4',
    'jla-year-one':'JLA: Year One (1998) #1-12',
    'batman-king-tut-s-tomb':'Batman Confidential (2007) #26-28; The Brave and the Bold (1955) #164, 171; Batman (1940) #353'
  };
  function versionFor(name,raw,context,numbers){
    const record=series[name],year=raw.match(/\((19\d{2}|20\d{2})(?:\s*[-–—]\s*(?:\d{4})?)?\)/),volume=raw.match(/\bvol(?:ume)?\.?\s*(\d+)\b/i);
    if(year&&volume&&record?.years[Number(volume[1])]&&Number(year[1])!==record.years[Number(volume[1])])return null;
    if(year)return 'y'+year[1];
    if(volume)return record?.years[Number(volume[1])]?'y'+record.years[Number(volume[1])]:'v'+volume[1];
    if(record?.single)return 'y'+record.single;
    if(name==='batman'){
      if(numbers.every(n=>/^\d+$/.test(n)&&Number(n)>=200&&Number(n)<=713))return 'y1940';
      if(context.orderId==='batman-reading-order-the-modern-age-post-crisis')return 'y1940';
      if(context.orderId==='batman-new-52-reading-order-from-the-court-of-owls-to-the-end-of-the-dc-you')return 'y2011';
      if(/^batman-(rebirth|infinite-frontier|dawn-of-dc)/.test(context.orderId))return 'y2016';
    }
    if(name==='detective-comics'&&numbers.every(n=>/^\d+$/.test(n)&&Number(n)>=600))return 'y1937';
    if(name==='the-brave-and-the-bold'&&numbers.every(n=>/^\d+$/.test(n)&&Number(n)>=100&&Number(n)<=200))return 'y1955';
    if(name==='batman-legends-of-the-dark-knight'&&context.orderId==='batman-reading-order-the-modern-age-post-crisis')return 'y1989';
    return null;
  }
  const numberPattern='(?:1,000,000|\\d+(?:\\.\\d+)?(?:AU|NOW)?|½)';
  const sequencePattern=numberPattern+'(?:\\s*[-–—]\\s*#?\\s*'+numberPattern+')?(?:\\s*(?:[,;]\\s*(?:(?:and|e)\\s+)?|&|\\band\\b|\\be\\b)\\s*#?\\s*'+numberPattern+'(?:\\s*[-–—]\\s*#?\\s*'+numberPattern+')?)*';
  function numbersFor(text){
    const result=[];
    for(const match of text.replace(/1,000,000/g,'1000000').matchAll(/(\d+(?:\.\d+)?(?:AU|NOW)?|½)(?:\s*[-–—]\s*#?\s*(\d+))?/gi)){
      const [,first,last]=match;
      if(last){if(!/^\d+$/.test(first)||Number(last)<Number(first)||Number(last)-Number(first)>500)return null;for(let n=Number(first);n<=Number(last);n++)result.push(String(n));}
      else result.push(/^\d+$/.test(first)?String(Number(first)):first.toUpperCase());
      if(result.length>1000)return null;
    }
    return [...new Set(result)];
  }
  function parse(entry,context){
    const title=entry.title||'',details=entry.details||'',known=books[slug(title)];
    const collected=details.match(/\b(?:reúne|collects|contém|inclui)\s+(.+)/i)||title.match(/\b(?:Reúne|Collects)\s+(.+)/i);
    const numberedTitle=new RegExp('^.{1,180}#\\s*'+sequencePattern+'[.\\s]*$','i').test(title)?title:'';
    let text=known||(collected?collected[1]:numberedTitle||(/^[^#!?]{1,180}#/.test(details)?details:''));
    if(!text)return {groups:[],complete:false};
    const groups=[],pattern=new RegExp('([^#]+?)#\\s*('+sequencePattern+')','gi');
    let consumed=0,previous=null,incomplete=false;
    for(const match of text.matchAll(pattern)){
      let raw=match[1].trim().replace(/^[\s,;&/]+/,'').replace(/^(?:and|e|plus|mais)\s+/i,'').replace(/\s+(?:issues|edições)$/i,'');
      // Narrative references and excerpt collections are not full-issue equivalences.
      if(/^(?:after|before|following|also|read)\b|\b(?:part of|pages|stories from|story from|feature|apos|antes|paginas|historias?|trechos|material|tambem|leia|edicoes|edicao|aparece|aparecem|se passa|publicad[ao]s?|reunid[ao]s?|consulte|recomenda|disponiveis|estreia|roteiro|backups)\b/i.test(normalize(raw))){incomplete=true;break;}
      if(raw.length>180||!raw){incomplete=true;break;}
      const numbers=numbersFor(match[2]);if(!numbers?.length){incomplete=true;break;}
      if(/^annual\b/i.test(raw)&&previous)raw=previous.replace(/\s*\([^)]*\)|\s+vol\.?\s*\d+/gi,'')+' '+raw;
      const name=raw.replace(/\s*\((?:19|20)\d{2}(?:\s*[-–—]\s*\d{0,4})?\)/g,'').replace(/\s*\(?\bvol(?:ume)?\.?\s*\d+\)?/gi,'').trim();
      if(!name||/^[\d\s,]+$/.test(name)||/[();]|\d\s*[-–]\s*\d|\d,|^\W|\s—\s|\.(?:\s|$)/.test(name.replace(/\b(Vs|Mr|Dr|Jr|St)\./gi,'$1'))||/^(and|e|to|annuals?|serie|series)$/i.test(name)){incomplete=true;break;}
      const suffix=text.slice(match.index+match[0].length);
      if(/^\s*\((?:hist[oó]ria|story|stories|pages|p[aá]ginas|special insert|suplemento|backup|excerpt)/i.test(suffix)){incomplete=true;break;}
      const canonicalName=aliases[slug(name)]||slug(name),version=versionFor(canonicalName,raw,context,numbers);
      const publisher=context.personal?(series[canonicalName]&&context.family!=='Mangás'?'dc':'unknown'):slug(context.publisher);
      const linked=!!version&&!!publisher&&publisher!=='pessoal'&&publisher!=='unknown'&&publisher!=='minhas-listas';
      const identity=linked?`issue:${publisher}:${canonicalName}:${version}`:`local:${context.key}:${canonicalName.slice(0,90)}:${version||'unknown'}`;
      if(identity.length>330){incomplete=true;break;}
      groups.push({name,version,linked,label:`${name} #${match[2].trim()}`,issues:numbers.map(number=>({id:`${identity}:${number==='½'?'half':number}`,number,title:`${name}${version?' ('+(version.startsWith('y')?version.slice(1):'vol. '+version.slice(1))+')':''} #${number}`,linked}))});
      previous=raw;consumed=match.index+match[0].length;
    }
    // Remaining prose may describe bonus stories without issue numbers. Never claim
    // that a partial contents list proves the whole collection has been completed.
    const tail=text.slice(consumed).trim();
    const complete=groups.length>0&&!incomplete&&/^[\s.;,]*$/.test(tail);
    return {groups,complete};
  }
  function build(orders){
    const rows=new Map(),byIssue=new Map(),byOrder=new Map();
    for(const order of orders){const list=[];byOrder.set(order.id,list);for(const [si,section]of order.sections.entries())for(const [ii,item]of section.items.entries()){
      const base=`${order.id}:${section.key??si}:${order.personal?item.key:ii}`;
      for(const [ci,entry]of [item,...(item.companions||[])].entries()){
        const key=base+(ci?':c'+(ci-1):''),context={key,orderId:order.id,publisher:order.publisher||'unknown',personal:!!order.personal,family:order.family};
        const parsed=parse(entry,context),row={key,...entry,...parsed,orderId:order.id,orderTitle:order.title,hasCompanions:ci===0&&!!item.companions?.length,isCompanion:ci>0};
        row.issues=[...new Map(parsed.groups.flatMap(g=>g.issues).map(i=>[i.id,i])).values()];rows.set(key,row);list.push(row);
        for(const issue of row.issues){if(!byIssue.has(issue.id))byIssue.set(issue.id,[]);byIssue.get(issue.id).push(key);}
      }
    }}
    return {rows,byIssue,byOrder};
  }
  function validate(map){
    if(!plain(map))throw Error('Progresso de edições inválido.');
    for(const [id,value]of Object.entries(map)){
      if(!/^(issue|local):[a-zA-Z0-9:._-]+$/.test(id)||id.length>360||typeof value!=='string'||value.length>120)throw Error('Edição inválida.');
      const r=JSON.parse(value);if(!plain(r)||typeof r.read!=='boolean'||typeof r.date!=='string'||r.date.length>40||(r.date&&!Number.isFinite(Date.parse(r.date)))||Object.keys(r).some(k=>!['read','date'].includes(k))||(!r.read&&r.date))throw Error('Marcação de edição inválida.');
    }
    return map;
  }
  function view(index,progress){
    const marks=new Map();
    for(const row of index.rows.values())if(progress.read[row.key])for(const issue of row.issues){
      const date=progress.completedAt[row.key]||'',old=marks.get(issue.id);
      if(!old||date&&(!old.date||date<old.date))marks.set(issue.id,{read:true,date});
    }
    for(const [id,value]of Object.entries(progress.issueRead||{}))marks.set(id,JSON.parse(value));
    const read={...progress.read},completedAt={...progress.completedAt},status=new Map();
    for(const row of index.rows.values()){
      const done=row.issues.filter(i=>marks.get(i.id)?.read).length,total=row.issues.length;
      const complete=total?done===total&&(row.complete||!!progress.read[row.key]):!!progress.read[row.key];
      if(complete){read[row.key]=true;if(!progress.read[row.key]&&!completedAt[row.key]){const dates=row.issues.map(i=>marks.get(i.id)?.date).filter(Boolean).sort();if(dates.length===total&&dates.length)completedAt[row.key]=dates.at(-1);}}
      else {delete read[row.key];delete completedAt[row.key];}
      status.set(row.key,{read:complete,done,total,partial:done>0&&!complete});
    }
    return {read,completedAt,marks,status};
  }
  function mark(index,progress,keys,checked,now){
    const before=view(index,progress),targets=new Set(),direct=new Set();
    // Materialize legacy marks before changing any row, preserving unknown dates.
    for(const [id,value]of before.marks)if(progress.issueRead[id]===undefined)progress.issueRead[id]=JSON.stringify(value);
    for(const key of keys){const row=index.rows.get(key);if(row){direct.add(key);for(const i of row.issues)targets.add(i.id);}else if(index.byIssue.has(key))targets.add(key);}
    for(const id of targets){const old=before.marks.get(id);progress.issueRead[id]=JSON.stringify({read:checked,date:checked?(old?.read?old.date:now):''});}
    for(const key of direct){if(checked){progress.read[key]=true;if(!before.read[key]&&!progress.completedAt[key])progress.completedAt[key]=now;}else{delete progress.read[key];delete progress.completedAt[key];}}
    const after=view(index,progress),affected=new Set([...direct,...[...targets].flatMap(id=>index.byIssue.get(id)||[])]);
    for(const key of affected){if(after.read[key]){progress.read[key]=true;if(!progress.completedAt[key]&&after.completedAt[key])progress.completedAt[key]=after.completedAt[key];}else{delete progress.read[key];delete progress.completedAt[key];}}
    return {affected:[...affected],targets:[...targets],crossed:[...affected].filter(k=>!direct.has(k)),view:after};
  }
  const api={parse,build,validate,view,mark,numbersFor};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.PilhaIssues=api;
})(typeof window==='undefined'?{}:window);
