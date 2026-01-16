// Auto Hard Reload on Page Load (Ctrl+Shift+R effect)
// Tự động xóa cache và reload trang khi vào lần đầu

(function() {
    // Kiểm tra xem trang đã được hard reload chưa trong session này
    const pageReloadKey = 'pageHardReloaded_' + window.location.pathname;
    const hasReloaded = sessionStorage.getItem(pageReloadKey);
    
    if (!hasReloaded) {
        // Đánh dấu đã reload để tránh loop vô hạn
        sessionStorage.setItem(pageReloadKey, 'true');
        
        console.log('🔄 Auto hard reload: Clearing cache and reloading page...');
        
        // Xóa Service Worker cache nếu có
        if ('caches' in window) {
            caches.keys().then(function(names) {
                for (let name of names) {
                    caches.delete(name);
                    console.log('🗑️ Deleted cache:', name);
                }
            });
        }
        
        // Hard reload với bypass cache (giống Ctrl+Shift+R)
        // Sử dụng location.reload(true) để force reload từ server
        setTimeout(function() {
            window.location.reload(true);
        }, 100);
    } else {
        console.log('✅ Page already hard reloaded in this session');
    }
})();
