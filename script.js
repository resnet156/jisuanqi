document.addEventListener('DOMContentLoaded', () => {
    const displayInput = document.getElementById('displayInput');
    const buttons = document.querySelectorAll('button');

    let currentValue = '';
    let previousValue = '';
    let operator = null;
    let resetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.getAttribute('data-value');

            // 数字和小数点
            if (!isNaN(value) || value === '.') {
                if (resetDisplay) {
                    displayInput.value = '';
                    resetDisplay = false;
                }
                // 防止多个小数点
                if (value === '.' && displayInput.value.includes('.')) return;
                displayInput.value += value;
                currentValue = displayInput.value;
            }
            // 运算符
            else if (['+', '-', '*', '/', '%'].includes(value)) {
                if (currentValue === '') return;
                if (previousValue !== '') {
                    calculateResult();
                }
                operator = value;
                previousValue = currentValue;
                currentValue = '';
                resetDisplay = true;
            }
            // 等于
            else if (value === '=') {
                if (currentValue === '' || previousValue === '' || operator === null) return;
                calculateResult();
                operator = null;
                previousValue = '';
                resetDisplay = true;
            }
            // 清除
            else if (value === 'C') {
                displayInput.value = '';
                currentValue = '';
                previousValue = '';
                operator = null;
            }
            // 退格
            else if (value === '⌫') {
                displayInput.value = displayInput.value.slice(0, -1);
                currentValue = displayInput.value;
            }
            // 正负号
            else if (value === '±') {
                if (currentValue === '') return;
                currentValue = (parseFloat(currentValue) * -1).toString();
                displayInput.value = currentValue;
            }
        });
    });

    function calculateResult() {
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        let result;

        switch (operator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    displayInput.value = '错误';
                    return;
                }
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }

        // 处理小数点位数
        result = Number.isInteger(result) ? result : result.toFixed(2);
        displayInput.value = result;
        currentValue = result.toString();
    }
});