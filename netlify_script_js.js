// Data
const annualData = {
    labels: ['2023', '2024', '2025'],
    datasets: [
        {
            label: 'AEPS Supplies',
            data: [47000, 30000, 28000],
            backgroundColor: '#2563eb',
            type: 'bar'
        },
        {
            label: 'Gas',
            data: [22000, 21000, 20000],
            backgroundColor: '#16a34a',
            type: 'bar'
        },
        {
            label: 'Employee',
            data: [8500, 18500, 17000],
            backgroundColor: '#dc2626',
            type: 'bar'
        },
        {
            label: 'Rent',
            data: [27600, 27600, 27600],
            borderColor: '#9333ea',
            backgroundColor: 'transparent',
            type: 'line',
            tension: 0.1,
            borderWidth: 3
        }
    ]
};

const monthlySupplyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: '2023 AEPS Supplies',
            data: [2847, 12456, 3147, 4234, 5678, 4890, 5234, 4567, 6123, 7890, 2345, 3456],
            borderColor: '#2563eb',
            backgroundColor: '#2563eb33',
            tension: 0.4,
            fill: true
        },
        {
            label: '2024 AEPS Supplies',
            data: [2277, 1654, 1876, 2135, 2457, 5876, 2346, 1987, 3564, 2146, 1876, 3287],
            borderColor: '#16a34a',
            backgroundColor: '#16a34a33',
            tension: 0.4,
            fill: true
        },
        {
            label: '2025 AEPS Supplies',
            data: [2456, 1234, 1567, 1890, 2234, null, null, null, null, null, null, null],
            borderColor: '#dc2626',
            backgroundColor: '#dc262633',
            tension: 0.4,
            fill: true
        }
    ]
};

const vendorData = {
    labels: ['Pool Water Products', 'Waterline Technologies', 'Superior Pool', 'Lowe\'s/Home Depot', 'Other Supplies'],
    datasets: [{
        data: [25420, 12450, 2136, 3890, 3104],
        backgroundColor: ['#2563eb', '#16a34a', '#dc2626', '#9333ea', '#f59e0b']
    }]
};

const seasonalData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: 'AEPS Supplies',
            data: [2526, 5114, 2196, 2753, 3456, 5214, 3308, 2516, 4284, 4027, 2022, 3007],
            borderColor: '#2563eb',
            tension: 0.4,
            borderWidth: 3
        },
        {
            label: 'Employee Costs',
            data: [1675, 1335, 1305, 1385, 1256, 933, 866, 1546, 1690, 1733, 1600, 1612],
            borderColor: '#dc2626',
            tension: 0.4,
            borderWidth: 2
        },
        {
            label: 'Gas',
            data: [1480, 1492, 1645, 1719, 1796, 1860, 1989, 2057, 2027, 1932, 1794, 1648],
            borderColor: '#16a34a',
            tension: 0.4,
            borderWidth: 2
        }
    ]
};

// Chart configurations
const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                callback: function(value) {
                    return '$' + (value/1000).toFixed(0) + 'k';
                }
            }
        }
    }
};

// Initialize charts
let charts = {};

function initCharts() {
    // Annual Chart
    const annualCtx = document.getElementById('annualChart').getContext('2d');
    charts.annual = new Chart(annualCtx, {
        type: 'bar',
        data: annualData,
        options: {
            ...chartOptions,
            plugins: {
                ...chartOptions.plugins,
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Supply Trend Chart
    const supplyCtx = document.getElementById('supplyTrendChart').getContext('2d');
    charts.supply = new Chart(supplyCtx, {
        type: 'line',
        data: monthlySupplyData,
        options: chartOptions
    });

    // Vendor Pie Chart
    const vendorCtx = document.getElementById('vendorPieChart').getContext('2d');
    charts.vendor = new Chart(vendorCtx, {
        type: 'pie',
        data: vendorData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': $' + context.parsed.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Seasonal Chart
    const seasonalCtx = document.getElementById('seasonalChart').getContext('2d');
    charts.seasonal = new Chart(seasonalCtx, {
        type: 'line',
        data: seasonalData,
        options: chartOptions
    });
}

// View switching
function showView(viewName) {
    // Hide all views
    document.querySelectorAll('.view-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected view
    document.getElementById(viewName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Update charts if needed
    setTimeout(() => {
        Object.values(charts).forEach(chart => {
            if (chart) chart.resize();
        });
    }, 100);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
});