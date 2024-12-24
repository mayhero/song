class UIHandler {
    constructor() {
        // 登录注册按钮
        this.loginBtn = document.getElementById('loginBtn');
        this.signupBtn = document.getElementById('signupBtn');

        // 上传相关
        this.uploadArea = document.getElementById('uploadArea');
        this.fileInput = document.getElementById('fileInput');
        this.previewContainer = document.getElementById('previewContainer');
        this.imagePreview = document.getElementById('imagePreview');

        // 生成相关
        this.generateBtn = document.getElementById('generateBtn');
        this.regenerateBtn = document.getElementById('regenerateBtn');
        this.downloadBtn = document.getElementById('downloadBtn');

        // 描述词相关
        this.promptInput = document.getElementById('promptInput');
        this.promptTags = document.getElementById('promptTags');
        this.commonPrompts = document.getElementById('commonPrompts');

        // 登录注册相关
        this.loginModal = document.getElementById('loginModal');
        this.signupModal = document.getElementById('signupModal');
        this.loginUsername = document.getElementById('loginUsername');
        this.loginPassword = document.getElementById('loginPassword');
        this.signupUsername = document.getElementById('signupUsername');
        this.signupPassword = document.getElementById('signupPassword');
        this.confirmPassword = document.getElementById('confirmPassword');
        this.confirmLogin = document.getElementById('confirmLogin');
        this.cancelLogin = document.getElementById('cancelLogin');
        this.confirmSignup = document.getElementById('confirmSignup');
        this.cancelSignup = document.getElementById('cancelSignup');

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // 登录注册按钮
        this.loginBtn?.addEventListener('click', () => {
            this.loginModal.classList.remove('hidden');
        });

        this.signupBtn?.addEventListener('click', () => {
            this.signupModal.classList.remove('hidden');
        });

        // 上传区域
        this.uploadArea?.addEventListener('click', () => {
            this.fileInput.click();
        });

        this.fileInput?.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.imagePreview.src = e.target.result;
                    this.previewContainer.classList.remove('hidden');
                };
                reader.readAsDataURL(file);
            }
        });

        // 生成按钮
        this.generateBtn?.addEventListener('click', () => {
            // 检查是否有API密钥
            if (!window.CONFIG.getApiKey()) {
                alert('请先设置API密钥');
                return;
            }
            alert('开始生成...');
        });

        // 描述词标签
        this.commonPrompts?.addEventListener('click', (e) => {
            if (e.target.classList.contains('prompt-tag')) {
                const tag = document.createElement('span');
                tag.className = 'prompt-tag removable';
                tag.textContent = e.target.textContent;
                this.promptTags.appendChild(tag);
            }
        });

        this.promptTags?.addEventListener('click', (e) => {
            if (e.target.classList.contains('removable')) {
                e.target.remove();
            }
        });

        // 登录对话框
        this.confirmLogin?.addEventListener('click', () => {
            const username = this.loginUsername.value.trim();
            const password = this.loginPassword.value;
            if (!username || !password) {
                alert('请填写用户名和密码');
                return;
            }
            // TODO: 调用登录API
            alert('登录成功');
            this.loginModal.classList.add('hidden');
            this.loginUsername.value = '';
            this.loginPassword.value = '';
        });

        this.cancelLogin?.addEventListener('click', () => {
            this.loginModal.classList.add('hidden');
            this.loginUsername.value = '';
            this.loginPassword.value = '';
        });

        // 注册对话框
        this.confirmSignup?.addEventListener('click', () => {
            const username = this.signupUsername.value.trim();
            const password = this.signupPassword.value;
            const confirm = this.confirmPassword.value;
            if (!username || !password || !confirm) {
                alert('请填写所有字段');
                return;
            }
            if (password !== confirm) {
                alert('两次输入的密码不一致');
                return;
            }
            // TODO: 调用注册API
            alert('注册成功');
            this.signupModal.classList.add('hidden');
            this.signupUsername.value = '';
            this.signupPassword.value = '';
            this.confirmPassword.value = '';
        });

        this.cancelSignup?.addEventListener('click', () => {
            this.signupModal.classList.add('hidden');
            this.signupUsername.value = '';
            this.signupPassword.value = '';
            this.confirmPassword.value = '';
        });
    }
}

// 初始化UI处理器
document.addEventListener('DOMContentLoaded', () => {
    window.uiHandler = new UIHandler();
}); 