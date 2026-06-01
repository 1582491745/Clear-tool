document.addEventListener('DOMContentLoaded', function() {
    const generateBtn = document.getElementById('generateBtn');
    const tipBox = document.getElementById('tipBox');
    const guideBtn = document.getElementById('guideBtn');
    const guideModal = document.getElementById('guideModal');
    const closeBtn = document.querySelector('.close');

    // 生成脚本并复制
    generateBtn.addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const selected = Array.from(checkboxes).map(cb => cb.value);

        let code = "@echo off\nchcp 65001\necho 正在安全清理...\n\n";

        if (selected.includes("temp")) {
            code += "del /q /f /s %temp%\\* >nul 2>nul\necho 清理系统临时文件完成\n";
        }
        if (selected.includes("recycle")) {
            code += "rd /s /q C:\\$Recycle.Bin >nul 2>nul\necho 清空回收站完成\n";
        }
        if (selected.includes("qq")) {
            code += "forfiles /p \"%userprofile%\\Documents\\Tencent Files\" /s /d -180 /c \"cmd /c del /f @path\" >nul 2>nul\necho 清理QQ6个月前缓存完成\n";
        }
        if (selected.includes("wechat")) {
            code += "forfiles /p \"%userprofile%\\Documents\\WeChat Files\" /s /d -180 /c \"cmd /c del /f @path\" >nul 2>nul\necho 清理微信过期文件完成\n";
        }
        if (selected.includes("hiber")) {
            code += "powercfg -h off >nul 2>nul\necho 关闭休眠，释放16GB空间完成\n";
        }

        code += "\necho ✅ 全部清理完成！\npause\n";

        // 复制到剪贴板
        navigator.clipboard.writeText(code).then(() => {
            tipBox.style.display = "block";
            setTimeout(() => {
                tipBox.style.display = "none";
            }, 5000);
            alert("脚本已复制！\n去电脑粘贴 → 保存为.bat → 右键管理员运行");
        }).catch(err => {
            alert("复制失败，请手动复制下面的脚本：\n" + code);
        });
    });

    // 教程弹窗
    guideBtn.addEventListener('click', function() {
        guideModal.style.display = "block";
    });
    closeBtn.addEventListener('click', function() {
        guideModal.style.display = "none";
    });
    window.addEventListener('click', function(event) {
        if (event.target === guideModal) {
            guideModal.style.display = "none";
        }
    });
});