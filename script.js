document.addEventListener('DOMContentLoaded', () => {
    const dayCards = document.querySelectorAll('.day-card');
    
    dayCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const isSelected = card.classList.contains('selected');
            
            dayCards.forEach(c => {
                c.classList.remove('selected', 'faded');
            });
            
            if (!isSelected) {
                card.classList.add('selected');
                dayCards.forEach(c => {
                    if (c !== card) {
                        c.classList.add('faded');
                    }
                });
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.day-card')) {
            dayCards.forEach(c => {
                c.classList.remove('selected', 'faded');
            });
            document.body.style.overflow = 'auto';
        }
    });
    
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
});

function updateCountdowns() {
    // Current UTC time converted to Eastern time
    const utcDate = new Date('2026-02-01T21:58:39.354Z');
    const estTime = new Date(utcDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    
    // Lunch time: 12:30 PM EST
    const lunchTime = new Date(estTime.getFullYear(), estTime.getMonth(), estTime.getDate(), 12, 30, 0);
    
    // Dismissal time: 4:30 PM EST
    const dismissalTime = new Date(estTime.getFullYear(), estTime.getMonth(), estTime.getDate(), 16, 30, 0);
    
    const timeTillLunch = lunchTime - estTime;
    const timeTillDismissal = dismissalTime - estTime;
    
    const lunchTimeEl = document.getElementById('lunch-time');
    if (lunchTimeEl) {
        if (timeTillLunch > 0) {
            lunchTimeEl.textContent = formatCountdownTime(timeTillLunch);
        } else {
            lunchTimeEl.textContent = 'ENJOY!';
        }
    }
    
    const dismissalTimeEl = document.getElementById('dismissal-time');
    if (dismissalTimeEl) {
        if (timeTillDismissal > 0) {
            dismissalTimeEl.textContent = formatCountdownTime(timeTillDismissal);
        } else {
            dismissalTimeEl.textContent = 'DONE!';
        }
    }
}

function formatCountdownTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${String(seconds).padStart(2, '0')}s`;
    } else {
        return `${String(seconds).padStart(2, '0')}s`;
    }
}
