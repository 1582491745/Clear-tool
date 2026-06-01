document.getElementById('showTutorial').addEventListener('click', function(){
    const box = document.getElementById('tutorial');
    box.style.display = box.style.display === 'block' ? 'none' : 'block';
});

document.getElementById('genBtn').addEventListener('click', function(){
    let script = '@echo off\n';
    script += 'title 一键安全清理脚本\n';
    script += 'echo 正在清理，请稍候...\n';
    script += 'echo.\n';

    // 1. 系统临时文件
    if (document.getElementById('sysTemp').checked) {
        script += 'echo [1/4] 清理系统临时文件...\n';
        script += 'rd /s /q %temp% >nul 2>&1\n';
        script += 'md %temp% >nul 2>&1\n';
        script += 'echo 完成\n';
        script += 'echo.\n';
    }

    // 2. 回收站
    if (document.getElementById('recycle').checked) {
        script += 'echo [2/4] 清空回收站...\n';
        script += 'rd /s /q C:\\$Recycle.Bin >nul 2>&1\n';
        script += 'echo 完成\n';
        script += 'echo.\n';
    }

    // 3. 下载文件夹清理 exe zip rar 7z msi
    if (document.getElementById('downloads').checked) {
        script += 'echo [3/4] 清理下载文件夹安装包/压缩包...\n';
        script += 'del /f /s /q "%userprofile%\\Downloads\\*.exe" >nul 2>&1\n';
        script += 'del /f /s /q "%userprofile%\\Downloads\\*.zip" >nul 2>&1\n';
        script += 'del /f /s /q "%userprofile%\\Downloads\\*.rar" >nul 2>&1\n';
        script += 'del /f /s /q "%userprofile%\\Downloads\\*.7z" >nul 2>&1\n';
        script += 'del /f /s /q "%userprofile%\\Downloads\\*.msi" >nul 2>&1\n';
        script += 'echo 完成\n';
        script += 'echo.\n';
    }

    // 4. QQ 缓存（通用路径：文档\Tencent Files）
    if (document.getElementById('qqCache').checked) {
        script += 'echo [4/4] 清理QQ缓存（图片/文件/视频）...\n';
        script += 'rd /s /q "%userprofile%\\Documents\\Tencent Files\\*\\Image" >nul 2>&1\n';
        script += 'rd /s /q "%userprofile%\\Documents\\Tencent Files\\*\\FileRecv" >nul 2>&1\n';
        script += 'rd /s /q "%userprofile%\\Documents\\Tencent Files\\*\\Video" >nul 2>&1\n';
        script += 'echo 完成\n';
        script += 'echo.\n';
    }

    // 5. 微信缓存（通用路径：文档\WeChat Files）
    if (document.getElementById('wechatCache').checked) {
        script += 'echo [4/4] 清理微信缓存（图片/文件/视频）...\n';
        script += 'rd /s /q "%userprofile%\\Documents\\WeChat Files\\*\\FileStorage\\Image" >nul 2>&1\n';
        script += 'rd /s /q "%userprofile%\\Documents\\WeChat Files\\*\\FileStorage\\File" >nul 2>&1\n';
        script += 'rd /s /q "%userprofile%\\Documents\\WeChat Files\\*\\FileStorage\\Video" >nul 2>&1\n';
        script += 'echo 完成\n';
        script += 'echo.\n';
    }

    script += 'echo ======================================\n';
    script += 'echo 清理全部完成！按任意键退出\n';
    script += 'pause >nul\n';

    // 复制到剪贴板
    navigator.clipboard.writeText(script).then(() => {
        document.getElementById('tip').innerText = '✅ 脚本已复制！去桌面保存为 clean.bat，管理员运行';
    }).catch(() => {
        document.getElementById('tip').innerText = '❌ 复制失败，请手动复制文本';
    });
});