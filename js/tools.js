// Общая утилита для копирования в буфер
function copyToClipboard(text, btnElement) {
    navigator.clipboard.writeText(text);
    const original = btnElement.innerHTML;
    btnElement.innerHTML = '✅ Скопировано!';
    setTimeout(() => btnElement.innerHTML = original, 2000);
}
