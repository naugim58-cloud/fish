const screens = document.querySelectorAll('.screen');
const navItems = document.querySelectorAll('.nav-item');
function goTo(page) {
  screens.forEach(s => s.classList.toggle('active', s.id === page));
  navItems.forEach(n => n.classList.toggle('active', n.dataset.page === page));
  window.scrollTo({top:0, behavior:'smooth'});
}
const photoInput = document.querySelector('#photo-input');
photoInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  document.querySelector('#preview').src = URL.createObjectURL(file);
  document.querySelector('#upload-state').classList.add('hidden');
  document.querySelector('#result-state').classList.remove('hidden');
});
function showDemoDiagnosis() {
  document.querySelector('#preview').src = 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?auto=format&fit=crop&w=800&q=80';
  document.querySelector('#upload-state').classList.add('hidden');
  document.querySelector('#result-state').classList.remove('hidden');
}
function resetDiagnosis() {
  photoInput.value = '';
  document.querySelector('#result-state').classList.add('hidden');
  document.querySelector('#upload-state').classList.remove('hidden');
}
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');setTimeout(()=>el.classList.remove('show'),2600)}
function getLocation(){document.querySelector('#location-input').childNodes[0].nodeValue='⌖ 현재 위치를 확인했어요 · 기장군 일광면 ';toast('현재 위치가 반영되었습니다.');}
function toggleNotifications(){document.querySelector('#notification-panel').classList.toggle('hidden');document.querySelector('#account-panel').classList.add('hidden');}
function toggleAccount(){document.querySelector('#account-panel').classList.toggle('hidden');document.querySelector('#notification-panel').classList.add('hidden');}
const guestMode=new URLSearchParams(window.location.search).get('mode')==='guest';
if(guestMode)sessionStorage.setItem('badaon-user','guest');
const signedInUser=sessionStorage.getItem('badaon-user');
if(!signedInUser){window.location.replace('login.html');}else{const label=signedInUser==='guest'?'방문자':signedInUser;document.querySelector('#welcome-title').innerHTML=`안녕하세요, ${label} 님<br /><strong>${signedInUser==='guest'?'우리 바다의 안전을 확인하세요.':'오늘도 안전 양식하세요.'}</strong>`;document.querySelector('#account-name').textContent=label;}
function logout(){document.querySelector('#account-panel').classList.add('hidden');sessionStorage.removeItem('badaon-user');window.location.replace('login.html');}
document.querySelector('#report-form').addEventListener('submit',e=>{e.preventDefault();toast('제보가 접수되었습니다. 확인 후 안내드릴게요.');e.target.reset();});
document.querySelector('#report-image').addEventListener('change',e=>{const n=e.target.files.length;document.querySelector('#report-photo-label').textContent=n?`${n}장 선택됨`:'사진 추가하기';if(n)toast(`${n}장의 사진이 첨부되었습니다.`);});

async function loadLiveMarineData(){try{const r=await fetch('data/latest.json?ts='+Date.now()),d=await r.json();document.querySelector('#live-station').textContent=d.station||'공식 해양 관측소';document.querySelector('#live-updated').textContent=`${d.source||'공식 데이터'} · ${d.updatedAt?new Date(d.updatedAt).toLocaleString('ko-KR'):'갱신 대기 중'}`;document.querySelector('#live-summary').innerHTML=d.temperature!=null?`현재 수온 <b>${d.temperature}°C</b> · 공식 관측값`:(d.status||'관측값 갱신 대기 중입니다.');}catch(_){document.querySelector('#live-summary').textContent='공식 관측 데이터 연결을 준비 중입니다.';}}loadLiveMarineData();
