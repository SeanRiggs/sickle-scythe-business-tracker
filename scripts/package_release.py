from pathlib import Path
import csv, hashlib, json, subprocess, zipfile
ROOT=Path(__file__).resolve().parents[1]
FILES=['DEPLOYMENT-MARKER.txt','LICENSE','README.md','index.html','logo-placeholder.svg','manifest.webmanifest','partner-sales-template.csv','service-worker.js','styles.css','tracker-v53.js']
for name in ['tracker-v53.js','service-worker.js']:subprocess.run(['node','--check',str(ROOT/name)],check=True)
assert len(list(csv.reader((ROOT/'partner-sales-template.csv').open())))==1,'Template must be blank/header-only'
assert 'tracker-v53.js' in (ROOT/'index.html').read_text()
assert 'ss-v53' in (ROOT/'service-worker.js').read_text()
assert 'repairProductionData' not in (ROOT/'tracker-v53.js').read_text()
assert not (ROOT/'tracker-v52.js').exists()
out=ROOT/'dist';out.mkdir(exist_ok=True)
archive=out/'sickle-scythe-tracker-v5.3-candidate.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
 for name in FILES:z.write(ROOT/name,name)
with zipfile.ZipFile(archive) as z:
 assert z.namelist()==FILES
 assert z.testzip() is None
report={'files':FILES,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'integrity':'passed','privateDataFilesIncluded':False,'sourceBaseline':'fd65f76ccff9cf5637ebccae5823d6783037b3bd'}
(out/'release-manifest.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
