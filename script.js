document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('seo-form');
    const urlInput = document.getElementById('url-input');
    const submitButton = document.getElementById('submit-button');
    const responseMessage = document.getElementById('response-message');

    // ¡¡¡IMPORTANTE!!! Reemplaza esto con la URL de tu webhook de n8n
    const N8N_WEBHOOK_URL = 'https://n8n.srv867589.hstgr.cloud/webhook/mia-seo';

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional

        // Deshabilitar el botón para evitar envíos múltiples
        submitButton.disabled = true;
        submitButton.textContent = 'Analizando...';
        responseMessage.innerHTML = ''; // Limpiar mensajes anteriores
        responseMessage.className = '';

        const urlToAnalyze = urlInput.value;

        // Enviar la petición a n8n
        fetch(N8N_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: urlToAnalyze }),
        })
        .then(response => {
            if (response.ok) {
                // Si n8n responde con éxito (código 2xx)
                responseMessage.textContent = '¡Análisis en proceso! Revisa tu email y/o Telegram para ver los resultados.';
                responseMessage.className = 'success';
                form.reset(); // Limpia el campo del formulario
            } else {
                // Si n8n responde con un error
                throw new Error('El servidor respondió con un error.');
            }
        })
        .catch(error => {
            console.error('Error al enviar la petición:', error);
            responseMessage.textContent = 'Ocurrió un error al intentar iniciar el análisis. Por favor, inténtalo de nuevo.';
            responseMessage.className = 'error';
        })
        .finally(() => {
            // Volver a habilitar el botón después de que todo termine
            submitButton.disabled = false;
            submitButton.textContent = 'Analizar';
        });
    });
});
