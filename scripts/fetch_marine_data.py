import json, os, urllib.parse, urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path
key=os.environ['MARINE_WEATHER_API_KEY']
params={'serviceKey':key,'resultType':'json','mmaf':'101','mmsi':'994401597','dataType':'ALL'}
url='http://marineweather.nmpnt.go.kr:8001/openWeatherNow.do?'+urllib.parse.urlencode(params)
try:
  with urllib.request.urlopen(url,timeout=25) as r: raw=json.loads(r.read().decode('utf-8'))
  def find(x, terms):
    if isinstance(x,dict):
      for k,v in x.items():
        if any(t in k.lower() for t in terms) and isinstance(v,(str,int,float)): return v
        found=find(v,terms)
        if found is not None:return found
    if isinstance(x,list):
      for v in x:
        found=find(v,terms)
        if found is not None:return found
  data={'source':'국립해양측위정보원 해양기상정보','station':'부산항 유도등부표','updatedAt':datetime.now(timezone(timedelta(hours=9))).isoformat(),'temperature':find(raw,['watertemp','wtemp','seatem']),'salinity':find(raw,['salinity','salt']),'windSpeed':find(raw,['windspeed','wind_spd']),'raw':raw}
except Exception as e:data={'source':'국립해양측위정보원 해양기상정보','updatedAt':datetime.now(timezone(timedelta(hours=9))).isoformat(),'status':'관측값 수집 재시도 중','error':str(e)}
Path('data').mkdir(exist_ok=True);Path('data/latest.json').write_text(json.dumps(data,ensure_ascii=False,indent=2),encoding='utf-8')
