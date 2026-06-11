// Firewall Builder с неоновой темой
function initFirewall() {
    const action = document.getElementById('action');
    const protocol = document.getElementById('protocol');
    const port = document.getElementById('port');
    const srcIp = document.getElementById('src_ip');
    const dstIp = document.getElementById('dst_ip');
    const iface = document.getElementById('iface');
    const output = document.getElementById('firewallOutput');
    
    const genIptables = document.getElementById('genIptables');
    const genNftables = document.getElementById('genNftables');
    const clearBtn = document.getElementById('clearOutput');
    
    function getValues() {
        return {
            action: action.value,
            protocol: protocol.value,
            port: port.value.trim(),
            src_ip: srcIp.value.trim(),
            dst_ip: dstIp.value.trim(),
            iface: iface.value.trim()
        };
    }
    
    function generateIptables() {
        const v = getValues();
        let cmd = `iptables -A INPUT `;
        if (v.iface) cmd += `-i ${v.iface} `;
        if (v.protocol !== 'all') cmd += `-p ${v.protocol} `;
        if (v.src_ip) cmd += `-s ${v.src_ip} `;
        if (v.dst_ip) cmd += `-d ${v.dst_ip} `;
        if (v.port && v.protocol !== 'icmp' && v.protocol !== 'all') {
            if (v.port.includes(',')) cmd += `-m multiport --dports ${v.port} `;
            else cmd += `--dport ${v.port} `;
        }
        cmd += `-j ${v.action}`;
        output.innerHTML = `🟢 ${cmd}\n\n💡 Совет: правила iptables живут до перезагрузки. Для сохранения используй iptables-persistent.`;
    }
    
    function generateNftables() {
        const v = getValues();
        let cmd = `nft add rule ip filter INPUT `;
        if (v.iface) cmd += `iif ${v.iface} `;
        if (v.src_ip) cmd += `ip saddr ${v.src_ip} `;
        if (v.dst_ip) cmd += `ip daddr ${v.dst_ip} `;
        if (v.protocol !== 'all') cmd += `${v.protocol} `;
        if (v.port && v.protocol !== 'icmp' && v.protocol !== 'all') {
            if (v.port.includes(',')) cmd += `dport { ${v.port.split(',').join(', ')} } `;
            else if (v.port.includes('-')) cmd += `dport ${v.port} `;
            else cmd += `dport ${v.port} `;
        }
        cmd += v.action.toLowerCase();
        output.innerHTML = `🟢 ${cmd}\n\n💡 Совет: nftables — современная замена iptables. Просмотр правил: nft list ruleset`;
    }
    
    if (genIptables) genIptables.onclick = generateIptables;
    if (genNftables) genNftables.onclick = generateNftables;
    if (clearBtn) clearBtn.onclick = () => output.innerHTML = '# Здесь появится команда...';
}

document.addEventListener('DOMContentLoaded', initFirewall);
