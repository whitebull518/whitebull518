// 武学堂 - 主要JavaScript交互逻辑
// 作者: AI Assistant
// 版本: 1.0.0

/**
 * 全局变量和配置
 */
const CONFIG = {
    APP_NAME: '武学堂',
    VERSION: '1.0.0',
    API_BASE_URL: '/api',
    STORAGE_PREFIX: 'wuxuetang_',
    ANIMATION_DURATION: 300,
    SCROLL_THRESHOLD: 100
};

/**
 * 用户管理系统
 */
class UserManager {
    constructor() {
        this.currentUser = this.loadUser();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateUI();
    }

    setupEventListeners() {
        // 登录按钮
        const loginBtns = document.querySelectorAll('#loginBtn');
        loginBtns.forEach(btn => {
            btn.addEventListener('click', () => this.showLoginModal());
        });

        // 注册按钮
        const registerBtns = document.querySelectorAll('#registerBtn');
        registerBtns.forEach(btn => {
            btn.addEventListener('click', () => this.showRegisterModal());
        });

        // 退出登录按钮
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }
    }

    loadUser() {
        const userData = localStorage.getItem('currentUser');
        return userData ? JSON.parse(userData) : null;
    }

    saveUser(userData) {
        this.currentUser = userData;
        localStorage.setItem('currentUser', JSON.stringify(userData));
        this.updateUI();
    }

    updateUI() {
        const loginBtns = document.querySelectorAll('#loginBtn');
        const registerBtns = document.querySelectorAll('#registerBtn');
        const logoutBtn = document.getElementById('logoutBtn');

        if (this.currentUser) {
            // 用户已登录
            loginBtns.forEach(btn => btn.style.display = 'none');
            registerBtns.forEach(btn => btn.style.display = 'none');
            if (logoutBtn) logoutBtn.style.display = 'block';
        } else {
            // 用户未登录
            loginBtns.forEach(btn => btn.style.display = 'block');
            registerBtns.forEach(btn => btn.style.display = 'block');
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    }

    showLoginModal() {
        // 创建登录模态框
        const modal = this.createModal('登录', this.getLoginForm());
        document.body.appendChild(modal);
        
        // 添加登录表单事件监听
        const loginForm = modal.querySelector('#loginForm');
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin(modal);
        });
    }

    showRegisterModal() {
        // 创建注册模态框
        const modal = this.createModal('注册', this.getRegisterForm());
        document.body.appendChild(modal);
        
        // 添加注册表单事件监听
        const registerForm = modal.querySelector('#registerForm');
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleRegister(modal);
        });
    }

    createModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-md w-90% mx-4">
                <div class="flex items-center justify-between mb-6">
                    <h3 class="text-2xl font-bold text-gray-800">${title}</h3>
                    <button class="text-gray-400 hover:text-gray-600" onclick="this.closest('.fixed').remove()">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                ${content}
            </div>
        `;
        return modal;
    }

    getLoginForm() {
        return `
            <form id="loginForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">邮箱或手机号</label>
                    <input type="text" id="loginUsername" required 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
                    <input type="password" id="loginPassword" required 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500">
                </div>
                <div class="flex items-center justify-between">
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-2">
                        <span class="text-sm text-gray-600">记住我</span>
                    </label>
                    <a href="#" class="text-sm text-red-600 hover:text-red-800">忘记密码？</a>
                </div>
                <button type="submit" class="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                    登录
                </button>
            </form>
        `;
    }

    getRegisterForm() {
        return `
            <form id="registerForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">用户名</label>
                    <input type="text" id="registerUsername" required 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                    <input type="email" id="registerEmail" required 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">手机号</label>
                    <input type="tel" id="registerPhone" required 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">密码</label>
                    <input type="password" id="registerPassword" required 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">确认密码</label>
                    <input type="password" id="confirmPassword" required 
                           class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-red-500">
                </div>
                <div class="flex items-center">
                    <input type="checkbox" id="agreeTerms" required class="mr-2">
                    <label for="agreeTerms" class="text-sm text-gray-600">
                        我同意 <a href="#" class="text-red-600 hover:text-red-800">服务条款</a> 和 <a href="#" class="text-red-600 hover:text-red-800">隐私政策</a>
                    </label>
                </div>
                <button type="submit" class="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
                    注册
                </button>
            </form>
        `;
    }

    handleLogin(modal) {
        const username = modal.querySelector('#loginUsername').value;
        const password = modal.querySelector('#loginPassword').value;
        
        // 模拟登录验证
        if (username && password) {
            const userData = {
                id: Date.now(),
                name: username,
                email: username.includes('@') ? username : `${username}@example.com`,
                membership: 'yearly', // 默认年卡会员
                membershipStartDate: new Date().toISOString(),
                membershipEndDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
                joinDate: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            this.saveUser(userData);
            modal.remove();
            
            // 显示成功消息
            this.showNotification('登录成功！欢迎回到武学堂！', 'success');
            
            // 刷新页面以更新UI
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } else {
            this.showNotification('请填写完整的登录信息', 'error');
        }
    }

    handleRegister(modal) {
        const username = modal.querySelector('#registerUsername').value;
        const email = modal.querySelector('#registerEmail').value;
        const phone = modal.querySelector('#registerPhone').value;
        const password = modal.querySelector('#registerPassword').value;
        const confirmPassword = modal.querySelector('#confirmPassword').value;
        
        // 验证表单
        if (!username || !email || !phone || !password) {
            this.showNotification('请填写完整的注册信息', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            this.showNotification('两次输入的密码不一致', 'error');
            return;
        }
        
        // 模拟注册
        const userData = {
            id: Date.now(),
            name: username,
            email: email,
            phone: phone,
            membership: 'free', // 默认免费会员
            membershipStartDate: new Date().toISOString(),
            joinDate: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };
        
        this.saveUser(userData);
        modal.remove();
        
        // 显示成功消息
        this.showNotification('注册成功！欢迎加入武学堂！', 'success');
        
        // 刷新页面以更新UI
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        this.updateUI();
        this.showNotification('已退出登录', 'info');
        
        // 跳转到首页
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 px-6 py-3 rounded-lg text-white font-medium transform translate-x-full transition-transform duration-300`;
        
        // 根据类型设置颜色
        const colors = {
            success: 'bg-green-500',
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            info: 'bg-blue-500'
        };
        
        notification.classList.add(colors[type] || colors.info);
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // 显示动画
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // 自动隐藏
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

/**
 * 视频管理系统
 */
class VideoManager {
    constructor() {
        this.videos = this.loadVideos();
        this.watchHistory = this.loadWatchHistory();
        this.favorites = this.loadFavorites();
        this.init();
    }

    init() {
        this.setupEventListeners();
    }

    setupEventListeners() {
        // 视频播放按钮
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="playVideo"]')) {
                const videoId = this.extractVideoId(e.target.getAttribute('onclick'));
                if (videoId) this.playVideo(videoId);
            }
            
            if (e.target.matches('[onclick*="toggleFavorite"]')) {
                const videoId = this.extractVideoId(e.target.getAttribute('onclick'));
                if (videoId) this.toggleFavorite(videoId);
            }
        });
    }

    extractVideoId(onclick) {
        const match = onclick.match(/\d+/);
        return match ? parseInt(match[0]) : null;
    }

    loadVideos() {
        // 从localStorage加载视频数据，如果没有则使用默认数据
        const stored = localStorage.getItem('videos');
        if (stored) {
            return JSON.parse(stored);
        }
        
        // 默认视频数据
        return [
            {
                id: 1,
                title: "少林基本功 - 马步冲拳",
                description: "少林寺第34代传人亲自示范，从基础马步开始，掌握正宗少林功夫的基本要领。",
                image: "./resources/shaolin1.jpg",
                duration: "25:30",
                school: "shaolin",
                difficulty: "beginner",
                master: "释永信大师",
                rating: 4.9,
                views: 12500,
                isNew: false,
                isHot: true
            },
            {
                id: 2,
                title: "24式太极拳 - 起势到野马分鬃",
                description: "陈氏太极拳第12代传人详细讲解24式太极拳的前三个动作，适合初学者。",
                image: "./resources/taichi1.jpg",
                duration: "18:45",
                school: "taichi",
                difficulty: "beginner",
                master: "陈小旺大师",
                rating: 4.8,
                views: 9800,
                isNew: true,
                isHot: false
            }
            // 更多视频数据...
        ];
    }

    loadWatchHistory() {
        const stored = localStorage.getItem('watchHistory');
        return stored ? JSON.parse(stored) : [];
    }

    loadFavorites() {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    }

    playVideo(videoId) {
        const user = userManager.currentUser;
        
        if (!user) {
            userManager.showNotification('请先登录再观看视频', 'warning');
            userManager.showLoginModal();
            return;
        }
        
        // 检查用户权限
        if (!this.checkVideoPermission(user, videoId)) {
            userManager.showNotification('您的会员等级无法观看此视频', 'warning');
            setTimeout(() => {
                window.location.href = 'membership.html';
            }, 1000);
            return;
        }
        
        // 记录观看历史
        this.addToWatchHistory(videoId);
        
        // 模拟视频播放
        userManager.showNotification('正在播放视频...', 'success');
        
        // 这里可以集成实际的视频播放器
        console.log(`播放视频 ID: ${videoId}`);
    }

    checkVideoPermission(user, videoId) {
        const video = this.videos.find(v => v.id === videoId);
        if (!video) return false;
        
        // 根据会员等级检查权限
        const permissions = {
            free: [1, 2], // 免费会员只能看前2个视频
            monthly: video.id <= 50, // 月卡会员可以看前50个
            yearly: video.id <= 150, // 年卡会员可以看前150个
            lifetime: true, // 永久会员可以看全部
            vip: true // VIP可以看全部
        };
        
        return permissions[user.membership] || false;
    }

    toggleFavorite(videoId) {
        const user = userManager.currentUser;
        
        if (!user) {
            userManager.showNotification('请先登录再收藏视频', 'warning');
            userManager.showLoginModal();
            return;
        }
        
        const index = this.favorites.indexOf(videoId);
        
        if (index > -1) {
            this.favorites.splice(index, 1);
            userManager.showNotification('已取消收藏', 'info');
        } else {
            // 检查收藏数量限制
            if (user.membership === 'monthly' && this.favorites.length >= 50) {
                userManager.showNotification('月卡会员最多收藏50个视频', 'warning');
                return;
            }
            
            this.favorites.push(videoId);
            userManager.showNotification('已添加到收藏', 'success');
        }
        
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
        this.updateFavoriteButtons();
    }

    addToWatchHistory(videoId) {
        const now = new Date().toISOString();
        const existingIndex = this.watchHistory.findIndex(h => h.videoId === videoId);
        
        if (existingIndex > -1) {
            this.watchHistory[existingIndex].lastWatched = now;
            this.watchHistory[existingIndex].watchCount++;
        } else {
            this.watchHistory.push({
                videoId: videoId,
                lastWatched: now,
                watchCount: 1,
                progress: 0
            });
        }
        
        localStorage.setItem('watchHistory', JSON.stringify(this.watchHistory));
    }

    updateFavoriteButtons() {
        // 更新收藏按钮状态
        document.querySelectorAll('[onclick*="toggleFavorite"]').forEach(btn => {
            const videoId = this.extractVideoId(btn.getAttribute('onclick'));
            const isFavorite = this.favorites.includes(videoId);
            
            // 这里可以更新按钮的视觉状态
            if (isFavorite) {
                btn.classList.add('favorited');
            } else {
                btn.classList.remove('favorited');
            }
        });
    }
}

/**
 * 动画效果管理器
 */
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollReveal();
        this.setupHeroAnimations();
        this.setupHoverEffects();
    }

    setupScrollReveal() {
        // 滚动显示动画
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        // 观察所有需要动画的元素
        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    setupHeroAnimations() {
        // 主页英雄区域动画
        const heroTitle = document.getElementById('heroTitle');
        const heroSubtitle = document.getElementById('heroSubtitle');
        const heroButtons = document.getElementById('heroButtons');

        if (heroTitle && heroSubtitle && heroButtons) {
            // 使用Anime.js创建动画序列
            anime.timeline({
                easing: 'easeOutExpo',
                duration: 1000
            })
            .add({
                targets: heroTitle,
                opacity: [0, 1],
                translateY: [50, 0],
                delay: 500
            })
            .add({
                targets: heroSubtitle,
                opacity: [0, 1],
                translateY: [30, 0],
                delay: 200
            }, '-=700')
            .add({
                targets: heroButtons,
                opacity: [0, 1],
                translateY: [20, 0],
                delay: 100
            }, '-=500');
        }
    }

    setupHoverEffects() {
        // 3D悬停效果
        document.querySelectorAll('.video-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                anime({
                    targets: card,
                    rotateX: 5,
                    translateY: -8,
                    scale: 1.02,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });

            card.addEventListener('mouseleave', () => {
                anime({
                    targets: card,
                    rotateX: 0,
                    translateY: 0,
                    scale: 1,
                    duration: 300,
                    easing: 'easeOutQuad'
                });
            });
        });

        // 按钮悬停效果
        document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                anime({
                    targets: btn,
                    translateY: -2,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });

            btn.addEventListener('mouseleave', () => {
                anime({
                    targets: btn,
                    translateY: 0,
                    duration: 200,
                    easing: 'easeOutQuad'
                });
            });
        });
    }

    createInkSpreadEffect(element) {
        // 创建水墨扩散效果
        const ink = document.createElement('div');
        ink.className = 'absolute inset-0 pointer-events-none';
        ink.style.background = 'radial-gradient(circle, rgba(211,47,47,0.3), transparent)';
        ink.style.borderRadius = '50%';
        ink.style.transform = 'scale(0)';
        ink.style.transformOrigin = 'center';
        
        element.style.position = 'relative';
        element.appendChild(ink);
        
        anime({
            targets: ink,
            scale: [0, 2],
            opacity: [0.3, 0],
            duration: 600,
            easing: 'easeOutQuad',
            complete: () => {
                element.removeChild(ink);
            }
        });
    }
}

/**
 * 会员权限管理器
 */
class MembershipManager {
    constructor() {
        this.membershipTiers = {
            free: {
                name: '体验会员',
                price: 0,
                videos: 5,
                quality: '480P',
                features: ['基础视频', '有限观看次数']
            },
            monthly: {
                name: '月卡会员',
                price: 68,
                videos: 50,
                quality: '720P',
                features: ['基础视频', '无限观看', '学习进度记录']
            },
            yearly: {
                name: '年卡会员',
                price: 588,
                videos: 150,
                quality: '1080P',
                features: ['进阶视频', '完整学习系统', '无限收藏']
            },
            lifetime: {
                name: '永久会员',
                price: 1688,
                videos: Infinity,
                quality: '4K',
                features: ['全部视频', '优先更新', '专属客服']
            },
            vip: {
                name: 'VIP至尊',
                price: 2688,
                videos: Infinity,
                quality: '4K+HDR',
                features: ['独家内容', '1对1指导', '视频下载']
            }
        };
    }

    checkPermission(user, action, resource = null) {
        if (!user || !user.membership) {
            return false;
        }

        const tier = this.membershipTiers[user.membership];
        if (!tier) return false;

        switch (action) {
            case 'watch_video':
                return this.canWatchVideo(user, resource);
            case 'download_video':
                return user.membership === 'vip';
            case 'get_personal_training':
                return user.membership === 'vip';
            case 'access_premium_content':
                return ['yearly', 'lifetime', 'vip'].includes(user.membership);
            default:
                return false;
        }
    }

    canWatchVideo(user, videoId) {
        const tier = this.membershipTiers[user.membership];
        if (!tier) return false;

        // 检查会员是否过期
        if (user.membershipEndDate && new Date(user.membershipEndDate) < new Date()) {
            return false;
        }

        // 永久会员和VIP无限制
        if (['lifetime', 'vip'].includes(user.membership)) {
            return true;
        }

        // 检查视频数量限制
        return videoId <= tier.videos;
    }

    getMembershipInfo(membershipType) {
        return this.membershipTiers[membershipType] || null;
    }

    isMembershipExpired(user) {
        if (!user.membershipEndDate) return false; // 永久会员
        return new Date(user.membershipEndDate) < new Date();
    }

    getRemainingDays(user) {
        if (!user.membershipEndDate) return Infinity; // 永久会员
        const remaining = Math.ceil((new Date(user.membershipEndDate) - new Date()) / (1000 * 60 * 60 * 24));
        return Math.max(0, remaining);
    }
}

/**
 * 页面路由管理器
 */
class RouterManager {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    init() {
        this.setupNavigation();
        this.handlePageLoad();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop().replace('.html', '') || 'index';
        return page;
    }

    setupNavigation() {
        // 高亮当前页面的导航项
        const navLinks = document.querySelectorAll('nav a');
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href && href.includes(this.currentPage)) {
                link.classList.add('active');
            }
        });
    }

    handlePageLoad() {
        // 根据页面执行特定逻辑
        switch (this.currentPage) {
            case 'index':
                this.handleIndexPage();
                break;
            case 'videos':
                this.handleVideosPage();
                break;
            case 'membership':
                this.handleMembershipPage();
                break;
            case 'profile':
                this.handleProfilePage();
                break;
        }
    }

    handleIndexPage() {
        // 首页特定逻辑
        console.log('Loading index page...');
    }

    handleVideosPage() {
        // 视频页面特定逻辑
        console.log('Loading videos page...');
    }

    handleMembershipPage() {
        // 会员页面特定逻辑
        console.log('Loading membership page...');
    }

    handleProfilePage() {
        // 个人中心页面特定逻辑
        console.log('Loading profile page...');
    }
}

/**
 * 工具函数
 */
class Utils {
    static formatDuration(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        
        if (hours > 0) {
            return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        } else {
            return `${minutes}:${secs.toString().padStart(2, '0')}`;
        }
    }

    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    static formatNumber(num) {
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + '万';
        }
        return num.toString();
    }

    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    static isValidPhone(phone) {
        const phoneRegex = /^1[3-9]\d{9}$/;
        return phoneRegex.test(phone);
    }

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    static copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            // 兼容性处理
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }
}

/**
 * 全局初始化
 */
let userManager, videoManager, animationManager, membershipManager, routerManager, visualEffectsManager;

document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有管理器
    userManager = new UserManager();
    videoManager = new VideoManager();
    animationManager = new AnimationManager();
    membershipManager = new MembershipManager();
    routerManager = new RouterManager();
    visualEffectsManager = new VisualEffectsManager();
    
    // 全局事件监听
    setupGlobalEventListeners();
    
    console.log(`${CONFIG.APP_NAME} v${CONFIG.VERSION} 初始化完成`);
});

function setupGlobalEventListeners() {
    // 页面滚动事件
    let lastScrollTop = 0;
    window.addEventListener('scroll', Utils.throttle(() => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // 导航栏滚动效果
        const nav = document.querySelector('.navigation');
        if (nav) {
            if (scrollTop > lastScrollTop && scrollTop > 100) {
                nav.style.transform = 'translateY(-100%)';
            } else {
                nav.style.transform = 'translateY(0)';
            }
        }
        
        lastScrollTop = scrollTop;
    }, 100));
    
    // 窗口大小改变事件
    window.addEventListener('resize', Utils.debounce(() => {
        // 重新计算布局
        console.log('Window resized');
    }, 250));
    
    // 键盘快捷键
    document.addEventListener('keydown', (e) => {
        // ESC键关闭模态框
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.fixed.inset-0');
            modals.forEach(modal => {
                if (modal.style.display !== 'none') {
                    modal.remove();
                }
            });
        }
    });
    
    // 点击外部关闭模态框
    document.addEventListener('click', (e) => {
        if (e.target.matches('.fixed.inset-0')) {
            e.target.remove();
        }
    });
}

// 导出到全局作用域（如果需要）
window.WuXueTang = {
    CONFIG,
    UserManager,
    VideoManager,
    AnimationManager,
    MembershipManager,
    RouterManager,
    Utils,
    userManager,
    videoManager,
    animationManager,
    membershipManager,
    routerManager
};