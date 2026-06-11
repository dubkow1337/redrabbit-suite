// Общая утилита для копирования в буфер
function copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text);
    const original = btnElement.innerHTML;
    btnElement.innerHTML = '✅ Скопировано!';
    setTimeout(() => btnElement.innerHTML = original, 2000);
}

// Функция для показа спиннера на кнопке
function showSpinner(btn) {
    const originalText = btn.innerHTML;
    btn.innerHTML = '<span class="spinner"></span> ' + originalText;
    btn.disabled = true;
    return originalText;
}

// Функция для скрытия спиннера
function hideSpinner(btn, originalText) {
    btn.innerHTML = originalText;
    btn.disabled = false;
}
