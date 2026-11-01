from pathlib import Path
import csv, hashlib, json, subprocess, zipfile
ROOT=Path(__file__).resolve().parents[1]
FILES=['DEPLOYMENT-MARKER.txt','LICENSE','README.md','index.html','logo-placeholder.svg','manifest.webmanifest','partner-sales-template.csv','service-worker.js','styles.css','tracker-v531.js']
for name in ['tracker-v531.js','service-worker.js']:subprocess.run(['node','--check',str(ROOT/name)],check=True)
assert len(list(csv.reader((ROOT/'partner-sales-template.csv').open())))==1,'Template must be blank/header-only'
assert 'tracker-v531.js' in (ROOT/'index.html').read_text()
assert 'ss-v531' in (ROOT/'service-worker.js').read_text()
assert 'repairProductionData' not in (ROOT/'tracker-v531.js').read_text()
assert not (ROOT/'tracker-v52.js').exists()
assert not (ROOT/'tracker-v53.js').exists()
out=ROOT/'dist';out.mkdir(exist_ok=True)
archive=out/'sickle-scythe-tracker-v5.3.1-candidate.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED) as z:
 for name in FILES:z.write(ROOT/name,name)
with zipfile.ZipFile(archive) as z:
 assert z.namelist()==FILES
 assert z.testzip() is None
report={'files':FILES,'sha256':hashlib.sha256(archive.read_bytes()).hexdigest(),'integrity':'passed','privateDataFilesIncluded':False,'sourceBaseline':'528ee57c7d7969956a8cce439de25d186de86113'}
(out/'release-manifest.json').write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(report,indent=2))
