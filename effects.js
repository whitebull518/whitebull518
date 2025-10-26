// 武学堂 - 视觉效果和动画库
// 作者: AI Assistant
// 版本: 1.0.0

/**
 * 水墨风格背景效果
 */
class InkBackgroundEffect {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.animationId = null;
        this.init();
    }

    init() {
        if (!this.container) return;

        // 创建canvas元素
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        this.container.style.position = 'relative';
        this.container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.createParticles();
        this.animate();

        // 监听窗口大小变化
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    createParticles() {
        const particleCount = Math.min(50, Math.floor(this.canvas.width * this.canvas.height / 10000));
        
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 3 + 1,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                opacity: Math.random() * 0.3 + 0.1,
                color: this.getInkColor()
            });
        }
    }

    getInkColor() {
        const colors = [
            'rgba(44, 44, 44, 0.1)',    // 墨色
            'rgba(211, 47, 47, 0.05)',  // 朱砂红
            'rgba(0, 105, 92, 0.08)',   // 深青
            'rgba(255, 160, 0, 0.06)'   // 金黄
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 更新和绘制粒子
        this.particles.forEach(particle => {
            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 边界检测
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.vx *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.vy *= -1;
            }

            // 保持粒子在画布内
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));

            // 绘制粒子
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            // 添加水墨扩散效果
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color.replace(/[\d.]+\)$/, '0.02)');
            this.ctx.fill();
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

/**
 * 武术动作粒子效果
 */
class MartialArtsParticles {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouseX = 0;
        this.mouseY = 0;
        this.animationId = null;
        this.init();
    }

    init() {
        if (!this.container) return;

        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '2';
        this.container.style.position = 'relative';
        this.container.appendChild(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.bindEvents();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        const rect = this.container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }

    bindEvents() {
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.container.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            this.createParticle();
        });

        this.container.addEventListener('click', (e) => {
            const rect = this.container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            this.createBurst(x, y);
        });
    }

    createParticle() {
        if (this.particles.length < 20) {
            this.particles.push({
                x: this.mouseX,
                y: this.mouseY,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                life: 1.0,
                decay: 0.02,
                size: Math.random() * 4 + 2,
                color: this.getMartialArtsColor()
            });
        }
    }

    createBurst(x, y) {
        for (let i = 0; i < 10; i++) {
            const angle = (Math.PI * 2 * i) / 10;
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * 3,
                vy: Math.sin(angle) * 3,
                life: 1.0,
                decay: 0.03,
                size: Math.random() * 6 + 3,
                color: this.getMartialArtsColor()
            });
        }
    }

    getMartialArtsColor() {
        const colors = [
            'rgba(211, 47, 47, 0.6)',   // 朱砂红 - 力量
            'rgba(0, 105, 92, 0.6)',    // 深青 - 平衡
            'rgba(255, 160, 0, 0.6)',   // 金黄 - 智慧
            'rgba(46, 125, 50, 0.6)'    // 森林绿 - 和谐
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 更新和绘制粒子
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const particle = this.particles[i];

            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 更新生命值
            particle.life -= particle.decay;

            // 移除死亡的粒子
            if (particle.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }

            // 绘制粒子
            this.ctx.save();
            this.ctx.globalAlpha = particle.life;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();

            // 添加发光效果
            this.ctx.shadowBlur = 10;
            this.ctx.shadowColor = particle.color;
            this.ctx.fill();
            this.ctx.restore();
        }

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
    }
}

/**
 * 文字打字机效果
 */
class TypewriterEffect {
    constructor(element, options = {}) {
        this.element = element;
        this.text = element.textContent;
        this.speed = options.speed || 50;
        this.cursor = options.cursor !== false;
        this.cursorChar = options.cursorChar || '|';
        this.onComplete = options.onComplete || null;
        
        this.currentIndex = 0;
        this.isRunning = false;
    }

    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.element.textContent = '';
        this.typeChar();
    }

    typeChar() {
        if (this.currentIndex < this.text.length) {
            this.element.textContent += this.text.charAt(this.currentIndex);
            this.currentIndex++;
            
            if (this.cursor) {
                this.element.textContent += this.cursorChar;
                setTimeout(() => {
                    if (this.isRunning) {
                        this.element.textContent = this.element.textContent.slice(0, -1);
                    }
                }, this.speed / 2);
            }
            
            setTimeout(() => this.typeChar(), this.speed);
        } else {
            this.complete();
        }
    }

    complete() {
        this.isRunning = false;
        if (this.onComplete) {
            this.onComplete();
        }
    }

    stop() {
        this.isRunning = false;
    }
}

/**
 * 滚动视差效果
 */
class ParallaxEffect {
    constructor() {
        this.elements = [];
        this.init();
    }

    init() {
        // 查找所有带有视差属性的元素
        document.querySelectorAll('[data-parallax]').forEach(element => {
            const speed = parseFloat(element.dataset.parallax) || 0.5;
            const direction = element.dataset.parallaxDirection || 'vertical';
            
            this.elements.push({
                element: element,
                speed: speed,
                direction: direction,
                initialY: element.offsetTop,
                initialX: element.offsetLeft
            });
        });

        this.bindEvents();
    }

    bindEvents() {
        let ticking = false;
        
        const update = () => {
            const scrollY = window.pageYOffset;
            const scrollX = window.pageXOffset;

            this.elements.forEach(item => {
                if (item.direction === 'vertical') {
                    const yPos = -(scrollY * item.speed);
                    item.element.style.transform = `translateY(${yPos}px)`;
                } else if (item.direction === 'horizontal') {
                    const xPos = -(scrollX * item.speed);
                    item.element.style.transform = `translateX(${xPos}px)`;
                } else if (item.direction === 'both') {
                    const yPos = -(scrollY * item.speed);
                    const xPos = -(scrollX * item.speed);
                    item.element.style.transform = `translate(${xPos}px, ${yPos}px)`;
                }
            });

            ticking = false;
        };

        const requestUpdate = () => {
            if (!ticking) {
                requestAnimationFrame(update);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestUpdate, { passive: true });
        window.addEventListener('resize', requestUpdate, { passive: true });
    }
}

/**
 * 3D卡片翻转效果
 */
class Card3DEffect {
    constructor(selector) {
        this.cards = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.cards.forEach(card => {
            this.setupCard(card);
        });
    }

    setupCard(card) {
        let rotateX = 0;
        let rotateY = 0;
        let isMouseDown = false;
        let startX, startY;

        card.addEventListener('mouseenter', (e) => {
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mousemove', (e) => {
            if (!isMouseDown) {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                rotateX = (y - centerY) / 10;
                rotateY = (centerX - x) / 10;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
            }
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s ease';
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
        });

        // 添加点击效果
        card.addEventListener('mousedown', (e) => {
            isMouseDown = true;
            startX = e.clientX;
            startY = e.clientY;
            card.style.transition = 'transform 0.1s ease';
        });

        document.addEventListener('mousemove', (e) => {
            if (isMouseDown) {
                const deltaX = e.clientX - startX;
                const deltaY = e.clientY - startY;
                
                rotateY = deltaX / 5;
                rotateX = -deltaY / 5;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.1, 1.1, 1.1)`;
            }
        });

        document.addEventListener('mouseup', () => {
            if (isMouseDown) {
                isMouseDown = false;
                card.style.transition = 'transform 0.5s ease';
                card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            }
        });
    }
}

/**
 * 波纹点击效果
 */
class RippleEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            this.setupRipple(element);
        });
    }

    setupRipple(element) {
        element.style.position = 'relative';
        element.style.overflow = 'hidden';

        element.addEventListener('click', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(211, 47, 47, 0.3)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s linear';
            ripple.style.left = (x - 10) + 'px';
            ripple.style.top = (y - 10) + 'px';
            ripple.style.width = '20px';
            ripple.style.height = '20px';

            element.appendChild(ripple);

            setTimeout(() => {
                if (ripple.parentNode) {
                    ripple.parentNode.removeChild(ripple);
                }
            }, 600);
        });
    }
}

/**
 * 渐变文字效果
 */
class GradientTextEffect {
    constructor(selector) {
        this.elements = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.elements.forEach(element => {
            this.applyGradientEffect(element);
        });
    }

    applyGradientEffect(element) {
        const text = element.textContent;
        element.innerHTML = '';

        // 将每个字符包装在span中
        for (let i = 0; i < text.length; i++) {
            const span = document.createElement('span');
            span.textContent = text[i];
            span.style.display = 'inline-block';
            span.style.transition = 'all 0.3s ease';
            span.style.animationDelay = `${i * 0.05}s`;
            element.appendChild(span);
        }

        // 添加鼠标悬停效果
        element.addEventListener('mouseenter', () => {
            const spans = element.querySelectorAll('span');
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.style.transform = 'translateY(-5px) scale(1.1)';
                    span.style.color = this.getGradientColor(index, spans.length);
                }, index * 30);
            });
        });

        element.addEventListener('mouseleave', () => {
            const spans = element.querySelectorAll('span');
            spans.forEach((span, index) => {
                setTimeout(() => {
                    span.style.transform = 'translateY(0) scale(1)';
                    span.style.color = '';
                }, index * 30);
            });
        });
    }

    getGradientColor(index, total) {
        const ratio = index / (total - 1);
        const colors = [
            { r: 211, g: 47, b: 47 },   // 朱砂红
            { r: 255, g: 160, b: 0 },   // 金黄
            { r: 0, g: 105, b: 92 },    // 深青
            { r: 46, g: 125, b: 50 }    // 森林绿
        ];

        const colorIndex = Math.floor(ratio * (colors.length - 1));
        const localRatio = (ratio * (colors.length - 1)) - colorIndex;

        const startColor = colors[colorIndex];
        const endColor = colors[colorIndex + 1] || colors[colorIndex];

        const r = Math.round(startColor.r + (endColor.r - startColor.r) * localRatio);
        const g = Math.round(startColor.g + (endColor.g - startColor.g) * localRatio);
        const b = Math.round(startColor.b + (endColor.b - startColor.b) * localRatio);

        return `rgb(${r}, ${g}, ${b})`;
    }
}

/**
 * 加载动画管理器
 */
class LoadingAnimation {
    constructor() {
        this.init();
    }

    init() {
        this.createLoadingStyles();
        this.setupPageLoader();
    }

    createLoadingStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes fadeInRight {
                from {
                    opacity: 0;
                    transform: translateX(30px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes pulse {
                0%, 100% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.05);
                }
            }
            
            @keyframes glow {
                0%, 100% {
                    box-shadow: 0 0 5px rgba(211, 47, 47, 0.3);
                }
                50% {
                    box-shadow: 0 0 20px rgba(211, 47, 47, 0.6);
                }
            }
            
            .fade-in-up {
                animation: fadeInUp 0.6s ease-out forwards;
            }
            
            .fade-in-left {
                animation: fadeInLeft 0.6s ease-out forwards;
            }
            
            .fade-in-right {
                animation: fadeInRight 0.6s ease-out forwards;
            }
            
            .pulse-animation {
                animation: pulse 2s infinite;
            }
            
            .glow-animation {
                animation: glow 2s infinite;
            }
        `;
        document.head.appendChild(style);
    }

    setupPageLoader() {
        // 页面加载完成后的动画
        window.addEventListener('load', () => {
            // 为不同元素添加渐入动画
            const elements = document.querySelectorAll('.scroll-reveal');
            elements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('revealed');
                }, index * 100);
            });
        });
    }

    showLoadingSpinner(target) {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        spinner.innerHTML = `
            <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        `;
        target.appendChild(spinner);
        return spinner;
    }

    hideLoadingSpinner(spinner) {
        if (spinner && spinner.parentNode) {
            spinner.parentNode.removeChild(spinner);
        }
    }
}

/**
 * 全局视觉效果管理器
 */
class VisualEffectsManager {
    constructor() {
        this.effects = {};
        this.init();
    }

    init() {
        this.setupGlobalEffects();
        this.initializeAnimations();
    }

    setupGlobalEffects() {
        // 设置页面加载动画
        new LoadingAnimation();

        // 设置滚动视差效果
        new ParallaxEffect();

        // 设置波纹点击效果
        new RippleEffect('.btn-primary, .btn-secondary');

        // 设置3D卡片效果
        new Card3DEffect('.video-card, .membership-card');

        // 设置渐变文字效果
        new GradientTextEffect('.hero-title');
    }

    initializeAnimations() {
        // 初始化Anime.js动画
        if (typeof anime !== 'undefined') {
            this.setupAnimeAnimations();
        }

        // 初始化p5.js创意编码
        if (typeof p5 !== 'undefined') {
            this.setupP5Background();
        }
    }

    setupAnimeAnimations() {
        // 导航栏动画
        anime({
            targets: '.navigation',
            translateY: [-100, 0],
            opacity: [0, 1],
            duration: 800,
            easing: 'easeOutExpo',
            delay: 500
        });

        // 英雄区域标题动画
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            anime({
                targets: heroTitle,
                scale: [0.8, 1],
                opacity: [0, 1],
                duration: 1000,
                easing: 'easeOutElastic(1, .8)',
                delay: 1000
            });
        }

        // 统计数字动画
        const stats = document.querySelectorAll('.stat-card .text-3xl');
        stats.forEach((stat, index) => {
            const finalValue = parseInt(stat.textContent);
            stat.textContent = '0';
            
            anime({
                targets: stat,
                innerHTML: [0, finalValue],
                duration: 2000,
                easing: 'easeOutExpo',
                delay: 2000 + (index * 200),
                round: 1
            });
        });
    }

    setupP5Background() {
        // 创建p5.js背景效果
        const backgroundContainer = document.getElementById('background-effect');
        if (backgroundContainer) {
            new p5((sketch) => {
                let particles = [];
                let time = 0;

                sketch.setup = () => {
                    const canvas = sketch.createCanvas(backgroundContainer.offsetWidth, backgroundContainer.offsetHeight);
                    canvas.parent(backgroundContainer);
                    
                    // 创建粒子
                    for (let i = 0; i < 30; i++) {
                        particles.push({
                            x: sketch.random(sketch.width),
                            y: sketch.random(sketch.height),
                            size: sketch.random(2, 8),
                            speed: sketch.random(0.5, 2),
                            angle: sketch.random(sketch.TWO_PI)
                        });
                    }
                };

                sketch.draw = () => {
                    sketch.clear();
                    time += 0.01;

                    // 绘制连接线
                    sketch.stroke(44, 44, 44, 30);
                    sketch.strokeWeight(1);
                    
                    for (let i = 0; i < particles.length; i++) {
                        for (let j = i + 1; j < particles.length; j++) {
                            const dist = sketch.dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                            if (dist < 150) {
                                sketch.line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
                            }
                        }
                    }

                    // 绘制和更新粒子
                    particles.forEach(particle => {
                        // 更新位置
                        particle.x += sketch.cos(particle.angle) * particle.speed;
                        particle.y += sketch.sin(particle.angle) * particle.speed;

                        // 边界检测
                        if (particle.x < 0 || particle.x > sketch.width) {
                            particle.angle = sketch.PI - particle.angle;
                        }
                        if (particle.y < 0 || particle.y > sketch.height) {
                            particle.angle = -particle.angle;
                        }

                        // 绘制粒子
                        sketch.fill(211, 47, 47, 100);
                        sketch.noStroke();
                        sketch.ellipse(particle.x, particle.y, particle.size);
                    });
                };

                sketch.windowResized = () => {
                    sketch.resizeCanvas(backgroundContainer.offsetWidth, backgroundContainer.offsetHeight);
                };
            });
        }
    }

    // 添加水墨背景效果
    addInkBackground(containerId) {
        if (!this.effects[containerId]) {
            this.effects[containerId] = new InkBackgroundEffect(containerId);
        }
        return this.effects[containerId];
    }

    // 添加武术粒子效果
    addMartialArtsParticles(containerId) {
        if (!this.effects[containerId + '_particles']) {
            this.effects[containerId + '_particles'] = new MartialArtsParticles(containerId);
        }
        return this.effects[containerId + '_particles'];
    }

    // 添加打字机效果
    addTypewriterEffect(element, options = {}) {
        return new TypewriterEffect(element, options);
    }

    // 创建加载动画
    showLoadingAnimation(target) {
        const loading = new LoadingAnimation();
        return loading.showLoadingSpinner(target);
    }

    // 隐藏加载动画
    hideLoadingAnimation(spinner) {
        const loading = new LoadingAnimation();
        loading.hideLoadingSpinner(spinner);
    }

    // 销毁所有效果
    destroy() {
        Object.values(this.effects).forEach(effect => {
            if (effect && effect.destroy) {
                effect.destroy();
            }
        });
        this.effects = {};
    }
}

// 导出到全局
window.VisualEffectsManager = VisualEffectsManager;
window.InkBackgroundEffect = InkBackgroundEffect;
window.MartialArtsParticles = MartialArtsParticles;
window.TypewriterEffect = TypewriterEffect;
window.ParallaxEffect = ParallaxEffect;
window.Card3DEffect = Card3DEffect;
window.RippleEffect = RippleEffect;
window.GradientTextEffect = GradientTextEffect;
window.LoadingAnimation = LoadingAnimation;