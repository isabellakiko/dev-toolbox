/**
 * =====================================================
 * 开发者工具箱 - JavaScript核心功能
 * 作者: Stephen Chan
 * 版本: v1.0.0
 * 描述: 现代ES6+实现，包含所有工具功能
 * =====================================================
 */

class DevToolbox {
    constructor() {
        this.currentTool = 'guid-generator';
        this.history = this.loadHistory();
        this.isHistoryOpen = false;
        this.theme = localStorage.getItem('dev-toolbox-theme') || 'dark';
        
        this.init();
    }

    /**
     * 初始化应用
     */
    init() {
        this.bindEvents();
        this.initTheme();
        this.updateCurrentTime();
        this.setCurrentTimeInterval();
        console.log('🛠️ 开发者工具箱已初始化');
    }

    /**
     * 绑定事件处理器
     */
    bindEvents() {
        // 导航事件
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const tool = item.dataset.tool;
                this.switchTool(tool);
            });
        });

        // 主题切换
        document.getElementById('themeToggle')?.addEventListener('click', () => {
            this.toggleTheme();
        });

        // 历史记录
        document.getElementById('historyToggle')?.addEventListener('click', () => {
            this.toggleHistory();
        });

        document.getElementById('closeHistory')?.addEventListener('click', () => {
            this.toggleHistory();
        });

        document.getElementById('clearHistory')?.addEventListener('click', () => {
            this.clearHistory();
        });

        // 侧边栏切换
        document.getElementById('sidebarToggle')?.addEventListener('click', () => {
            this.toggleSidebar();
        });

        // GUID生成器事件
        document.getElementById('generateGuid')?.addEventListener('click', () => {
            this.generateGuid();
        });

        document.getElementById('copyAllGuids')?.addEventListener('click', () => {
            this.copyAllGuids();
        });

        // 密码生成器事件
        document.getElementById('passwordLength')?.addEventListener('input', (e) => {
            document.getElementById('passwordLengthValue').textContent = e.target.value;
        });

        document.getElementById('generatePassword')?.addEventListener('click', () => {
            this.generatePassword();
        });

        // 随机数据生成器事件
        document.querySelectorAll('#random-data .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchRandomDataTab(e.target.dataset.tab);
            });
        });

        document.getElementById('generateNumbers')?.addEventListener('click', () => {
            this.generateRandomNumbers();
        });

        document.getElementById('generateStrings')?.addEventListener('click', () => {
            this.generateRandomStrings();
        });

        document.getElementById('generateColors')?.addEventListener('click', () => {
            this.generateRandomColors();
        });

        document.getElementById('generateNetwork')?.addEventListener('click', () => {
            this.generateNetworkData();
        });

        document.getElementById('copyRandomData')?.addEventListener('click', () => {
            this.copyRandomData();
        });

        // 哈希/编码工具事件
        document.querySelectorAll('#hash-encode .button-group button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.processHashEncode(action);
            });
        });

        document.getElementById('copyHashResult')?.addEventListener('click', () => {
            this.copyHashResult();
        });

        // 时间戳转换器事件
        document.querySelectorAll('#timestamp .tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTimestampTab(e.target.dataset.tab);
            });
        });

        document.getElementById('convertTimestamp')?.addEventListener('click', () => {
            this.convertTimestampToDate();
        });

        document.getElementById('convertDate')?.addEventListener('click', () => {
            this.convertDateToTimestamp();
        });

        document.getElementById('refreshTime')?.addEventListener('click', () => {
            this.updateCurrentTime();
        });

        document.getElementById('copyTimeResult')?.addEventListener('click', () => {
            this.copyTimeResult();
        });

        // 文本处理工具事件
        document.querySelectorAll('#text-tools .button-group button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.dataset.action;
                this.processText(action);
            });
        });

        document.getElementById('copyTextResult')?.addEventListener('click', () => {
            this.copyTextResult();
        });

        // 键盘快捷键
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });

        // 点击外部关闭历史面板
        document.addEventListener('click', (e) => {
            if (this.isHistoryOpen && !e.target.closest('.history-panel') && !e.target.closest('#historyToggle')) {
                this.toggleHistory();
            }
        });
    }

    /**
     * 切换工具
     */
    switchTool(tool) {
        // 更新导航状态
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-tool="${tool}"]`).classList.add('active');

        // 切换工具界面
        document.querySelectorAll('.tool-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(tool).classList.add('active');

        this.currentTool = tool;
    }

    /**
     * 主题切换
     */
    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.body.className = `${this.theme}-theme`;
        localStorage.setItem('dev-toolbox-theme', this.theme);
        
        const icon = document.querySelector('#themeToggle i');
        icon.className = this.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        
        this.showNotification('主题已切换', 'success');
    }

    /**
     * 初始化主题
     */
    initTheme() {
        document.body.className = `${this.theme}-theme`;
        const icon = document.querySelector('#themeToggle i');
        icon.className = this.theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    /**
     * 切换历史记录面板
     */
    toggleHistory() {
        const panel = document.getElementById('historyPanel');
        this.isHistoryOpen = !this.isHistoryOpen;
        
        if (this.isHistoryOpen) {
            panel.classList.add('open');
            this.renderHistory();
        } else {
            panel.classList.remove('open');
        }
    }

    /**
     * 切换侧边栏
     */
    toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('open');
    }

    /**
     * =====================================================
     * GUID/UUID生成器功能
     * =====================================================
     */
    generateGuid() {
        const version = document.getElementById('guidVersion').value;
        const format = document.getElementById('guidFormat').value;
        const count = parseInt(document.getElementById('guidCount').value);
        
        const guids = [];
        for (let i = 0; i < count; i++) {
            let guid = this.createGuid(version);
            guid = this.formatGuid(guid, format);
            guids.push(guid);
        }
        
        this.displayGuids(guids);
        this.addToHistory('GUID生成', guids.join('\n'));
    }

    createGuid(version = 'v4') {
        switch (version) {
            case 'v1':
                return this.generateGuidV1();
            case 'v4':
                return this.generateGuidV4();
            case 'v5':
                return this.generateGuidV5();
            default:
                return this.generateGuidV4();
        }
    }

    generateGuidV4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    generateGuidV1() {
        // 简化的v1实现（基于时间戳）
        const now = Date.now();
        const timeHex = now.toString(16).padStart(12, '0');
        const randomHex = Math.random().toString(16).substr(2, 16);
        
        return `${timeHex.substr(0, 8)}-${timeHex.substr(8, 4)}-1${timeHex.substr(12, 3)}-${randomHex.substr(0, 4)}-${randomHex.substr(4, 12)}`;
    }

    generateGuidV5() {
        // 简化的v5实现
        const namespace = 'dev-toolbox';
        const name = Date.now().toString();
        const hash = this.simpleHash(namespace + name);
        
        return `${hash.substr(0, 8)}-${hash.substr(8, 4)}-5${hash.substr(12, 3)}-${hash.substr(16, 4)}-${hash.substr(20, 12)}`;
    }

    formatGuid(guid, format) {
        switch (format) {
            case 'simple':
                return guid.replace(/-/g, '');
            case 'uppercase':
                return guid.toUpperCase();
            case 'braces':
                return `{${guid}}`;
            default:
                return guid;
        }
    }

    displayGuids(guids) {
        const output = document.getElementById('guidOutput');
        output.innerHTML = '';
        
        guids.forEach(guid => {
            const item = this.createOutputItem(guid);
            output.appendChild(item);
        });
    }

    copyAllGuids() {
        const guids = Array.from(document.querySelectorAll('#guidOutput .output-value'))
            .map(el => el.textContent)
            .join('\n');
        
        this.copyToClipboard(guids);
    }

    /**
     * =====================================================
     * 密码生成器功能
     * =====================================================
     */
    generatePassword() {
        const length = parseInt(document.getElementById('passwordLength').value);
        const includeUppercase = document.getElementById('includeUppercase').checked;
        const includeLowercase = document.getElementById('includeLowercase').checked;
        const includeNumbers = document.getElementById('includeNumbers').checked;
        const includeSpecial = document.getElementById('includeSpecial').checked;
        const excludeAmbiguous = document.getElementById('excludeAmbiguous').checked;
        const count = parseInt(document.getElementById('passwordCount').value);
        
        let charset = '';
        if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (includeNumbers) charset += '0123456789';
        if (includeSpecial) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        
        if (excludeAmbiguous) {
            charset = charset.replace(/[0oO1lI]/g, '');
        }
        
        if (!charset) {
            this.showNotification('请至少选择一种字符类型', 'warning');
            return;
        }
        
        const passwords = [];
        for (let i = 0; i < count; i++) {
            let password = '';
            for (let j = 0; j < length; j++) {
                password += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            passwords.push(password);
        }
        
        this.displayPasswords(passwords);
        this.updatePasswordStrength(passwords[0]);
        this.addToHistory('密码生成', passwords.join('\n'));
    }

    displayPasswords(passwords) {
        const output = document.getElementById('passwordOutput');
        output.innerHTML = '';
        
        passwords.forEach(password => {
            const item = this.createOutputItem(password);
            output.appendChild(item);
        });
    }

    updatePasswordStrength(password) {
        const strengthEl = document.getElementById('passwordStrength');
        const strength = this.calculatePasswordStrength(password);
        
        strengthEl.innerHTML = `
            <div class="strength-bar strength-${strength.level}">
                <div class="strength-fill"></div>
            </div>
            <span>强度: ${strength.text}</span>
        `;
    }

    calculatePasswordStrength(password) {
        let score = 0;
        
        // 长度分数
        if (password.length >= 8) score += 1;
        if (password.length >= 12) score += 1;
        if (password.length >= 16) score += 1;
        
        // 字符类型分数
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/\d/.test(password)) score += 1;
        if (/[^a-zA-Z\d]/.test(password)) score += 1;
        
        // 复杂度分数
        if (password.length > 8 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password)) score += 1;
        
        if (score <= 2) return { level: 'weak', text: '弱' };
        if (score <= 4) return { level: 'medium', text: '中等' };
        if (score <= 6) return { level: 'strong', text: '强' };
        return { level: 'very-strong', text: '非常强' };
    }

    /**
     * =====================================================
     * 随机数据生成器功能
     * =====================================================
     */
    switchRandomDataTab(tab) {
        // 切换标签
        document.querySelectorAll('#random-data .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`#random-data [data-tab="${tab}"]`).classList.add('active');
        
        document.querySelectorAll('#random-data .tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tab).classList.add('active');
    }

    generateRandomNumbers() {
        const min = parseInt(document.getElementById('numberMin').value);
        const max = parseInt(document.getElementById('numberMax').value);
        const count = parseInt(document.getElementById('numberCount').value);
        
        if (min >= max) {
            this.showNotification('最小值必须小于最大值', 'warning');
            return;
        }
        
        const numbers = [];
        for (let i = 0; i < count; i++) {
            numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        
        this.displayRandomData(numbers);
        this.addToHistory('随机数字', numbers.join(', '));
    }

    generateRandomStrings() {
        const length = parseInt(document.getElementById('stringLength').value);
        const count = parseInt(document.getElementById('stringCount').value);
        const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        
        const strings = [];
        for (let i = 0; i < count; i++) {
            let string = '';
            for (let j = 0; j < length; j++) {
                string += charset.charAt(Math.floor(Math.random() * charset.length));
            }
            strings.push(string);
        }
        
        this.displayRandomData(strings);
        this.addToHistory('随机字符串', strings.join('\n'));
    }

    generateRandomColors() {
        const format = document.getElementById('colorFormat').value;
        const count = parseInt(document.getElementById('colorCount').value);
        
        const colors = [];
        for (let i = 0; i < count; i++) {
            colors.push(this.generateRandomColor(format));
        }
        
        this.displayRandomColors(colors, format);
        this.addToHistory('随机颜色', colors.join('\n'));
    }

    generateRandomColor(format) {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        
        switch (format) {
            case 'hex':
                return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            case 'rgb':
                return `rgb(${r}, ${g}, ${b})`;
            case 'hsl':
                const h = Math.floor(Math.random() * 360);
                const s = Math.floor(Math.random() * 100);
                const l = Math.floor(Math.random() * 100);
                return `hsl(${h}, ${s}%, ${l}%)`;
            default:
                return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }
    }

    displayRandomColors(colors, format) {
        const output = document.getElementById('randomDataOutput');
        output.innerHTML = '<div class="color-preview"></div>';
        const preview = output.querySelector('.color-preview');
        
        colors.forEach(color => {
            const colorItem = document.createElement('div');
            colorItem.className = 'color-item';
            colorItem.innerHTML = `
                <div class="color-swatch" style="background-color: ${color}"></div>
                <div class="color-value">${color}</div>
            `;
            colorItem.addEventListener('click', () => {
                this.copyToClipboard(color);
            });
            preview.appendChild(colorItem);
        });
    }

    generateNetworkData() {
        const type = document.getElementById('networkType').value;
        const count = parseInt(document.getElementById('networkCount').value);
        
        const data = [];
        for (let i = 0; i < count; i++) {
            switch (type) {
                case 'ip':
                    data.push(this.generateRandomIP());
                    break;
                case 'mac':
                    data.push(this.generateRandomMAC());
                    break;
                case 'port':
                    data.push(this.generateRandomPort());
                    break;
            }
        }
        
        this.displayRandomData(data);
        this.addToHistory(`随机${type.toUpperCase()}`, data.join('\n'));
    }

    generateRandomIP() {
        return Array.from({length: 4}, () => Math.floor(Math.random() * 256)).join('.');
    }

    generateRandomMAC() {
        return Array.from({length: 6}, () => 
            Math.floor(Math.random() * 256).toString(16).padStart(2, '0')
        ).join(':').toUpperCase();
    }

    generateRandomPort() {
        return Math.floor(Math.random() * 65535) + 1;
    }

    displayRandomData(data) {
        const output = document.getElementById('randomDataOutput');
        output.innerHTML = '';
        
        data.forEach(item => {
            const element = this.createOutputItem(item.toString());
            output.appendChild(element);
        });
    }

    copyRandomData() {
        const data = Array.from(document.querySelectorAll('#randomDataOutput .output-value'))
            .map(el => el.textContent)
            .join('\n');
        
        this.copyToClipboard(data);
    }

    /**
     * =====================================================
     * 哈希/编码工具功能
     * =====================================================
     */
    async processHashEncode(action) {
        const input = document.getElementById('inputText').value.trim();
        if (!input) {
            this.showNotification('请输入要处理的文本', 'warning');
            return;
        }
        
        let result;
        try {
            switch (action) {
                case 'md5':
                    result = await this.md5(input);
                    break;
                case 'sha1':
                    result = await this.sha1(input);
                    break;
                case 'sha256':
                    result = await this.sha256(input);
                    break;
                case 'base64-encode':
                    result = btoa(unescape(encodeURIComponent(input)));
                    break;
                case 'base64-decode':
                    result = decodeURIComponent(escape(atob(input)));
                    break;
                case 'url-encode':
                    result = encodeURIComponent(input);
                    break;
                case 'url-decode':
                    result = decodeURIComponent(input);
                    break;
                default:
                    throw new Error('未知的处理类型');
            }
            
            this.displayHashResult(result, action);
            this.addToHistory(`${action.toUpperCase()}处理`, result);
        } catch (error) {
            this.showNotification(`处理失败: ${error.message}`, 'error');
        }
    }

    async md5(text) {
        return await this.simpleHash(text);
    }

    async sha1(text) {
        if (window.crypto && window.crypto.subtle) {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await window.crypto.subtle.digest('SHA-1', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }
        return this.simpleHash(text);
    }

    async sha256(text) {
        if (window.crypto && window.crypto.subtle) {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }
        return this.simpleHash(text);
    }

    simpleHash(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash).toString(16).padStart(8, '0');
    }

    displayHashResult(result, action) {
        const output = document.getElementById('hashOutput');
        output.innerHTML = `
            <div class="output-item">
                <div class="output-value">${result}</div>
                <button class="copy-btn" onclick="devToolbox.copyToClipboard('${result}')">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `;
    }

    copyHashResult() {
        const result = document.querySelector('#hashOutput .output-value')?.textContent;
        if (result) {
            this.copyToClipboard(result);
        }
    }

    /**
     * =====================================================
     * 时间戳转换器功能
     * =====================================================
     */
    switchTimestampTab(tab) {
        document.querySelectorAll('#timestamp .tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`#timestamp [data-tab="${tab}"]`).classList.add('active');
        
        document.querySelectorAll('#timestamp .tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(tab).classList.add('active');
    }

    convertTimestampToDate() {
        const input = document.getElementById('timestampInput').value.trim();
        const unit = document.getElementById('timestampUnit').value;
        
        if (!input) {
            this.showNotification('请输入时间戳', 'warning');
            return;
        }
        
        let timestamp = parseInt(input);
        if (isNaN(timestamp)) {
            this.showNotification('请输入有效的数字', 'error');
            return;
        }
        
        if (unit === 'seconds') {
            timestamp *= 1000;
        }
        
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            this.showNotification('无效的时间戳', 'error');
            return;
        }
        
        const result = {
            '标准格式': date.toString(),
            'ISO格式': date.toISOString(),
            '本地日期': date.toLocaleDateString(),
            '本地时间': date.toLocaleTimeString(),
            '完整本地时间': date.toLocaleString()
        };
        
        this.displayTimeResult(result);
        this.addToHistory('时间戳转换', JSON.stringify(result, null, 2));
    }

    convertDateToTimestamp() {
        const input = document.getElementById('dateInput').value;
        
        if (!input) {
            this.showNotification('请选择日期时间', 'warning');
            return;
        }
        
        const date = new Date(input);
        if (isNaN(date.getTime())) {
            this.showNotification('无效的日期时间', 'error');
            return;
        }
        
        const timestamp = date.getTime();
        const result = {
            '毫秒时间戳': timestamp,
            '秒时间戳': Math.floor(timestamp / 1000),
            'ISO格式': date.toISOString(),
            '标准格式': date.toString()
        };
        
        this.displayTimeResult(result);
        this.addToHistory('日期转换', JSON.stringify(result, null, 2));
    }

    updateCurrentTime() {
        const now = new Date();
        document.getElementById('currentDateTime').textContent = now.toLocaleString();
        document.getElementById('currentTimestampSeconds').textContent = Math.floor(now.getTime() / 1000);
        document.getElementById('currentTimestampMillis').textContent = now.getTime();
    }

    setCurrentTimeInterval() {
        setInterval(() => {
            if (document.getElementById('current-time').classList.contains('active')) {
                this.updateCurrentTime();
            }
        }, 1000);
    }

    displayTimeResult(result) {
        const output = document.getElementById('timeOutput');
        output.innerHTML = '';
        
        Object.entries(result).forEach(([key, value]) => {
            const item = document.createElement('div');
            item.className = 'output-item';
            item.innerHTML = `
                <div class="output-value">
                    <strong>${key}:</strong> ${value}
                </div>
                <button class="copy-btn" onclick="devToolbox.copyToClipboard('${value}')">
                    <i class="fas fa-copy"></i>
                </button>
            `;
            output.appendChild(item);
        });
    }

    copyTimeResult() {
        const results = Array.from(document.querySelectorAll('#timeOutput .output-value'))
            .map(el => el.textContent)
            .join('\n');
        
        this.copyToClipboard(results);
    }

    /**
     * =====================================================
     * 文本处理工具功能
     * =====================================================
     */
    processText(action) {
        const input = document.getElementById('textInput').value;
        if (!input.trim() && action !== 'word-count') {
            this.showNotification('请输入要处理的文本', 'warning');
            return;
        }
        
        let result;
        switch (action) {
            case 'uppercase':
                result = input.toUpperCase();
                break;
            case 'lowercase':
                result = input.toLowerCase();
                break;
            case 'capitalize':
                result = input.replace(/\b\w/g, char => char.toUpperCase());
                break;
            case 'reverse':
                result = input.split('').reverse().join('');
                break;
            case 'remove-spaces':
                result = input.replace(/\s+/g, '');
                break;
            case 'remove-duplicates':
                result = [...new Set(input.split('\n'))].join('\n');
                break;
            case 'word-count':
                result = this.getWordCount(input);
                break;
            case 'sort-lines':
                result = input.split('\n').sort().join('\n');
                break;
            default:
                this.showNotification('未知的处理类型', 'error');
                return;
        }
        
        this.displayTextResult(result, action);
        this.addToHistory(`文本${action}`, typeof result === 'string' ? result : JSON.stringify(result));
    }

    getWordCount(text) {
        const stats = {
            '字符数（含空格）': text.length,
            '字符数（不含空格）': text.replace(/\s/g, '').length,
            '单词数': text.trim() ? text.trim().split(/\s+/).length : 0,
            '行数': text.split('\n').length,
            '段落数': text.split(/\n\s*\n/).filter(p => p.trim()).length
        };
        return stats;
    }

    displayTextResult(result, action) {
        const output = document.getElementById('textOutput');
        
        if (action === 'word-count') {
            output.innerHTML = '';
            Object.entries(result).forEach(([key, value]) => {
                const item = document.createElement('div');
                item.className = 'output-item';
                item.innerHTML = `
                    <div class="output-value">
                        <strong>${key}:</strong> ${value}
                    </div>
                `;
                output.appendChild(item);
            });
        } else {
            output.innerHTML = `
                <div class="output-item">
                    <div class="output-value" style="white-space: pre-wrap;">${result}</div>
                    <button class="copy-btn" onclick="devToolbox.copyToClipboard(\`${result.replace(/`/g, '\\`')}\`)">
                        <i class="fas fa-copy"></i>
                    </button>
                </div>
            `;
        }
    }

    copyTextResult() {
        const results = Array.from(document.querySelectorAll('#textOutput .output-value'))
            .map(el => el.textContent)
            .join('\n');
        
        this.copyToClipboard(results);
    }

    /**
     * =====================================================
     * 通用工具函数
     * =====================================================
     */
    createOutputItem(value) {
        const item = document.createElement('div');
        item.className = 'output-item';
        item.innerHTML = `
            <div class="output-value">${value}</div>
            <button class="copy-btn" onclick="devToolbox.copyToClipboard('${value}')">
                <i class="fas fa-copy"></i>
            </button>
        `;
        return item;
    }

    async copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                // 降级方案
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
            this.showNotification('已复制到剪贴板', 'success');
        } catch (error) {
            this.showNotification('复制失败', 'error');
            console.error('复制失败:', error);
        }
    }

    showNotification(message, type = 'info') {
        const container = document.getElementById('notifications');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const icon = type === 'success' ? 'check-circle' : 
                    type === 'error' ? 'exclamation-circle' : 
                    type === 'warning' ? 'exclamation-triangle' : 'info-circle';
        
        notification.innerHTML = `
            <i class="fas fa-${icon}"></i>
            <span>${message}</span>
        `;
        
        container.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    /**
     * =====================================================
     * 历史记录功能
     * =====================================================
     */
    addToHistory(tool, value) {
        const item = {
            id: Date.now(),
            tool,
            value,
            timestamp: new Date().toLocaleString()
        };
        
        this.history.unshift(item);
        
        // 限制历史记录数量
        if (this.history.length > 100) {
            this.history = this.history.slice(0, 100);
        }
        
        this.saveHistory();
    }

    renderHistory() {
        const content = document.getElementById('historyContent');
        
        if (this.history.length === 0) {
            content.innerHTML = '<div class="placeholder">暂无历史记录</div>';
            return;
        }
        
        content.innerHTML = '';
        this.history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.className = 'history-item';
            historyItem.innerHTML = `
                <div class="history-item-header">
                    <div class="history-item-tool">${item.tool}</div>
                    <div class="history-item-time">${item.timestamp}</div>
                </div>
                <div class="history-item-value">${item.value}</div>
            `;
            
            historyItem.addEventListener('click', () => {
                this.copyToClipboard(item.value);
            });
            
            content.appendChild(historyItem);
        });
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
        this.renderHistory();
        this.showNotification('历史记录已清空', 'success');
    }

    loadHistory() {
        try {
            const saved = localStorage.getItem('dev-toolbox-history');
            return saved ? JSON.parse(saved) : [];
        } catch {
            return [];
        }
    }

    saveHistory() {
        try {
            localStorage.setItem('dev-toolbox-history', JSON.stringify(this.history));
        } catch (error) {
            console.error('保存历史记录失败:', error);
        }
    }

    /**
     * =====================================================
     * 键盘快捷键
     * =====================================================
     */
    handleKeyboardShortcuts(e) {
        // Ctrl/Cmd + 数字键切换工具
        if ((e.ctrlKey || e.metaKey) && e.key >= '1' && e.key <= '6') {
            e.preventDefault();
            const tools = ['guid-generator', 'password-generator', 'random-data', 'hash-encode', 'timestamp', 'text-tools'];
            const index = parseInt(e.key) - 1;
            if (tools[index]) {
                this.switchTool(tools[index]);
            }
        }
        
        // Ctrl/Cmd + H 切换历史记录
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            this.toggleHistory();
        }
        
        // Ctrl/Cmd + T 切换主题
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            this.toggleTheme();
        }
        
        // ESC 关闭面板
        if (e.key === 'Escape') {
            if (this.isHistoryOpen) {
                this.toggleHistory();
            }
        }
    }
}

// 全局实例
let devToolbox;

// DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    devToolbox = new DevToolbox();
    
    // 全局暴露copyToClipboard方法供HTML调用
    window.devToolbox = devToolbox;
});

// Service Worker注册
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}