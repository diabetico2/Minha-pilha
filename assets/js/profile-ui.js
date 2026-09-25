(() => {
  const app=window.PilhaApp, cloud=window.PilhaCloud, $=selector=>document.querySelector(selector);
  let owner=null, draft={}, dirty=false, imageToken=0, imageBusy=false, passwordBusy=false, editorImage=null;
  const panel=document.createElement('section');panel.className='profile-panel';
  panel.innerHTML=`<div class="profile-heading"><div class="profile-avatar" id="profileAvatar"><span>MP</span></div><div><h3 id="profileDisplayName">Seu perfil</h3><p id="profileStats"></p></div></div>
    <form id="profileForm"><div class="profile-photo-actions"><button type="button" class="dialog-secondary" id="uploadAvatarBtn">Escolher foto</button><button type="button" class="text-button" id="removeAvatarBtn">Remover foto</button><input type="file" id="avatarInput" accept="image/jpeg,image/png,image/webp" hidden></div>
    <section class="avatar-editor" id="avatarEditor" aria-labelledby="avatarEditorTitle" hidden><div class="avatar-crop-stage" id="avatarCropStage"><img id="avatarCropImage" alt="Prévia do recorte da foto"></div><div class="avatar-editor-controls"><h4 id="avatarEditorTitle">Ajustar foto</h4><p>Use o zoom e mova o enquadramento até a foto ficar como você quer.</p><label for="avatarZoom">Zoom<input id="avatarZoom" type="range" min="1" max="3" value="1" step="0.01"></label><label for="avatarPositionX">Posição horizontal<input id="avatarPositionX" type="range" min="-1" max="1" value="0" step="0.01"></label><label for="avatarPositionY">Posição vertical<input id="avatarPositionY" type="range" min="-1" max="1" value="0" step="0.01"></label><div class="avatar-editor-actions"><button class="dialog-primary" type="button" id="applyAvatarCropBtn">Usar este recorte</button><button class="dialog-secondary" type="button" id="cancelAvatarCropBtn">Cancelar</button></div></div></section>
    <label for="profileName">Como você quer ser chamado?</label><input id="profileName" maxlength="60" placeholder="Seu nome ou apelido" autocomplete="nickname">
    <label for="profileBio">Sobre sua leitura <small>opcional</small></label><textarea id="profileBio" maxlength="280" rows="2" placeholder="Suas histórias e personagens favoritos…"></textarea>
    <p class="profile-privacy">Seu perfil fica na sua conta. Fotos e nome não entram nos arquivos de listas compartilhadas.</p><div class="account-actions"><button class="dialog-primary" id="saveProfileBtn" type="submit">Salvar perfil</button></div><p id="profileMessage" role="status"></p></form>
    <details class="password-section"><summary>Alterar minha senha</summary><p>Confirme sua senha atual e escolha a nova. Você continua conectado neste dispositivo.</p>
    <form id="passwordForm"><label for="currentPassword">Senha atual</label><input id="currentPassword" type="password" autocomplete="current-password" required maxlength="128"><label for="newPassword">Nova senha</label><input id="newPassword" type="password" autocomplete="new-password" minlength="8" maxlength="128" required><label for="confirmPassword">Repetir nova senha</label><input id="confirmPassword" type="password" autocomplete="new-password" minlength="8" maxlength="128" required><div class="account-actions"><button class="dialog-primary" id="changePasswordBtn" type="submit">Atualizar senha</button></div><p id="passwordMessage" role="status"></p></form></details>`;
  $('#signedInPanel').prepend(panel);
  function avatar(element,profile) {
    element.replaceChildren();
    if(profile.avatar){const img=document.createElement('img');img.src=profile.avatar;img.alt='';element.append(img);}
    else {const label=document.createElement('span');label.textContent=(profile.displayName||'Minha Pilha').trim().split(/\s+/).slice(0,2).map(word=>word[0]).join('').toUpperCase();element.append(label);}
  }
  function cropOptions(){return {zoom:$('#avatarZoom').value,x:$('#avatarPositionX').value,y:$('#avatarPositionY').value};}
  function closeAvatarEditor(){editorImage=null;$('#avatarEditor').hidden=true;$('#avatarCropImage').removeAttribute('src');$('#saveProfileBtn').disabled=imageBusy;}
  function updateAvatarPreview(){
    if(!editorImage)return;const stage=$('#avatarCropStage'),size=stage.clientWidth||220,layout=window.PilhaMedia.avatarLayout(editorImage,cropOptions(),size),image=$('#avatarCropImage');
    image.src=editorImage.src;Object.assign(image.style,{width:`${layout.width}px`,height:`${layout.height}px`,left:`${layout.left}px`,top:`${layout.top}px`});
  }
  function refresh() {
    const profile=app.getProfile(),user=cloud.user();
    if(!dirty&&!imageBusy){draft={...profile};$('#profileName').value=profile.displayName||'';$('#profileBio').value=profile.bio||'';}
    const name=profile.displayName?.trim()||'Seu perfil';
    $('#profileDisplayName').textContent=name;
    const catalogue=app.catalogue(), read=catalogue.reduce((sum,item)=>sum+item.progress.read,0),done=catalogue.filter(item=>item.progress.total&&item.progress.read===item.progress.total).length;
    $('#profileStats').textContent=`${read} itens lidos · ${done} listas concluídas`;
    avatar($('#profileAvatar'),dirty?draft:profile);
    if(user){const button=$('#accountBtn');button.replaceChildren();const image=document.createElement('span');image.className='nav-avatar';avatar(image,profile);const label=document.createElement('span');label.textContent=profile.displayName?.trim()||'Meu perfil';button.append(image,label);button.setAttribute('aria-label','Abrir meu perfil');}
    else{$('#accountBtn').textContent='Entrar';$('#accountBtn').removeAttribute('aria-label');}
  }
  function open() {
    owner=cloud.user()?.uid||null;draft=app.getProfile();dirty=false;imageBusy=false;imageToken++;closeAvatarEditor();
    $('#profileName').value=draft.displayName||'';$('#profileBio').value=draft.bio||'';
    $('#profileMessage').textContent='';$('#passwordMessage').textContent='';
    $('#saveProfileBtn').disabled=false;refresh();
  }
  function clearPasswords() { for(const id of ['#currentPassword','#newPassword','#confirmPassword']) $(id).value=''; }
  $('#profileForm').oninput=event=>{if(event.target.id==='profileName'){draft.displayName=event.target.value;dirty=true;}if(event.target.id==='profileBio'){draft.bio=event.target.value;dirty=true;}};
  $('#uploadAvatarBtn').onclick=()=>$('#avatarInput').click();
  $('#avatarInput').onchange=async event=>{
    const file=event.target.files?.[0];if(!file)return;const token=++imageToken;imageBusy=true;closeAvatarEditor();$('#saveProfileBtn').disabled=true;$('#profileMessage').textContent='Abrindo sua foto…';
    try {const image=await window.PilhaMedia.loadImage(file);if(token!==imageToken)return;editorImage=image;for(const id of ['#avatarZoom','#avatarPositionX','#avatarPositionY'])$(id).value=id==='#avatarZoom'?'1':'0';$('#avatarEditor').hidden=false;updateAvatarPreview();$('#profileMessage').textContent='Ajuste o enquadramento e confirme o recorte.';}
    catch(error){if(token===imageToken)$('#profileMessage').textContent=error.message;}
    finally{event.target.value='';if(token===imageToken){imageBusy=false;$('#saveProfileBtn').disabled=!!editorImage;}}
  };
  for(const id of ['#avatarZoom','#avatarPositionX','#avatarPositionY'])$(id).oninput=updateAvatarPreview;
  $('#applyAvatarCropBtn').onclick=()=>{if(!editorImage)return;try{draft.avatar=window.PilhaMedia.avatarData(editorImage,cropOptions());dirty=true;closeAvatarEditor();refresh();$('#profileMessage').textContent='Foto pronta. Salve o perfil para aplicar.';}catch(error){$('#profileMessage').textContent=error.message;}};
  $('#cancelAvatarCropBtn').onclick=()=>{imageToken++;imageBusy=false;closeAvatarEditor();$('#profileMessage').textContent='A foto anterior foi mantida.';};
  $('#removeAvatarBtn').onclick=()=>{imageToken++;imageBusy=false;closeAvatarEditor();draft.avatar='';dirty=true;refresh();};
  $('#profileForm').onsubmit=event=>{
    event.preventDefault();if(imageBusy)return;if(editorImage){$('#profileMessage').textContent='Confirme ou cancele o recorte antes de salvar.';return;}
    try {if(!owner||cloud.user()?.uid!==owner)throw Error('A conta mudou. Abra o perfil novamente.');app.saveProfile({displayName:($('#profileName').value||'').trim(),bio:($('#profileBio').value||'').trim(),avatar:draft.avatar||''});dirty=false;refresh();$('#profileMessage').textContent='Perfil salvo. As alterações serão sincronizadas com sua conta.';}
    catch(error){$('#profileMessage').textContent=error.message;}
  };
  $('#passwordForm').onsubmit=async event=>{
    event.preventDefault();if(passwordBusy)return;
    if($('#newPassword').value!==$('#confirmPassword').value){$('#passwordMessage').textContent='As novas senhas precisam ser iguais.';return;}
    const uid=cloud.user()?.uid;passwordBusy=true;$('#changePasswordBtn').disabled=true;$('#passwordMessage').textContent='Atualizando sua senha…';
    try {await cloud.changePassword($('#currentPassword').value,$('#newPassword').value);if(cloud.user()?.uid===uid)$('#passwordMessage').textContent='Senha atualizada. Você continua conectado.';}
    catch(error){if(cloud.user()?.uid===uid)$('#passwordMessage').textContent=error.message;}
    finally{clearPasswords();passwordBusy=false;$('#changePasswordBtn').disabled=false;}
  };
  $('#accountDialog').addEventListener('close',()=>{clearPasswords();imageToken++;imageBusy=false;dirty=false;closeAvatarEditor();});
  window.PilhaProfileUI={refresh,open,userChanged(user){if(owner!==(user?.uid||null)){clearPasswords();open();}refresh();}};
  open();
})();
