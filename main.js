document.getElementById('genBtn').addEventListener('click', function(){
    let script = '@echo off\n';
    script += 'title 一键安全清理脚本\n';
    script += 'echo 正在清理，请稍候...\necho.\n';

    if(document.getElementById('sysTemp').checked){
        script += 'echo [1/5]清理系统临时文件\n';
        script += 'rd /s /q %temp% >nul 2>&1 && md %temp%\n';
        script += 'echo 完成\necho.\n';
    }
    if(document.getElementById('recycle').checked){
        script += 'echo [2/5]清空回收站\n';
        script += 'rd /s /q C:\\$Recycle.Bin >nul 2>&1\n';
        script += 'echo 完成\necho.\n';
    }
    if(document.getElementById('downloads').checked){
        script += 'echo [3/5]清理下载目录安装包压缩包\n';
        script += 'del /f /s /q "%userprofile%\\Downloads\\*.exe" "%userprofile%\\Downloads\\*.zip" "%userprofile%\\Downloads\\*.rar" "%userprofile%\\Downloads\\*.7z" "%userprofile%\\Downloads\\*.msi" >nul 2>&1\n';
        script += 'echo 完成\necho.\n';
    }
    if(document.getElementById('qqCache').checked){
        script += 'echo [4/5]清理QQ图片文件视频缓存\n';
        script += 'rd /s /q "%userprofile%\\Documents\\Tencent Files\\*\\Image" "%userprofile%\\Documents\\Tencent Files\\*\\FileRecv" "%userprofile%\\Documents\\Tencent Files\\*\\Video" >nul 2>&1\n';
        script += 'echo 完成\necho.\n';
    }
    if(document.getElementById('wechatCache').checked){
        script += 'echo [5/5]清理微信图片文件视频缓存\n';
        script += 'rd /s /q "%userprofile%\\Documents\\WeChat Files\\*\\FileStorage\\Image" "%userprofile%\\Documents\\WeChat Files\\*\\FileStorage\\File" "%userprofile%\\Documents\\WeChat Files\\*\\FileStorage\\Video" >nul 2>&1\n';
        script += 'echo 完成\necho.\n';
    }

    script += 'echo =====全部清理完毕=====\npause>nul';

    navigator.clipboard.writeText(script).then(()=>{
        document.getElementById('tip').innerText='✅脚本复制成功，去桌面新建bat文件';
    }).catch(()=>{
        document.getElementById('tip').innerText='❌复制失败，手动复制代码';
    })
})