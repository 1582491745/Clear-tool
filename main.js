const genBtn = document.getElementById('genBtn');
const tip = document.getElementById('tip');

// 生成 BAT 脚本
function generateScript() {
    const sysTemp = document.getElementById('sysTemp').checked;
    const recycle = document.getElementById('recycle').checked;
    const downloads = document.getElementById('downloads').checked;
    const qqCache = document.getElementById('qqCache').checked;
    const wechatCache = document.getElementById('wechatCache').checked;

    let lines = [
        '@echo off',
        'title 电脑安全清理助手',
        'color 0A',
        'echo.',
        'echo ====================== 开始清理 ======================',
        'echo.'
    ];

    // 系统临时文件
    if (sysTemp) {
        lines.push('echo 正在清理系统临时文件...');
        lines.push('del /f /s /q %temp%\\*');
        lines.push('rd /s /q %temp%');
        lines.push('md %temp%');
        lines.push('echo 系统临时文件清理完成');
        lines.push('echo.');
    }

    // 回收站
    if (recycle) {
        lines.push('echo 正在清空回收站...');
        lines.push('rd /s /q C:\\$Recycle.Bin');
        lines.push('echo 回收站已清空');
        lines.push('echo.');
    }

    // 下载文件夹
    if (downloads) {
        lines.push('echo 正在清理下载文件夹安装包/压缩包...');
        lines.push('del /f /s /q "%userprofile%\\Downloads\\*.exe"');
        lines.push('del /f /s /q "%userprofile%\\Downloads\\*.zip"');
        lines.push('del /f /s /q "%userprofile%\\Downloads\\*.rar"');
        lines.push('del /f /s /q "%userprofile%\\Downloads\\*.7z"');
        lines.push('del /f /s /q "%userprofile%\\Downloads\\*.msi"');
        lines.push('echo 下载文件夹清理完成');
        lines.push('echo.');
    }

    // QQ 6个月以上图片视频（简单路径，不写复杂ID）
    if (qqCache) {
        lines.push('echo 正在清理QQ 6个月以上图片/视频/缓存...');
        lines.push('forfiles /p "%userprofile%\\Documents\\Tencent Files\\*\\Image" /s /m *.* /d -180 /c "cmd /c del @path"');
        lines.push('forfiles /p "%userprofile%\\Documents\\Tencent Files\\*\\Video" /s /m *.* /d -180 /c "cmd /c del @path"');
        lines.push('echo QQ 6个月以上文件清理完成');
        lines.push('echo.');
    }

    // 微信 6个月以上图片视频
    if (wechatCache) {
        lines.push('echo 正在清理微信 6个月以上图片/视频/缓存...');
        lines.push('forfiles /p "%userprofile%\\Documents\\WeChat Files\\*\\FileStorage\\Image" /s /m *.* /d -180 /c "cmd /c del @path"');
        lines.push('forfiles /p "%userprofile%\\Documents\\WeChat Files\\*\\FileStorage\\Video" /s /m *.* /d -180 /c "cmd /c del @path"');
        lines.push('echo 微信 6个月以上文件清理完成');
        lines.push('echo.');
    }

    lines.push('echo ====================== 清理完成 ======================');
    lines.push('pause');

    return lines.join('\r\n');
}

// 复制函数（兼容 http + 所有浏览器）
function copyToClipboard(text) {
    // 方法1：现代浏览器 Clipboard API（优先）
    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text);
    }

    // 方法2：降级到 textarea 兼容 http / 旧浏览器
    return new Promise((resolve, reject) => {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            resolve(true);
        } catch (e) {
            reject(e);
        }
        document.body.removeChild(textarea);
    });
}

// 按钮点击事件
genBtn.addEventListener('click', async () => {
    const script = generateScript();
    tip.textContent = '';

    try {
        await copyToClipboard(script);
        tip.textContent = '✅ 脚本已复制！去桌面新建 .bat 管理员运行即可';
        tip.style.color = '#009933';
    } catch (err) {
        tip.textContent = '❌ 复制失败，请手动复制下面代码';
        tip.style.color = 'red';
        console.error(err);
    }
});
