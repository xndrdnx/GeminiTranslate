document.getElementById('translate-form').addEventListener('submit', async function(e) {
    e.preventDefault();

    const status = document.getElementById('status');
    const translateBtn = document.getElementById('translate-btn');
    const downloadBtn = document.getElementById('download-btn');
    status.textContent = 'Перевод начался...';
    translateBtn.disabled = true;

    const formData = new FormData(this);
    const pdfUpload = document.getElementById('pdf-upload').files[0];
    const pdfUrl = document.getElementById('pdf-url').value;

    if (!pdfUpload && !pdfUrl) {
        status.textContent = 'Ошибка: укажите PDF-файл или URL';
        translateBtn.disabled = false;
        return;
    }

    try {
        const response = await fetch('https://uuserrrr.pythonanywhere.com/translate', { // Замените на ваш URL
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Ошибка сервера');
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        status.textContent = 'Перевод завершен!';
        downloadBtn.disabled = false;

        downloadBtn.onclick = () => {
            const a = document.createElement('a');
            a.href = url;
            a.download = 'translated.pdf';
            a.click();
            window.URL.revokeObjectURL(url);
        };
    } catch (error) {
        status.textContent = `Ошибка: ${error.message}`;
        translateBtn.disabled = false;
    }
});
