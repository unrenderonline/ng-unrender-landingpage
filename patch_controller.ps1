
$path = "src\app\lib\controller-d1-OMKPY.js"
if (Test-Path $path) {
    Write-Host "Patching $path..."
    $content = Get-Content $path -Raw
    $lenBefore = $content.Length
    
    # Replace require("path") and require('path')
    $content = $content.Replace('require("path")', '({dirname:function(p){return p}})')
    $content = $content.Replace("require('path')", "({dirname:function(p){return p}})")
    
    # Replace require("fs") and require('fs')
    $content = $content.Replace('require("fs")', '({})')
    $content = $content.Replace("require('fs')", "({})")
    
    if ($content.Length -ne $lenBefore) {
        Set-Content $path $content -NoNewline
        Write-Host "Patched successfully."
    } else {
        # Check if replacement content actually changed content logic, simple length check might fail if lengths match exactly (unlikely here)
        # So we check if pattern still exists? Or just save.
        Set-Content $path $content -NoNewline
        Write-Host "File saved (content length unchanged, potentially verified)."
    }
} else {
    Write-Host "File not found: $path"
}
