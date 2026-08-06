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
document.querySelector('#report-form').addEventListener('submit',e=>{e.preventDefault();toast('제보가 접수되었습니다. 확인 후 안내드릴게요.');e.target.reset();});
document.querySelector('#report-photo').addEventListener('click',()=>toast('사진 선택 기능은 데모에서 준비 중입니다.'));


async function loadLiveMarineData(){try{const r=await fetch('data/latest.json?ts='+Date.now()),d=await r.json();document.querySelector('#live-station').textContent=d.station||'공식 해양 관측소';document.querySelector('#live-updated').textContent=`${d.source||'공식 데이터'} · ${d.updatedAt?new Date(d.updatedAt).toLocaleString('ko-KR'):'갱신 대기 중'}`;document.querySelector('#live-summary').innerHTML=d.temperature!=null?`현재 수온 <b>${d.temperature}°C</b> · 공식 관측값`:(d.status||'관측값 갱신 대기 중입니다.');}catch(_){document.querySelector('#live-summary').textContent='공식 관측 데이터 연결을 준비 중입니다.';}}loadLiveMarineData();
