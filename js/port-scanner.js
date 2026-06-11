// Port Scanner (имитация для демо)
let scanning = false;
let currentPorts = [];

function parsePorts(portsStr) {
    const ports = [];
    const parts = portsStr.split(',');
    for (const part of parts) {
        const trimmed = part.trim();
        if (trimmed.includes('-')) {
            const [start, end] = trimmed.split('-').map(Number);
            for (let i = start; i <= end; i++) ports.push(i);
        } else {
            ports.push(Number(trimmed));
        }
    }
    return ports.filter(p => !isNaN(p) && p > 0 && p < 65536);
}

function initPortScanner() {
    const targetInput = document.getElementById('target');
    const scanBtn = document.getElementById('scanBtn');
    const stopBtn = document.getElementById('stopBtn');
    const resultDiv = document.getElementById('scanResult');
    const progressSpan = document.getElementById('progress');
    const openSpan = document.getElementById('openCount');
    const closedSpan = document.getElementById('closedCount');
    
    if (!scanBtn) return;
    
    scanBtn.onclick = () => {
        const target = targetInput.value.trim();
        if (!target) {
            alert('Введите IP или домен');
            return;
        }
        
        // Для демо показываем случайные результаты
        const ports = [22, 80, 443, 8080, 3306, 3389];
        scanning = true;
        let openPorts = [];
        
        resultDiv.innerHTML = `🔍 Сканирование ${target}...\n`;
        progressSpan.innerText = '0%';
        openSpan.innerText = '0';
        closedSpan.innerText = '0';
        
        ports.forEach((port, idx) => {
            setTimeout(() => {
                if (!scanning) return;
                const isOpen = Math.random() > 0.7;
                const percent = Math.round(((idx + 1) / ports.length) * 100);
                progressSpan.innerText = `${percent}%`;
                
                if (isOpen) {
                    openPorts.push(port);
                    resultDiv.innerHTML += `[+] Порт ${port} ОТКРЫТ\n`;
                } else {
                    resultDiv.innerHTML += `[-] Порт ${port} ЗАКРЫТ\n`;
                }
                openSpan.innerText = openPorts.length;
                closedSpan.innerText = ports.length - openPorts.length;
                
                if (idx === ports.length - 1) {
                    resultDiv.innerHTML += `\n✅ Сканирование завершено. Открыто: ${openPorts.length}, Закрыто: ${ports.length - openPorts.length}`;
                    scanning = false;
                }
            }, idx * 500);
        });
    };
    
    if (stopBtn) {
        stopBtn.onclick = () => {
            scanning = false;
            resultDiv.innerHTML += `\n⏹ Сканирование остановлено пользователем.`;
        };
    }
}

document.addEventListener('DOMContentLoaded', initPortScanner);
