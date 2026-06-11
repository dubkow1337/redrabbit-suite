// Переключение вкладок с анимацией
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.dataset.tab;
        
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        const activeTab = document.getElementById(tabId);
        activeTab.classList.add('active');
        
        // Небольшая анимация появления
        activeTab.style.animation = 'none';
        setTimeout(() => {
            activeTab.style.animation = 'fadeIn 0.3s ease';
        }, 10);
    });
});
