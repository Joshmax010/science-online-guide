"""Export committed source, a Git bundle and optional built site; stdlib only."""
import argparse
import hashlib
import json
import subprocess
import tempfile
import zipfile
from datetime import datetime, timezone
from pathlib import Path


def create_backup(repo, output):
    repo=Path(repo).resolve();output=Path(output).resolve()
    def git(*args):
        return subprocess.check_output(['git', '-C', str(repo), *args])
    if git('status','--porcelain').strip():
        raise RuntimeError('Commit or save all changes before backup; working tree is not clean.')
    commit=git('rev-parse','HEAD').decode().strip()
    files=[x.decode('utf-8') for x in git('ls-files','-z').split(b'\0') if x]
    for rel in files:
        p=Path(rel)
        if p.name == '.env' or (p.name.startswith('.env.') and not p.name.endswith('.example')):
            raise RuntimeError('Remove tracked credential files before backup.')
        if any(part in {'.git','node_modules'} for part in p.parts):
            raise RuntimeError('Unexpected generated/credential directory in tracked files.')
    readme='''# Project migration backup

- science-online-guide/: committed source, maintenance docs, originals and lockfile.
- repository.bundle: Git history and refs; no local Git config or credential store.
- offline-site/: static build, if available at export time.
- backup-manifest.json: per-file SHA-256 checksums and source commit.

Online restore: enter science-online-guide/, read MAINTENANCE.md, run npm ci,
npm run verify:originals, npm test and npm run docs:build. This folder has no .git.
For ongoing Git work, clone GitHub or restore repository.bundle instead.

Offline Git restore (from this extracted directory):
  git clone repository.bundle restored-project
  cd restored-project
  git remote set-url origin https://github.com/Joshmax010/science-online-guide.git
  git fetch origin
Read MAINTENANCE.md before reconciling any newer remote changes.

Offline website: Python 3 is optional for serving the included static build:
  python -m http.server 4173 --bind 127.0.0.1 --directory offline-site
Then open http://127.0.0.1:4173. Do not rely on file:// for module-based sites.

Account passwords, GitHub credentials, Cloudflare authorization, node_modules
and machine settings are NOT included. Reinstall dependencies over the network
for development. Comments and counters still require their external services.

Privacy: current source/docs are path-sanitized. Historical commits are retained
at the owner's request and can still contain former machine paths. Treat the
bundle as a private archival artifact; do not publish it as a new public asset.
'''
    output.parent.mkdir(parents=True,exist_ok=True)
    with tempfile.TemporaryDirectory(prefix='guide-export-') as temp:
        bundle=Path(temp)/'repository.bundle'
        git('bundle','create',str(bundle),'--all')
        git('bundle','verify',str(bundle))
        payload=[('science-online-guide/'+rel, (repo/rel).read_bytes()) for rel in files]
        payload.append(('repository.bundle',bundle.read_bytes()))
        dist=repo/'docs/.vitepress/dist'
        if dist.exists():
            payload.extend(('offline-site/'+p.relative_to(dist).as_posix(),p.read_bytes()) for p in sorted(dist.rglob('*')) if p.is_file())
        payload.append(('BACKUP-README.md',readme.encode('utf-8')))
        manifest={'schema_version':1,'commit':commit,'generated_at':datetime.now(timezone.utc).isoformat(),'files':[{'path':name,'bytes':len(data),'sha256':hashlib.sha256(data).hexdigest()} for name,data in payload]}
        with zipfile.ZipFile(output,'w',compression=zipfile.ZIP_DEFLATED,compresslevel=6) as z:
            for name,data in payload:z.writestr(name,data)
            z.writestr('backup-manifest.json',json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    with zipfile.ZipFile(output) as z:
        if z.testzip() is not None:raise RuntimeError('ZIP CRC verification failed.')
        for item in manifest['files']:
            data=z.read(item['path'])
            if len(data)!=item['bytes'] or hashlib.sha256(data).hexdigest()!=item['sha256']:
                raise RuntimeError('ZIP hash verification failed: '+item['path'])
    sha=hashlib.sha256(output.read_bytes()).hexdigest()
    output.with_suffix(output.suffix+'.sha256').write_text(sha+'  '+output.name+'\n',encoding='utf-8')
    print(json.dumps({'archive':output.name,'commit':commit,'source_files':len(files),'payload_files':len(payload),'bytes':output.stat().st_size,'sha256':sha}))
    return output


if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--repo',type=Path,default=Path(__file__).resolve().parents[1])
    parser.add_argument('--output',type=Path)
    args=parser.parse_args()
    dest=args.output or args.repo.parent/'science-online-guide-backups'/('science-online-guide-'+datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')+'.zip')
    try:create_backup(args.repo,dest)
    except (RuntimeError,subprocess.CalledProcessError) as error:
        parser.exit(1,str(error)+'\n')
