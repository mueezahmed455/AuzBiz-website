 = Get-ChildItem -Path src -Recurse -Include *.tsx,*.ts
foreach ( in ) {
   = Get-Content .FullName -Raw -Encoding UTF8
   =  -replace "Chief Marketing Officer","Chief Executive Officer (CEO)" -replace "CMO","CEO" -replace "Lahore DHA RAHBAR","DHA II (Rehbar) Lahore-Pakistan" -replace "DHA RAHBAR","DHA II (Rehbar) Lahore-Pakistan"
  if ( -ne ) { Set-Content -Path .FullName -Value  -Encoding UTF8 -NoNewline; Write-Host ("updated " + .FullName) }
}
