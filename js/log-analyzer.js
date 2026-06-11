// Log Analyzer
function initLogAnalyzer() {
    const fileInput = document.getElementById('fileInput');
    const uploadArea = document.getElementById('uploadArea');
    const uploadBtn = document.getElementById('uploadBtn');
    const resultDiv = document.getElementById('logResult');
    const logStats = document.getElementById('logStats');
    const totalIPsSpan = document.getElementById('totalIPs');
    const totalAttemptsSpan = document.getElementById('totalAttempts');
    
    if (!uploadArea) return;
    
    function analyzeLog(content) {
        const lines = content.split('\n');
        const attacks = {};
        const ipPattern = /\b(?:\d{1,3}\.){3}\d{1,3}\b/;
        
        for (const line of lines) {
            const ipMatch = line.match(ipPattern);
            if (!ipMatch) continue;
            const ip = ipMatch[0];
            if (!line.toLowerCase().includes('failed password')) continue;
            
            if (!attacks[ip]) attacks[ip] = 0;
            attacks[ip]++;
        }
        
        const sorted = Object.entries(attacks).sort((a, b) => b[1] - a[1]);
        const totalIPs = sorted.length;
        const totalAttempts = Object.values(attacks).reduce((a, b) => a + b, 0);
        
        totalIPsSpan.innerText = totalIPs;
        totalAttemptsSpan.innerText = totalAttempts;
        logStats.style.display = 'flex';
        
        if (sorted.length === 0) {
            resultDiv.innerHTML = '✅ Не найдено подозрительных IP (попыток брутфорса нет)';
            return;
        }
        
        let html = '🔴 <strong>Атакующие IP:</strong><br><br>';
        for (const [ip, count] of sorted.slice(0, 20)) {
            let severity = count > 50 ? '🔴 CRITICAL' : (count > 20 ? '🟠 HIGH' : '🟡 MEDIUM');
            html += `${severity} ${ip} — ${count} попыток\n`;
        }
        resultDiv.innerHTML = html;
    }
    
    function handleFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => analyzeLog(e.target.result);
        reader.readAsText(file);
    }
    
    uploadArea.onclick = () => fileInput.click();
    if (uploadBtn) uploadBtn.onclick = () => fileInput.click();
    
    fileInput.onchange = (e) => {
        if (e.target.files[0]) handleFile(e.target.files[0]);
    };
    
    uploadArea.ondragover = (e) => e.preventDefault();
    uploadArea.ondrop = (e) => {
        e.preventDefault();
        if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
    };
}

document.addEventListener('DOMContentLoaded', initLogAnalyzer);
