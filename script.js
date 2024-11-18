document.getElementById('uploadForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const fileInput = document.getElementById('imageInput');
    const formatSelect = document.getElementById('formatSelect');
    const output = document.getElementById('output');

    if (!fileInput.files.length) {
        alert("Please upload an image.");
        return;
    }

    const file = fileInput.files[0];
    const format = formatSelect.value;
    const reader = new FileReader();

    reader.onload = async function (event) {
        const imageUrl = event.target.result;
        const convertedImageUrl = await convertImage(imageUrl, format);
        output.innerHTML = `<a href="${convertedImageUrl}" download="converted.${format}">Download Converted Image</a>`;
    };
    reader.readAsDataURL(file);
});

async function convertImage(imageUrl, format) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    return new Promise((resolve) => {
        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            const convertedUrl = canvas.toDataURL(`image/${format}`);
            resolve(convertedUrl);
        };
        img.src = imageUrl;
    });
}
