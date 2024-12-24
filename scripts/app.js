class ImageApp {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
    }

    initializeElements() {
        this.fileInput = document.querySelector('input[type="file"]');
        this.dropZone = document.querySelector('.border-dashed');
        this.generateButton = document.querySelector('.bg-indigo-600');
        this.styleSelect = document.querySelector('select');
        this.promptInput = document.querySelector('textarea');
        this.similarityRange = document.querySelector('input[type="range"]');
    }

    initializeEventListeners() {
        // 文件拖放
        this.dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.dropZone.classList.add('border-indigo-500', 'bg-indigo-50');
        });

        this.dropZone.addEventListener('dragleave', () => {
            this.dropZone.classList.remove('border-indigo-500', 'bg-indigo-50');
        });

        this.dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.dropZone.classList.remove('border-indigo-500', 'bg-indigo-50');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                this.handleImageUpload(file);
            }
        });

        // 点击上传
        this.dropZone.addEventListener('click', () => {
            this.fileInput.click();
        });

        this.fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                this.handleImageUpload(file);
            }
        });

        // 生成按钮
        this.generateButton.addEventListener('click', () => {
            this.generateImage();
        });
    }

    handleImageUpload(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            // 显示预览图
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'max-h-48 mx-auto';
            this.dropZone.innerHTML = '';
            this.dropZone.appendChild(img);
        };
        reader.readAsDataURL(file);
    }

    generateImage() {
        const params = {
            prompt: this.promptInput.value,
            style: this.styleSelect.value,
            similarity: this.similarityRange.value
        };
        
        // TODO: 调用API生成图像
        console.log('Generating image with params:', params);
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ImageApp();
}); 